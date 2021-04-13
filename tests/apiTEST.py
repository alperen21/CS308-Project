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
        if os.environ.get("TEST_ENABLED") == None:
            self.skipTest('tests can only be used in the test environment')
        self.body = {
            "first_name": "alperen",
            "last_name": "yıldız",
            "username": "alpereny16",
            "password": "mypassword",
            "email": "alperenmail21@alperen.com",
            "phone": "555555555",
            "address": "ataşehir"
        }
        self.headers = {
            "Content-Type": "application/json"
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

    def testRegisterUser(self):  # register a user to the database

        response = requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)

        expected = "Registration completed."

        # response is correct
        self.assertEqual(response.json()['message'], expected)

    def testRegisterUserMissingField(self):  # register a user to the database

        body = {
            "last_name": "yıldız",
            "username": "alpereny16",
            "password": "mypassword",
            "email": "alperenmail21@alperen.com"
        }
        response = requests.post(
            self.url + "/users", data=json.dumps(body), headers=self.headers)

        expected = "missing arguments"

        # response is correct
        self.assertEqual(response.json()['message'], expected)

    def testUserandCustomerTable(self):
        # check if user exists both in customers and users table

        requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)  # creating the user
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

        prepare = requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)

        response = requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)

        expected = "user already exists"

        self.assertEqual(response.json()['message'], expected)

    def testlogin(self):  # logging in with a real user

        prepare = requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)  # to register a new user

        body = {
            "username": "alpereny16",
            "password": "mypassword"
        }

        response = requests.post(
            self.url + "/auth", data=json.dumps(body), headers=self.headers)  # loggin in

        expected = "alperen"

        self.assertEqual(response.json()["name"], expected)

    def testloginWithWrongPassword(self):  # logging in with a real user

        prepare = requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)  # to register a new user

        body = {
            "username": "alpereny16",
            "password": "mypasswo"
        }

        response = requests.post(
            self.url + "/auth", data=json.dumps(body), headers=self.headers)  # loggin in

        expected = "user not found"

        self.assertEqual(response.json()["message"], expected)

    def testloginWithWrongUsername(self):  # logging in with a real user

        prepare = requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)  # to register a new user

        body = {
            "username": "alpereny1",
            "password": "mypassword"
        }

        response = requests.post(
            self.url + "/auth", data=json.dumps(body), headers=self.headers)  # loggin in

        expected = "user not found"

        self.assertEqual(response.json()["message"], expected)

    def testloginMissingPassword(self):

        prepare = requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)  # to register a new user

        body = {
            "username": "alpereny16",
        }

        response = requests.post(
            self.url + "/auth", data=json.dumps(body), headers=self.headers)  # loggin in

        expected = "Missing fields"

        self.assertEqual(response.json()["message"], expected)

    def testloginMissingUsername(self):

        prepare = requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)  # to register a new user

        body = {
            "password": "12345"
        }

        response = requests.post(
            self.url + "/auth", data=json.dumps(body), headers=self.headers)  # loggin in

        expected = "Missing fields"

        self.assertEqual(response.json()["message"], expected)

    def testGetLoggedInUser(self):

        prepare = requests.post(
            self.url + "/users", data=json.dumps(self.body), headers=self.headers)  # registered the user

        credentials = {
            "username": "alpereny16",
            "password": "mypassword"
        }

        login = requests.post(
            self.url + "/auth", data=json.dumps(credentials), headers=self.headers)
        token = login.json()["token"]
        body = {
            "username": "alpereny16"
        }

        response = requests.get(
            self.url + "/auth?token="+token, data=json.dumps(self.body), headers=self.headers)

        self.assertEqual(response.json()["message"], True)

    def testGetLoggedInUserWrongToken(self):  # register a user to the database

        response = requests.get(
            self.url + "/auth?token=asd", data=json.dumps(self.body), headers=self.headers)

        self.assertEqual(response.json()["message"], "invalid token")

    def testGetLoggedInUserNoToken(self):  # register a user to the database

        response = requests.get(
            self.url + "/auth", data=json.dumps(self.body), headers=self.headers)

        self.assertEqual(response.json()["message"], "Forbidden")


# >>> print(response.json()['message'])
if __name__ == '__main__':
    unittest.main()
