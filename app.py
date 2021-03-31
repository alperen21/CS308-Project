from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flaskext.mysql import MySQL
from passlib.hash import sha256_crypt

app = Flask(__name__)

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = ""
app.config["MYSQL_DATABASE_DB"] = "cs308"
app.config["MYSQL_DATABASE_CURSORCLASS"] = "DictCursor"

mysql = MySQL(app)
mysql.init_app(app)
api = Api(app)


def check_posted_data(posted_data, function_name):
    if (function_name == "auth"):
        if("username" not in posted_data or "password" not in posted_data):
            return 400
        return 200


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
                retJson = {
                    "username": data[1],
                    "name": data[3],
                    "surname": data[4],
                    "status_code": 200
                }

                return jsonify(retJson)

            else:
                retJson = {
                    "message": "user not found",
                    "status_code": 404
                }

                return retJson


api.add_resource(Auth, "/auth")

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
