
from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from router.ai import ai_bp

app = Flask(
    __name__,
    static_folder="../frontend",
    static_url_path=""
)

CORS(app)

app.register_blueprint(ai_bp)

@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(debug=True)
