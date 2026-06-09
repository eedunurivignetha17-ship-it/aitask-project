
from flask import Blueprint, request, jsonify

from models.task import Task

from config import db

# ======================================
# BLUEPRINT
# ======================================
tasks_bp = Blueprint(
    'tasks',
    __name__
)

# ======================================
# GET ALL TASKS
# ======================================
@tasks_bp.route(
    '/tasks',
    methods=['GET']
)
def get_tasks():

    tasks = Task.query.all()

    task_list = []

    for task in tasks:

        task_data = {

            "id": task.id,

            "title": task.title,

            "description": task.description,

            "status": task.status,

            # PRIORITY
            "priority": task.priority,

            # DUE DATE
            "due_date": task.due_date
        }

        task_list.append(task_data)

    return jsonify(task_list)

# ======================================
# ADD NEW TASK
# ======================================
@tasks_bp.route(
    '/tasks',
    methods=['POST']
)
def add_task():

    data = request.json

    new_task = Task(

        title=data['title'],

        description=data['description'],

        priority=data.get(
            'priority',
            'Medium'
        ),

        due_date=data.get(
            'due_date'
        )
    )

    db.session.add(new_task)

    db.session.commit()

    return jsonify({

        "message":
        "Task Added Successfully"

    })

# ======================================
# UPDATE TASK
# ======================================
@tasks_bp.route(
    '/tasks/<int:id>',
    methods=['PUT']
)
def update_task(id):

    task = Task.query.get(id)

    if not task:

        return jsonify({

            "message":
            "Task Not Found"

        }), 404

    data = request.json

    # UPDATE FIELDS
    task.title = data.get(
        'title',
        task.title
    )

    task.description = data.get(
        'description',
        task.description
    )

    task.status = data.get(
        'status',
        task.status
    )

    task.priority = data.get(
        'priority',
        task.priority
    )

    task.due_date = data.get(
        'due_date',
        task.due_date
    )

    db.session.commit()

    return jsonify({

        "message":
        "Task Updated Successfully"

    })

# ======================================
# DELETE TASK
# ======================================
@tasks_bp.route(
    '/tasks/<int:id>',
    methods=['DELETE']
)
def delete_task(id):

    task = Task.query.get(id)

    if not task:

        return jsonify({

            "message":
            "Task Not Found"

        }), 404

    db.session.delete(task)

    db.session.commit()

    return jsonify({

        "message":
        "Task Deleted Successfully"

    })