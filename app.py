from flask import Flask, jsonify, request, session
from flask_restful import Api, Resource
from flaskext.mysql import MySQL
from passlib.hash import sha256_crypt
import os
import jwt
from functools import wraps
import datetime
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)


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
        if ("first_name" not in posted_data
                or "last_name" not in posted_data
                or "username" not in posted_data
                or "password" not in posted_data
                or "email" not in posted_data
                or "phone" not in posted_data
                or "address" not in posted_data
                or "email" not in posted_data):
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
    @cross_origin(origins="http://localhost:3000*")
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

    @cross_origin(origins="http://localhost:63342*")
    @private
    def get(self):
        posted_data = request.get_json()
        return jsonify({
            "message": True,
            "status_code": 200
        })


api.add_resource(Auth, "/auth")


class Users(Resource):
    @cross_origin(origins="http://localhost:3000*")
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
            phone = posted_data["phone"]
            address = posted_data["address"]

            cursor = mysql.get_db().cursor()

            query = "SELECT * FROM USERS WHERE username=(%s)"
            cursor.execute(query, (username,))
            data = cursor.fetchone()

            if (data == None):

                # adding the new user to the user relation
                query = "INSERT INTO `USERS` (`first_name`, `last_name`, `username`, `password`, `email`) VALUES ((%s), (%s), (%s), (%s), (%s))"
                cursor.execute(query, (first_name, last_name,
                                       username, password, email))
                mysql.get_db().commit()

                # adding the new user to customer relation

                query = "SELECT user_id FROM USERS WHERE username = (%s)"
                cursor.execute(query, (username,))
                data = cursor.fetchone()

                user_id = data[0]  # id of the newly created user

                query = 'INSERT INTO `CUSTOMER` (customer_id, phone, address, email) VALUES (%s, %s, %s, %s)'

                cursor.execute(query, (str(user_id), str(
                    phone), str(address), str(email)))
                mysql.get_db().commit()

                retJson = {
                    "message": "Registration completed.",
                    "status_code": 200
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

class findProduct(Resource):
    def post(self): #find product from database
        posted_data = request.get_json()
        productName = posted_data["productName"]
        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT WHERE name=(%s)"
        cursor.execute(query, (productName,))
        data = cursor.fetchone()

        if (data != None):
            query = "SELECT * FROM PRODUCT WHERE name=(%s)"
            cursor.execute(query, (productName))
            data = cursor.fetchone()
            retJson = {
                "name": data[2],
                "rating": data[3],
                "model": data[4],
                "price": data[5],
                "stock": data[7],
                "status_code": 200
            }
            return retJson
        else:
            return jsonify({
                    "message": "Coffee does not exist.",
                    "status_code": 409
                })

api.add_resource(findProduct, "/findProduct")

class addProduct(Resource):
    def post(self):  # adding new product to database
        posted_data = request.get_json()

        name = posted_data["name"]
        rating = posted_data["rating"]
        model = posted_data["model"]
        price = posted_data["price"]
        image_path = posted_data["image_path"]

        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT WHERE name=(%s)"
        cursor.execute(query, (name,))
        data = cursor.fetchone()

        if(data==None):
            #adding a new product to product table.
            query = "INSERT INTO `PRODUCT` (`name`, `rating`, `model`, `price`, `image_path`) VALUES ((%s), (%s), (%s), (%s), (%s))"
            cursor.execute(query, (name, rating, model, price, image_path))
            mysql.get_db().commit()

            retJson = {
                "message": "New coffee added..",
                "status_code": 200
            }
            return retJson
        else:
            return jsonify({
                "message": "This coffee already exists",
                "status_code": 409
            })

api.add_resource(addProduct, "/addProduct")

class addStock(Resource):
    def post(self): #increasing the stock of the choosen product by 1.
        posted_data = request.get_json()

        name = posted_data["name"]
        quantity = posted_data["quantity"]
        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT WHERE name=(%s)"
        cursor.execute(query, (name,))
        data = cursor.fetchone()

        if (data != None):
            #query = "INSERT INTO `PRODUCT` (`name`, `rating`, `model`, `price`, `image_path`) VALUES ((%s), (%s), (%s), (%s), (%s))"
            query = "UPDATE PRODUCT SET stock=stock+(%s) WHERE name=(%s)"
            cursor.execute(query, (quantity, name))
            mysql.get_db().commit()

            retJson = {
                "message": "Stock of {} reduced by {}...".format(name, quantity),
                "status_code": 200
            }
            return retJson
        else:
            return jsonify({
                "message": "This coffee does not exist",
                "status_code": 409
            })

api.add_resource(addStock,"/addStock")


class reduceStock(Resource):
    def post(self): #decreasing the stock of the choosen product by 1.
        posted_data = request.get_json()

        name = posted_data["name"]
        quantity = posted_data["quantity"]

        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT WHERE name=(%s)"
        cursor.execute(query, (name,))
        data = cursor.fetchone()

        if (data != None):
            #query = "INSERT INTO `PRODUCT` (`name`, `rating`, `model`, `price`, `image_path`) VALUES ((%s), (%s), (%s), (%s), (%s))"
            query = "UPDATE PRODUCT SET stock=stock-(%s) WHERE name=(%s)"
            cursor.execute(query, (quantity, name))
            mysql.get_db().commit()

            retJson = {
                "message": "Stock of {} reduced by {}...".format(name, quantity),
                "status_code": 200
            }
            return retJson
        else:
            return jsonify({
                "message": "This coffee does not exist",
                "status_code": 409
            })

api.add_resource(reduceStock,"/reduceStock")

class orderBy(Resource):
    def post(self):
        posted_data = request.get_json()

        criteria = posted_data["criteria"]
        orderType = posted_data["orderType"] #order type can be ASC or DESC

        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT ORDER BY {} {}".format(criteria, orderType)
        cursor.execute(query)
        
        data = cursor.fetchall()
        retJson = {
                "name": data[0],
                "status_code": 200
            }
        return retJson

api.add_resource(orderBy, "/orderBy")

class categoryList(Resource):
    def post(self): #retrieving all category list from db or only a specific one.
        posted_data = request.get_json()
        whichCategory = posted_data["whichCategory"]
        cursor = mysql.get_db().cursor()

        query = "SELECT category_name FROM CATEGORY"
        cursor.execute(query)
        data = cursor.fetchall()
        if whichCategory == "all":
            retJson = {
                "name": data,
                "status_code": 200
            }
            return retJson
        else:
            try:
                intCat = int(whichCategory)
                retJson = {
                "name": data[intCat],
                "status_code": 200
            }
                return retJson
            except:
                try:
                    intCat2 = int(whichCategory)
                except:
                    retJson = {
                    "message":"You need to type integer value"
                }
                    return retJson
                retJson = {
                "message":"You tried to reach a category which is not exist in database."
            }
                return retJson

api.add_resource(categoryList, "/categoryList")


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
