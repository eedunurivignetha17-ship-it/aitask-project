from flask import Blueprint, request, jsonify
from models.user import User
from config import db

auth_bp = Blueprint('auth', __name__)

# Register User
@auth_bp.route('/register', methods=['POST'])
def register():

    data = request.json

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User Registered Successfully"
    })


# Login User
@auth_bp.route('/login', methods=['POST'])
def login():

    data = request.json

    user = User.query.filter_by(
        email=data['email']
    ).first()

    if user and user.password == data['password']:

        return jsonify({
            "message": "Login Successful"
        })

    return jsonify({
        "message": "Invalid Email or Password"
    }), 401