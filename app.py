from flask import Flask, jsonify, request, session
from flask_restful import Api, Resource
from flaskext.mysql import MySQL
from passlib.hash import sha256_crypt
import os
import jwt
from functools import wraps
import datetime
from flask_cors import CORS, cross_origin
from emailClass import SMTPemail
import datetime

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
    if (function_name == "private_wrapper"):
        if ("token" not in posted_data or "user" not in posted_data):
            return 403
        else:
            return 200

    elif (function_name == "auth"):
        if("username" not in posted_data or "password" not in posted_data):
            return 400
        return 200
    elif (function_name == "users"):
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

    elif (function_name == "basket_post"):
        if ("product_name" not in posted_data or "quantity" not in posted_data):
            return 400
        return 200

    elif (function_name == "basket_delete"):
        if ("product_name" not in posted_data):
            return 400
        return 200

    elif (function_name == "basket_put"):
        if ("product_name" not in posted_data or "quantity" not in posted_data):
            return 400
        return 200

    elif (function_name == "comment_post"):
        if ("product_name" not in posted_data or "comment" not in posted_data):
            return 400
        return 200
    elif (function_name == "comment_get"):
        if ("product_name" not in posted_data):
            return 400
        return 200


def check_headers(request, function_name):
    if (function_name == "private_wrapper"):
        if ("token" not in request.headers or "user" not in request.headers):
            return False


