from flask_cors import CORS
from flask import Flask
# from routes.RoseRoute import rose_route
from flask_cors import CORS

# app = Flask(__name__)

#database configuration
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'rose_day'

# middleware


# routes
#http://127.0.0.1:1234/api/v1/*

# app.register_blueprint(rose_route,url_prefix_="/api/v1")

#context
def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = ''
    app.config['MYSQL_DB'] = 'rose_day'

    with app.app_context():
        from routes.RoseRoute import rose_route
        app.register_blueprint(rose_route, url_prefix="/api/v1/rose")

    return app

    
    
# @app.route("/", methods=["GET"])
# def HomePage():
#     return ":Hello Python ji"


# if __name__ == "__main__":
#     app.run(debug=True)