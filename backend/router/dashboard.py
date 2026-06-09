from flask import Blueprint, jsonify
from models.task import Task

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET'])
def dashboard():

    total_tasks = Task.query.count()

    completed_tasks = Task.query.filter_by(
        status="Completed"
    ).count()

    pending_tasks = Task.query.filter_by(
        status="Pending"
    ).count()

    return jsonify({
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks
    })