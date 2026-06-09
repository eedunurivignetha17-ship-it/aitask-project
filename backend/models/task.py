
from config import db

# ======================================
# TASK MODEL
# ======================================
class Task(db.Model):

    __tablename__ = "tasks"

    # TASK ID
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # TASK TITLE
    title = db.Column(
        db.String(100),
        nullable=False
    )

    # TASK DESCRIPTION
    description = db.Column(
        db.String(300),
        nullable=False
    )

    # TASK STATUS
    status = db.Column(
        db.String(20),
        default="Pending"
    )

    # TASK PRIORITY
    priority = db.Column(
        db.String(20),
        default="Medium"
    )

    # TASK DUE DATE
    due_date = db.Column(
        db.String(50),
        nullable=True
    )

    # ======================================
    # CONVERT TO DICTIONARY
    # ======================================
    def to_dict(self):

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "priority": self.priority,
            "due_date": self.due_date
        }