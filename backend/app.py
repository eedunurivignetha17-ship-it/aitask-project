
from flask import Flask, send_from_directory
from flask_cors import CORS
from router.ai import ai_bp

app = Flask(
    __name__,
    static_folder="frontend",
    static_url_path=""
)

CORS(app)

# REGISTER AI ROUTE
app.register_blueprint(ai_bp)

# HOME PAGE
@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

# SERVE FRONTEND FILES
@app.route("/<path:path>")
def serve_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(debug=True)