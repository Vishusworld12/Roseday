from app import create_app
from flask import render_template
from flask_cors import CORS
app = create_app()

CORS(app)
@app.route("/")
def HomePage():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=1234)