from flask import Flask, jsonify, request, session
from flask_restful import Api, Resource
from flaskext.mysql import MySQL
from passlib.hash import sha256_crypt
import os
import jwt
from functools import wraps
import datetime

app = Flask(__name__)


app.config["SECRET_KEY"] = os.environ.get("FLASK_SECRET_KEY")
app.config["MYSQL_DATABASE_HOST"] = os.environ.get("DATABASE_HOST")
app.config["MYSQL_DATABASE_USER"] = os.environ.get("DATABASE_USER")
app.config["MYSQL_DATABASE_PASSWORD"] = os.environ.get("DATABASE_PASSWORD")
app.config["MYSQL_DATABASE_DB"] = os.environ.get("DATABASE_DB")
app.config["MYSQL_DATABASE_CURSORCLASS"] = "DictCursor"

mysql = MySQL(app)
mysql.init_app(app)
api = Api(app)


def check_posted_data(posted_data, function_name):
    if (function_name == "auth"):
        if("username" not in posted_data or "password" not in posted_data):
            return 400
        return 200
    if (function_name == "users"):
        if ("first_name" not in posted_data or "last_name" not in posted_data or "username" not in posted_data or "password" not in posted_data or "email" not in posted_data):
            return 400
        return 200


def private(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({
                "message": "Forbidden",
                "status_code": 403
            })
        else:
            try:
                data = jwt.decode(
                    token, app.config['SECRET_KEY'], algorithms="HS256")
            except Exception:
                return jsonify({
                    "message": "invalid token",
                    "status_code": 403
                })
        return func(*args, **kwargs)
    return wrapped


class Auth(Resource):
    def post(self):  # login
        posted_data = request.get_json()
        status_code = check_posted_data(posted_data, "auth")

        if (status_code == 400):
            retJson = {
                'message': 'Missing fields',
                'status_code': status_code
            }
            return jsonify(retJson)

        else:
            username = posted_data["username"]
            password = posted_data["password"]

            cursor = mysql.get_db().cursor()
            query = "SELECT * FROM USERS WHERE username=(%s) and password=(%s)"
            cursor.execute(query, (username, password))
            data = cursor.fetchone()
            if (data != None):
                token = jwt.encode({
                    'user': data[1],
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=1800)
                },
                    app.config['SECRET_KEY'], algorithm='HS256')
                retJson = {
                    "username": data[1],
                    "name": data[3],
                    "surname": data[4],
                    "token": token,
                    "status_code": 200
                }

                return jsonify(retJson)

            else:
                retJson = {
                    "message": "user not found",
                    "status_code": 404
                }

                return retJson

    @private
    def get(self):
        posted_data = request.get_json()
        return jsonify({
            "message": "it works!",
            "your-message": posted_data["msg"]
        })


api.add_resource(Auth, "/auth")


class Users(Resource):
    def post(self):  # registration
        posted_data = request.get_json()
        #status_code = check_posted_data(posted_data, "users")

        status_code = check_posted_data(posted_data, "users")

        if (status_code == 200):
            first_name = posted_data["first_name"]
            last_name = posted_data["last_name"]
            username = posted_data["username"]
            password = posted_data["password"]
            email = posted_data["email"]

            cursor = mysql.get_db().cursor()

            query = "SELECT * FROM USERS WHERE username=(%s)"
            cursor.execute(query, (username,))
            data = cursor.fetchone()

            if (data == None):

                query = "INSERT INTO `USERS` (`first_name`, `last_name`, `username`, `password`, `email`) VALUES ((%s), (%s), (%s), (%s), (%s))"
                cursor.execute(query, (first_name, last_name,
                                       username, password, email))
                mysql.get_db().commit()
                retJson = {
                    "message": "Registration completed."
                }
                return retJson

            else:
                return jsonify({
                    "message": "user already exists",
                    "status_code": 409
                })
        else:
            return jsonify({
                "message": "missing arguments",
                "status_code": status_code
            })


api.add_resource(Users, "/users")


if __name__ == "__main__":
    app.run(debug=True)
# with app.app_context():
#    cursor = mysql.get_db().cursor()
#    query = "INSERT INTO USERS (username, password, first_name, last_name) VALUES(%s,%s,%s,%s)"
#    cursor.execute(query, ("alperenn2", "12345", "alperen", "yıldız"))
#    mysql.get_db().commit()
# with app.app_context():
#    cursor = mysql.get_db().cursor()
#    query = "SELECT * FROM USERS WHERE username=(%s) and password=(%s)"
#    cursor.execute(query, ("albertlevi", "albert123"))
#    data = cursor.fetchone()
#    print(data)
