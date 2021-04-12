import unittest
import requests
import json
import mysql.connector
from mysql.connector import connect, Error
import os
# delete from users


class FlaskTest(unittest.TestCase):

    def setUp(self):
        self.url = "http://127.0.0.1:5000"

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

    def testRegisterUser(self):  # register a user to the database

        headers = {
            "Content-Type": "application/json"
        }
        body = {
            "first_name": "alperen",
            "last_name": "yıldız",
            "username": "alpereny16",
            "password": "mypassword",
            "email": "alperenmail21@alperen.com",
            "phone": "555555555",
            "address": "ataşehir"
        }

        response = requests.post(
            self.url + "/users", data=json.dumps(body), headers=headers)

        expected = "Registration completed."

        # response is correct
        self.assertEqual(response.json()['message'], expected)

    def testUserandCustomerTable(self):
        # check if user exists both in customers and users table
        headers = {
            "Content-Type": "application/json"
        }
        body = {
            "first_name": "alperen",
            "last_name": "yıldız",
            "username": "alpereny16",
            "password": "mypassword",
            "email": "alperenmail21@alperen.com",
            "phone": "555555555",
            "address": "ataşehir"
        }

        requests.post(
            self.url + "/users", data=json.dumps(body), headers=headers)  # creating the user
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query1 = "SELECT user_id FROM USERS WHERE username = 'alpereny16'"
            query2 = "SELECT phone FROM CUSTOMER WHERE customer_id = "
            with connection.cursor() as cursor:

                cursor.execute(query1)
                id = cursor.fetchone()[0]

                cursor.execute(query2+str(id))
                phone = cursor.fetchone()[0]

        # both id's need to be correct
        self.assertEqual(str(phone), "555555555")

    # register an already registered user to the database
    def testAlreadyRegistered(self):
        headers = {
            "Content-Type": "application/json"
        }
        body = {
            "first_name": "alperen",
            "last_name": "yıldız",
            "username": "alpereny16",
            "password": "mypassword",
            "email": "alperenmail21@alperen.com",
            "phone": "555555555",
            "address": "ataşehir"
        }

        prepare = requests.post(
            self.url + "/users", data=json.dumps(body), headers=headers)

        response = requests.post(
            self.url + "/users", data=json.dumps(body), headers=headers)

        expected = "user already exists"

        self.assertEqual(response.json()['message'], expected)


# >>> print(response.json()['message'])
if __name__ == '__main__':
    unittest.main()
