from typing import Optional
from pydantic import BaseModel

class Expense(BaseModel):
    id: int
    vendor: Optional[str] = None  # Missing vendor is allowed in, but marked INVALID by approval rules
    amount: float
    category: str
    status: str = "Pending"  # Default status if not provided
    approval: Optional[str] = None  # Filled in by the approval rules