def private(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        if check_headers(request, "private_wrapper") == False:
            return jsonify({
                "message": "Forbidden",
                "status_code": 403
            })
        else:
            token = request.headers["token"]
            user = request.headers["user"]
            try:
                data = jwt.decode(
                    token, app.config['SECRET_KEY'], algorithms="HS256")
                if (user != data["user"]):
                    return jsonify({
                        "message": "token does not match the user",
                        "status_code": 403
                    })
            except jwt.ExpiredSignatureError:
                return jsonify({
                    "message": "token expired",
                    "status_code": 403
                })
            except Exception:
                return jsonify({
                    "message": "invalid token",
                    "status_code": 403
                })
        return func(*args, **kwargs)
    return wrapped


def user_id_to_username(user_id):
    cursor = mysql.get_db().cursor()
    query = "SELECT username FROM USERS WHERE user_id = (%s)"
    cursor.execute(query, (user_id,))
    username = cursor.fetchone()

    return username[0]


class getComment(Resource):
    @cross_origin(origins="http://localhost:3000*")
    def post(self):
        posted_data = request.get_json()
        product_name = posted_data["product_name"]
        cursor = mysql.get_db().cursor()
        # get product_id
        query = "SELECT product_id FROM PRODUCT WHERE name = (%s)"
        cursor.execute(query, (product_name,))
        product_id = cursor.fetchone()[0]

        query = "SELECT text, time, customer_id FROM `COMMENTS` WHERE product_id=(%s)"
        cursor.execute(query, (product_id,))
        comments = cursor.fetchall()
        product_comments = list()
        print(comments)

        for comment in comments:
            product_comments.append({
                "username": user_id_to_username(comment[2]),
                "text": comment[0],
                "time": str(comment[1])
            })

        return jsonify({
            "status_code": 200,
            "comments": product_comments
        })


api.add_resource(getComment, "/getcomment")


class Comment(Resource):
    @cross_origin(origins="http://localhost:3000*")
    @private
    def post(self):
        posted_data = request.get_json()
        if (check_posted_data(posted_data, "comment_post") == 200):
            username = request.headers["user"]
            cursor = mysql.get_db().cursor()

            product_name = posted_data["product_name"]
            comment = posted_data["comment"]

            # get customer id
            query = "SELECT user_id FROM USERS WHERE username = (%s)"
            cursor.execute(query, (username,))
            user_id = cursor.fetchone()[0]

            # get product_id
            query = "SELECT product_id FROM PRODUCT WHERE name = (%s)"
            cursor.execute(query, (product_name,))
            product_id = cursor.fetchone()[0]

            query = "INSERT INTO `COMMENTS`(`product_id`, `customer_id`, `text`) VALUES ((%s),(%s),(%s))"
            cursor.execute(query, (product_id, user_id, comment,))
            mysql.get_db().commit()

            return jsonify({
                "message": "success",
                "status_code": 200
            })
        return jsonify({
            "message": "Bad Request",
            "status_code": 403
        })

    @cross_origin(origins="http://localhost:3000*")
    def get(self):
        posted_data = request.get_json()
        if (check_posted_data(posted_data, "comment_get") == 200):
            # get product_id
            product_name = request.headers["product_name"]
            cursor = mysql.get_db().cursor()

            query = "SELECT product_id FROM PRODUCT WHERE name = (%s)"
            cursor.execute(query, (product_name,))
            product_id = cursor.fetchone()[0]

            query = "SELECT text, time FROM `COMMENTS` WHERE product_id=(%s)"
            cursor.execute(query, (product_id,))
            comments = cursor.fetchall()
            product_comments = list()
            print(comments)

            for comment in comments:
                product_comments.append({
                    "text": comment[0],
                    "time": str(comment[1])
                })

            return jsonify({
                "status_code": 200,
                "comments": product_comments
            })
        return jsonify({
            "status_code": 403,
            "message": "bad request"
        })


api.add_resource(Comment, "/comment")


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

            query = "DELETE FROM BASKET"
            cursor.execute(query)
            mysql.get_db().commit()

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

                message = f"Hello {first_name}, \nWelcome to our website! \n"

                mail = SMTPemail(email,
                                 message, "Hello and welcome!")
                mail.send()
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
    @cross_origin(origins="http://localhost:3000*")
    def post(self):  # find product from database
        posted_data = request.get_json()
        productName = posted_data["productName"]
        productName = "%"+productName+"%"
        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT WHERE name like (%s)"
        cursor.execute(query, (productName,))
        data = cursor.fetchall()

        data_list = list()

        if (data != None):
            for element in data:
                product = {
                    "name": element[2],
                    "rating": element[3],
                    "model": element[4],
                    "price": element[5],
                    "image_path": element[6],
                    "stock": element[7]
                }
                data_list.append(product)
            return jsonify({
                "items": data_list,
                "status_code": 200
            })
        else:
            return jsonify({
                "message": "Item does not exist.",
                "status_code": 409
            })


api.add_resource(findProduct, "/findProduct")


class addProduct(Resource):
    @private
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

        if(data == None):
            # adding a new product to product table.
            query = "INSERT INTO `PRODUCT` (`name`, `rating`, `model`, `price`, `image_path`) VALUES ((%s), (%s), (%s), (%s), (%s))"
            cursor.execute(query, (name, rating, model, price, image_path))
            mysql.get_db().commit()

            retJson = {
                "message": "New item added..",
                "status_code": 200
            }
            return retJson
        else:
            return jsonify({
                "message": "This item already exists",
                "status_code": 409
            })


api.add_resource(addProduct, "/addProduct")


class addStock(Resource):
    # increasing the stock of the choosen product by the given quantity.
    @cross_origin(origins="http://localhost:3000*")
    def post(self):
        posted_data = request.get_json()

        product_id = posted_data["product_id"]
        quantity = posted_data["quantity"]

        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT WHERE product_id=(%s)"
        cursor.execute(query, (product_id,))
        data = cursor.fetchone()

        if (data != None):
            #query = "INSERT INTO `PRODUCT` (`name`, `rating`, `model`, `price`, `image_path`) VALUES ((%s), (%s), (%s), (%s), (%s))"
            query = "UPDATE PRODUCT SET stock=(%s) WHERE product_id=(%s)"
            cursor.execute(query, (int(data[7] + quantity), product_id))
            mysql.get_db().commit()

            retJson = {
                "message": "Stock of {} increased by {}...".format(product_id, quantity),
                "status_code": 200
            }
            return retJson
        else:
            return jsonify({
                "message": "This item does not exist",
                "status_code": 409
            })


api.add_resource(addStock, "/addStock")


class reduceStock(Resource):
    @cross_origin(origins="http://localhost:3000*")
    @private
    def post(self):  # decreasing the stock of the choosen product by 1.
        posted_data = request.get_json()
        product_id = posted_data["product_id"]
        quantity = posted_data["quantity"]

        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT WHERE product_id=(%s)"
        cursor.execute(query, (product_id,))
        data = cursor.fetchone()

        if (data != None):

            if (int(data[7])-quantity > 0):
                query = "UPDATE PRODUCT SET stock=stock-(%s) WHERE product_id=(%s)"
                cursor.execute(query, (quantity, product_id))
                mysql.get_db().commit()

                retJson = {
                    "message": "Stock of {} reduced by {}...".format(product_id, quantity),
                    "status_code": 200
                }
                return retJson
            else:
                query = "UPDATE PRODUCT SET stock='0' WHERE product_id=(%s)"
                cursor.execute(query, (product_id,))
                mysql.get_db().commit()

                retJson = {
                    "message": "Stock of {} reduced to 0...".format(product_id),
                    "status_code": 200
                }
                return retJson
        else:
            return jsonify({
                "message": "This item does not exist",
                "status_code": 409
            })


api.add_resource(reduceStock, "/reduceStock")


class orderBy(Resource):
    @cross_origin(origins="http://localhost:3000*")
    def post(self):
        posted_data = request.get_json()

        criteria = posted_data["criteria"]
        orderType = posted_data["orderType"]  # order type can be ASC or DESC

        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT ORDER BY {} {}".format(
            criteria, orderType)
        cursor.execute(query)

        data = cursor.fetchall()
        retJson = {
            "name": data[0],
            "status_code": 200
        }
        return retJson


