from flask import Flask
from flask_cors import CORS
from router.ai import ai_bp

app = Flask(__name__)

# Enable CORS for frontend connection
CORS(app)

# Register AI routes
app.register_blueprint(ai_bp)

# Home Route
@app.route("/")
def home():
    return {
        "message": "TASKAI Backend Running Successfully"
    }

# Run Server
if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )