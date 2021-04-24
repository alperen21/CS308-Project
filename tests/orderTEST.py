import unittest
import requests
import json
import mysql.connector
from mysql.connector import connect, Error
import os
import jwt
import datetime
# delete from users


class OrderTest(unittest.TestCase):

    def setUp(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    'INSERT INTO `USERS`(`user_id`, `username`, `password`, `first_name`, `last_name`, `email`) VALUES (1,"alpereny16","12345","alperen","yildiz","www")')
                connection.commit()
                cursor.execute(
                    'INSERT INTO `PRODUCT`(`category_id`, `name`, `rating`, `model`, `price`, `image_path`, `stock`, `product_id`) VALUES (1,"test_product",3,"test model",10,"www",3,1)')
                connection.commit()

        self.url = "http://127.0.0.1:5000"
        if os.environ.get("TEST_ENABLED") == None:
            self.skipTest('tests can only be used in the test environment')

        token = jwt.encode({
            'user': "alpereny16",
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=1800)
        },

            os.environ.get("FLASK_SECRET_KEY"), algorithm='HS256')

        self.headers = {
            "Content-Type": "application/json",
            "user": "alpereny16",
            "token": token
        }

    def tearDown(self):  # completely cleans up tables in the database
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            tables = [
                "CART",
                "CATEGORY",
                "COMMENTS",
                "CUSTOMER",
                "ORDERS",
                "PRODUCT",
                "PRODUCT_MANAGER",
                "RATES",
                "SALES_MANAGER",
                "USERS"
            ]
            query = "DELETE FROM "

            with connection.cursor() as cursor:

                for table in tables:
                    cursor.execute(query+table)
                    connection.commit()

    def testAddAProductInBasket(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            with connection.cursor() as cursor:
                body = {
                    "productName": "test_product",
                    "quantity": 3
                }

                response = requests.post(
                    self.url + "/basket", data=json.dumps(body), headers=self.headers)

                cursor.execute('SELECT * FROM `BASKET` WHERE customer_id=1')
                data = cursor.fetchone()
                product_id = data[4]

                cursor.execute(
                    'SELECT name FROM `PRODUCT` WHERE product_id = '+product_id)
                data = cursor.fetchone()

                self.assertEqual(data, body["productName"])


if __name__ == '__main__':
    unittest.main()