api.add_resource(orderBy, "/orderBy")


class categoryList(Resource):
    # retrieving all category list from db or only a specific one.
    @cross_origin(origins="http://localhost:3000*")
    def post(self):
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
                        "message": "You need to type integer value"
                    }
                    return retJson
                retJson = {
                    "message": "You tried to reach a category which is not exist in database."
                }
                return retJson


api.add_resource(categoryList, "/categoryList")


class productsOfCategory(Resource):
    # retrieving all products which belong to input category name.
    @cross_origin(origins="http://localhost:3000*")
    def post(self):
        posted_data = request.get_json()
        category_name = posted_data["category_name"]
        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT P, CATEGORY C WHERE P.category_id = C.category_id AND C.category_name = (%s)"

        if ("lowest_rating" in posted_data):
            query = query + \
                " AND P.rating >= {}".format(posted_data["lowest_rating"])
        if ("highest_rating" in posted_data):
            query = query + \
                " AND P.rating <= {}".format(posted_data["highest_rating"])
        if ("lowest_price" in posted_data):
            query = query + \
                " AND P.price >= {}".format(posted_data["lowest_price"])
        if ("highest_rating" in posted_data):
            query = query + \
                " AND P.rating <= {}".format(posted_data["highest_rating"])

        cursor.execute(query, (category_name, ))
        data = cursor.fetchall()

        data_list = list()
        for info in data:
            data_list.append({
                "category_id": info[0],
                "product_id": info[1],
                "name": info[2],
                "rating": info[3],
                "model": info[4],
                "price": info[5],
                "image_path": info[6],
                "stock": info[7],
                "category_id": info[8],
                "pm_id": info[9],
                "category_name": info[10]
            })

        retJson = {
            "category_elements": data_list,
            "status_code": 200
        }
        return retJson


api.add_resource(productsOfCategory, "/productsOfCategory")


class products(Resource):
    @cross_origin(origins="http://localhost:3000*")
    def post(self):

        posted_data = request.get_json()
        cursor = mysql.get_db().cursor()

        query = "SELECT * FROM PRODUCT"

        if ("lowest_rating" in posted_data or "highest_rating" in posted_data or "lowest_price" in posted_data or "highest_rating" in posted_data):
            query = query + " WHERE"

        if ("lowest_rating" in posted_data):
            query = query + " AND" if query[-5:] != "WHERE" else query
            query = query + \
                " rating >= {}".format(posted_data["lowest_rating"])

        if ("highest_rating" in posted_data):
            query = query + " AND" if query[-5:] != "WHERE" else query
            query = query + \
                " rating <= {}".format(posted_data["highest_rating"])

        if ("lowest_price" in posted_data):
            query = query + " AND" if query[-5:] != "WHERE" else query
            query = query + \
                " price >= {}".format(posted_data["lowest_price"])

        if ("highest_price" in posted_data):
            query = query + " AND" if query[-5:] != "WHERE" else query
            query = query + \
                " rating <= {}".format(posted_data["highest_price"])

        cursor.execute(query)
        data = cursor.fetchall()

        data_list = list()
        for info in data:
            data_list.append({
                "category_id": info[0],
                "product_id": info[1],
                "name": info[2],
                "rating": info[3],
                "model": info[4],
                "price": info[5],
                "image_path": info[6],
                "stock": info[7],
            })

        retJson = {
            "category_elements": data_list,
            "status_code": 200
        }
        return retJson


api.add_resource(products, "/products")


