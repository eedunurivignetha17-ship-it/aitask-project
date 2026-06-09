from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(
    __name__,
    static_folder="../frontend",
    static_url_path=""
)

CORS(app)

@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(debug=True)