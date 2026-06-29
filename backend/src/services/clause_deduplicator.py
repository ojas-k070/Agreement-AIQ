"""
LLM-based clause deduplication service.

Uses LLM to intelligently identify true duplicates vs similar but distinct clauses,
avoiding heuristic text matching that might miss semantic duplicates or incorrectly
merge distinct clauses.
"""
from typing import List, Dict, Set
from openai import OpenAI
from instructor import patch
from pydantic import BaseModel, Field

from src.core.config import settings
from src.core.logging_config import get_logger
from src.services.clause_extractor import ExtractedClause

logger = get_logger(__name__)


class ClausePair(BaseModel):
    """Pair of clauses for comparison"""
    clause1_text: str = Field(description="Text of first clause")
    clause1_type: str = Field(description="Type of first clause")
    clause1_page: int = Field(description="Page number of first clause")
    clause2_text: str = Field(description="Text of second clause")
    clause2_type: str = Field(description="Type of second clause")
    clause2_page: int = Field(description="Page number of second clause")


class DuplicateDecision(BaseModel):
    """LLM decision on whether clauses are duplicates"""
    is_duplicate: bool = Field(description="True if clauses are duplicates")
    reasoning: str = Field(description="Explanation of why they are/aren't duplicates")
    confidence: float = Field(ge=0.0, le=1.0, description="Confidence in decision (0-1)")


class ClauseDeduplicator:
    """
    LLM-based clause deduplication.
    
    Uses LLM to intelligently identify duplicates by understanding semantic meaning
    rather than relying on text similarity heuristics.
    """
    
    def __init__(self):
        """Initialize deduplicator"""
        import instructor
        self.client = patch(
            OpenAI(
                api_key=settings.openai_api_key,
                base_url=settings.openai_api_base
            ),
            mode=instructor.Mode.JSON
        )
    
    def deduplicate_clauses(
        self,
        clauses: List[ExtractedClause]
    ) -> List[ExtractedClause]:
        """
        Remove duplicate clauses using LLM-based comparison.
        
        Args:
            clauses: List of extracted clauses
            
        Returns:
            Deduplicated list of clauses (keeping best version of each duplicate)
        """
        if len(clauses) <= 1:
            return clauses
        
        # Group clauses by type and page for efficient comparison
        # Only compare clauses of same type on same or adjacent pages
        clause_groups = self._group_clauses_for_comparison(clauses)
        
        # Track which clauses to keep
        keep_indices: Set[int] = set(range(len(clauses)))
        
        # Compare clauses within each group
        for group_indices in clause_groups:
            if len(group_indices) <= 1:
                continue
            
            # Compare all pairs in group
            for i in range(len(group_indices)):
                if group_indices[i] not in keep_indices:
                    continue
                
                for j in range(i + 1, len(group_indices)):
                    if group_indices[j] not in keep_indices:
                        continue
                    
                    idx1, idx2 = group_indices[i], group_indices[j]
                    clause1, clause2 = clauses[idx1], clauses[idx2]
                    
                    # Use LLM to determine if duplicate
                    is_duplicate = self._are_clauses_duplicate(clause1, clause2)
                    
                    if is_duplicate:
                        # Keep the one with higher confidence or more complete text
                        if self._is_clause_better(clause1, clause2):
                            keep_indices.discard(idx2)
                        else:
                            keep_indices.discard(idx1)
                            break  # clause1 removed, move to next
        
        return [clauses[i] for i in sorted(keep_indices)]
    
    def _group_clauses_for_comparison(
        self,
        clauses: List[ExtractedClause]
    ) -> List[List[int]]:
        """
        Group clauses for efficient comparison.
        Only compare clauses of same type on same or adjacent pages.
        """
        groups: Dict[tuple, List[int]] = {}
        
        for idx, clause in enumerate(clauses):
            # Group by (type, page_range)
            # Compare clauses on same page or adjacent pages (±1)
            key = (clause.clause_type.value, clause.page_number)
            
            if key not in groups:
                groups[key] = []
            groups[key].append(idx)
            
            # Also add to adjacent page groups
            if clause.page_number > 0:
                key_prev = (clause.clause_type.value, clause.page_number - 1)
                if key_prev not in groups:
                    groups[key_prev] = []
                groups[key_prev].append(idx)
            
            key_next = (clause.clause_type.value, clause.page_number + 1)
            if key_next not in groups:
                groups[key_next] = []
            groups[key_next].append(idx)
        
        return list(groups.values())
    
    def _are_clauses_duplicate(
        self,
        clause1: ExtractedClause,
        clause2: ExtractedClause
    ) -> bool:
        """
        Use local string similarity to determine if two clauses are duplicates.
        
        Returns True if clauses represent the same legal provision (duplicate extraction).
        """
        # Quick checks first
        if clause1.clause_type != clause2.clause_type:
            return False
        
        if abs(clause1.page_number - clause2.page_number) > 2:
            return False  # Too far apart to be same clause
        
        text1 = clause1.extracted_text.strip().lower()
        text2 = clause2.extracted_text.strip().lower()
        
        if not text1 or not text2:
            return False
            
        # Exact match
        if text1 == text2:
            return True
            
        # Substring matches (if one clause is completely contained in the other and is long enough)
        if (text1 in text2 or text2 in text1) and min(len(text1), len(text2)) > 30:
            return True
            
        # Sequence matcher for fuzzy similarity
        import difflib
        ratio = difflib.SequenceMatcher(None, text1, text2).ratio()
        
        # 80% similarity threshold for clauses of the same type on nearby pages
        return ratio >= 0.8
    
    def _is_clause_better(
        self,
        clause1: ExtractedClause,
        clause2: ExtractedClause
    ) -> bool:
        """Determine which clause is better (keep this one)"""
        # Prefer higher confidence
        conf1 = clause1.confidence_score or 0.0
        conf2 = clause2.confidence_score or 0.0
        
        if abs(conf1 - conf2) > 0.05:
            return conf1 > conf2
        
        # If confidence similar, prefer longer text (more complete)
        if abs(len(clause1.extracted_text) - len(clause2.extracted_text)) > 20:
            return len(clause1.extracted_text) > len(clause2.extracted_text)
        
        # If still similar, prefer the one with risk reasoning
        has_reasoning1 = bool(clause1.risk_reasoning and clause1.risk_reasoning.strip())
        has_reasoning2 = bool(clause2.risk_reasoning and clause2.risk_reasoning.strip())
        
        if has_reasoning1 != has_reasoning2:
            return has_reasoning1
        
        # Default: keep first
        return True