class basket(Resource):
    @cross_origin(origins="http://localhost:3000*")
    def post(self):  # add items to basket
        posted_data = request.get_json()
        return_code = check_posted_data(posted_data, "basket_post")
        if (return_code == 200):
            product_name = posted_data["product_name"]
            quantity = posted_data["quantity"]
            cursor = mysql.get_db().cursor()

            customer_id = -1

            # get product id
            query = "SELECT product_id, price FROM PRODUCT WHERE name = (%s)"
            cursor.execute(query, (product_name,))
            product_data = cursor.fetchone()
            product_id = product_data[0]
            cost = product_data[1]

            # add to basket
            query = "INSERT INTO `BASKET`(`cost`, `quantity`, `product_name`, `product_id`, `customer_id`) VALUES ((%s),(%s),(%s),(%s),(%s))"
            cursor.execute(
                query, (cost, quantity, product_name, product_id, customer_id))
            mysql.get_db().commit()

            retJson = {
                "message": "item added",
                "status_code": 200
            }

            return retJson

        else:
            return jsonify({
                "message": "Bad Request",
                "status_code": 400
            })

    @cross_origin(origins="http://localhost:3000*")
    def get(self):
        cursor = mysql.get_db().cursor()

        customer_id = -1

        # fetch all product_id's
        query = "SELECT product_id FROM BASKET WHERE customer_id = (%s)"
        cursor.execute(query, (customer_id,))
        product_ids = cursor.fetchall()

        products = list()

        for id in product_ids:
            query = "SELECT name, model, price, image_path FROM PRODUCT WHERE product_id = (%s)"
            cursor.execute(query, (id,))
            product_info = cursor.fetchone()
            products.append({
                "name": product_info[0],
                "model": product_info[1],
                "price": product_info[2],
                "image_path": product_info[3]
            })

        return jsonify({
            "products": products,
            "status_code": 200
        })

    @cross_origin(origins="http://localhost:3000*")
    def delete(self):  # delete an item from basket
        cursor = mysql.get_db().cursor()
        posted_data = request.get_json()
        if (check_posted_data(posted_data, "basket_delete") == 200):
            product_name = posted_data["product_name"]

            customer_id = -1

            # get product_id
            query = "SELECT product_id FROM PRODUCT WHERE name = (%s)"
            cursor.execute(query, (product_name,))
            product_id = cursor.fetchone()[0]

            query = "DELETE FROM BASKET WHERE customer_id = (%s) AND product_id = (%s)"
            cursor.execute(query, (customer_id, product_id))
            mysql.get_db().commit()

            return jsonify({
                "message": "successful",
                "status_code": 200
            })
        return jsonify({
            "message": "Bad Request",
            "status_code": 403
        })

    @cross_origin(origins="http://localhost:3000*")
    def put(self):  # change quantity of an item from basket
        cursor = mysql.get_db().cursor()
        posted_data = request.get_json()
        if (check_posted_data(posted_data, "basket_put") == 200):
            product_name = posted_data["product_name"]
            quantity = posted_data["quantity"]

            customer_id = -1

            # get product_id
            query = "SELECT product_id FROM PRODUCT WHERE name = (%s)"
            cursor.execute(query, (product_name,))
            product_id = cursor.fetchone()[0]

            query = "UPDATE BASKET SET quantity=(%s) WHERE customer_id = (%s) AND product_id = (%s)"
            cursor.execute(query, (quantity, customer_id, product_id))
            mysql.get_db().commit()

            return jsonify({
                "message": "successful",
                "status_code": 200
            })
        return jsonify({
            "message": "Bad Request",
            "status_code": 403
        })


api.add_resource(basket, "/basket")


class order(Resource):
    @cross_origin(origins="http://localhost:3000*")
    def post(self):  # order everything on basket
        cursor = mysql.get_db().cursor()
        customer_id = -1
        # add each product to cart

        query = "SELECT cost, quantity, product_id FROM BASKET WHERE customer_id = (%s)"

        cursor.execute(query, (customer_id,))
        elements = cursor.fetchall()
        print(elements)
        for element in elements:

            query = "INSERT INTO `CART`(`customer_id`,`product_id`, `total_cost`, `quantity`) VALUES ((%s),(%s),(%s),(%s))"
            quantity = element[1]
            total_cost = int(element[0])*int(quantity)
            product_id = element[2]
            cursor.execute(
                query, (customer_id, product_id, total_cost, quantity))
            mysql.get_db().commit()

            # get cart id
            query = "SELECT cart_id FROM CART WHERE customer_id = (%s) and product_id = (%s)"
            cursor.execute(query, (customer_id, product_id))
            cart_id = cursor.fetchone()[0]

            # add to cart_product
            query = "INSERT INTO `CART_PRODUCT`(`cart_id`,`product_id`) VALUES ((%s),(%s))"
            cursor.execute(query, (cart_id, product_id))
            mysql.get_db().commit()

            # add to orders
            query = "INSERT INTO `ORDERS`(`amount`,`status`,`cart_id`,`customer_id`,`sm_id`) VALUES ((%s),(%s),(%s),(%s),(%s))"
            cursor.execute(
                query, (quantity, "Preparing", cart_id, customer_id, 5))
            mysql.get_db().commit()

            # remove from basket
            query = "DELETE FROM `BASKET` WHERE product_id = (%s) AND customer_id = (%s)"
            cursor.execute(query, (product_id, customer_id))
            mysql.get_db().commit()

        return jsonify({
            "message": "successful",
            "status_code": 200
        })


api.add_resource(order, "/order")
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
