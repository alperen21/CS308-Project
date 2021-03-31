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


# with app.app_context():
#    cursor = mysql.get_db().cursor()
#    query = "INSERT INTO USERS (username, password, first_name, last_name) VALUES(%s,%s,%s,%s)"
#    cursor.execute(query, ("alperenn2", "12345", "alperen", "yıldız"))
#    mysql.get_db().commit()
