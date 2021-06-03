import unittest
import requests
import json
import mysql.connector
from mysql.connector import connect, Error
import os
import jwt
import datetime
# delete from users


class ProductTest(unittest.TestCase):

    def setUp(self):
        self.url = "http://127.0.0.1:5000"
        if os.environ.get("TEST_ENABLED") == None:
            self.skipTest('tests can only be used in the test environment')
        self.body = {
            "name": "test product",
            "rating": 3.5,
            "model": "AX92039",
            "price": 100,
            "image_path": "images/f-c.png"
        }
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

    def testaddProduct(self):
        response = requests.post(
            self.url + "/addProduct", data=json.dumps(self.body), headers=self.headers)

        expected = "New item added.."

        self.assertEqual(response.json()["message"], expected)

    def testaddAlreadyAddedProduct(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 3)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

        response = requests.post(
            self.url + "/addProduct", data=json.dumps(self.body), headers=self.headers)

        expected = "This item already exists"
        self.assertEqual(response.json()["message"], expected)

    def testIncreaseStock(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 1)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                id = cursor.fetchone()[0]
        body = {
            "product_id": id,
            "quantity": 4
        }
        response = requests.post(
            self.url + "/addStock", data=json.dumps(body), headers=self.headers)

        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'SELECT stock FROM PRODUCT WHERE product_id = '+str(id)
            with connection.cursor() as cursor:

                cursor.execute(query)
                stock = cursor.fetchone()[0]
        self.assertEqual(5, stock)

    def testIncreaseStockTwice(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 1)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                id = cursor.fetchone()[0]
        body = {
            "product_id": id,
            "quantity": 4
        }
        requests.post(
            self.url + "/addStock", data=json.dumps(body), headers=self.headers)
        requests.post(
            self.url + "/addStock", data=json.dumps(body), headers=self.headers)
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'SELECT stock FROM PRODUCT WHERE product_id = '+str(id)
            with connection.cursor() as cursor:

                cursor.execute(query)
                stock = cursor.fetchone()[0]
        self.assertEqual(9, stock)

    def testIncreaseStockNonExistent(self):
        body = {
            "product_id": 1,
            "quantity": 2
        }
        response = requests.post(
            self.url + "/addStock", data=json.dumps(body), headers=self.headers)
        expected = "This item does not exist"
        self.assertEqual(response.json()["message"], expected)

    def testDecreaseStockNonExistent(self):
        body = {
            "product_id": 1,
            "quantity": 2
        }
        response = requests.post(
            self.url + "/reduceStock", data=json.dumps(body), headers=self.headers)
        expected = "This item does not exist"
        self.assertEqual(response.json()["message"], expected)

    def testDecreaseStock(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 5)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                id = cursor.fetchone()[0]
        body = {
            "product_id": id,
            "quantity": 2
        }
        response = requests.post(
            self.url + "/reduceStock", data=json.dumps(body), headers=self.headers)

        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'SELECT stock FROM PRODUCT WHERE product_id = '+str(id)
            with connection.cursor() as cursor:

                cursor.execute(query)
                stock = cursor.fetchone()[0]
        self.assertEqual(3, stock)

    def testDecreaseStockTwice(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 5)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                id = cursor.fetchone()[0]
        body = {
            "product_id": id,
            "quantity": 2
        }
        requests.post(
            self.url + "/reduceStock", data=json.dumps(body), headers=self.headers)
        requests.post(
            self.url + "/reduceStock", data=json.dumps(body), headers=self.headers)
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'SELECT stock FROM PRODUCT WHERE product_id = '+str(id)
            with connection.cursor() as cursor:

                cursor.execute(query)
                stock = cursor.fetchone()[0]
        self.assertEqual(1, stock)

    def testDecreaseStockNegative(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 5)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                id = cursor.fetchone()[0]
        body = {
            "product_id": id,
            "quantity": 6
        }
        response = requests.post(
            self.url + "/reduceStock", data=json.dumps(body), headers=self.headers)

        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'SELECT stock FROM PRODUCT WHERE product_id = '+str(id)
            with connection.cursor() as cursor:

                cursor.execute(query)
                stock = cursor.fetchone()[0]
        self.assertEqual(0, stock)

    def testFindProduct(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 5)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                id = cursor.fetchone()[0]
        body = {
            "productName": "test product"
        }
        response = requests.post(
            self.url + "/reduceStock", data=json.dumps(body), headers=self.headers)

    def testFindRatingHigherThan(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 5)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                id = cursor.fetchone()[0]
        body = {
            "rating_higher_than": 3
        }
        response = requests.post(
            self.url + "/findProduct", data=json.dumps(body), headers=self.headers)

    def testFindRatingLowerThan(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 5)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                id = cursor.fetchone()[0]
        body = {
            "rating_lower_than": 3
        }
        response = requests.post(
            self.url + "/findProduct", data=json.dumps(body), headers=self.headers)

    def testFindPriceLowerThan(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = """INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product 1", 3.2, "AX92039", 5, "images/f-c.png", 5);
            INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product 2", 3.2, "AX92039", 1, "images/f-c.png", 5);
            """
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

        body = {
            "lowest_rating": 3
        }
        response = requests.post(
            self.url + "/productsOfCategory", data=json.dumps(body), headers=self.headers)

    def testFindPriceHigherThan(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:

            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 5)'
            with connection.cursor() as cursor:

                cursor.execute(query)
                connection.commit()

                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                id = cursor.fetchone()[0]
        body = {
            "rating_lower_than": 3
        }
        response = requests.post(
            self.url + "/findProduct", data=json.dumps(body), headers=self.headers)
    
    def testRateProduct(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 1)'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                product_name = "test product"
            query = 'INSERT INTO `USERS`(`username`, `password`, `first_name`, `last_name`, `email`) VALUES ("testUsername", "testPassword", "testName", "testSurname", "testEmail")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT user_id FROM USERS WHERE username='testUsername'")
                user_id = cursor.fetchone()[0]
        body = {
            "product_name": product_name,
            "rate": 4
        }
        header = {
            "user": "testUsername"
        }
        response = requests.post(
            self.url + "/rate", data=json.dumps(body), headers=header)

        expected = "Rate successfully added to database."

        self.assertEqual(response.json()["message"], expected)

    def testAVGRate(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 1)'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                product_name = "test product"
            query = 'INSERT INTO `USERS`(`username`, `password`, `first_name`, `last_name`, `email`) VALUES ("testUsername", "testPassword", "testName", "testSurname", "testEmail")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT user_id FROM USERS WHERE username='testUsername'")
                user_id = cursor.fetchone()[0]
            query = 'INSERT INTO `USERS`(`username`, `password`, `first_name`, `last_name`, `email`) VALUES ("testUsername2", "testPassword2", "testName2", "testSurname2", "testEmail2")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT user_id FROM USERS WHERE username='testUsername2'")
                user_id2 = cursor.fetchone()[0]
        body = {
            "product_name": product_name,
            "rate": 4
        }
        header = {
            "user": "testUsername"
        }
        requests.post(self.url + "/rate", data=json.dumps(body), headers=header)
        body2 = {
            "product_name": product_name,
            "rate": 2
        }
        header2 = {
            "user": "testUsername2"
        }
        requests.post(self.url + "/rate", data=json.dumps(body2), headers=header2)
        
        query = 'SELECT rating FROM PRODUCT WHERE name = (%s)'
        with connection.cursor() as cursor:
            cursor.execute(query,(product_name,))
            rating = cursor.fetchone()[0]

        self.assertEqual(3, rating)

    def testRateProductTwice(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 1)'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                product_name = "test product"
            query = 'INSERT INTO `USERS`(`username`, `password`, `first_name`, `last_name`, `email`) VALUES ("testUsername", "testPassword", "testName", "testSurname", "testEmail")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT user_id FROM USERS WHERE username='testUsername'")
                user_id = cursor.fetchone()[0]
        body = {
            "product_name": product_name,
            "rate": 4
        }
        header = {
            "user": "testUsername"
        }
        requests.post(self.url + "/rate", data=json.dumps(body), headers=header)
        body2 = {
            "product_name": product_name,
            "rate": 2
        }
        requests.post(self.url + "/rate", data=json.dumps(body2), headers=header)
        query = 'SELECT rating FROM PRODUCT WHERE name = (%s)'
        with connection.cursor() as cursor:
            cursor.execute(query,(product_name,))
            rating = cursor.fetchone()[0]

        self.assertEqual(4, rating)
    
    def testOrderCancelled(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 1)'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                product_name = "test product"
                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                product_id = cursor.fetchone()[0]
            query = 'INSERT INTO `USERS`(`username`, `password`, `first_name`, `last_name`, `email`) VALUES ("testUsername", "testPassword", "testName", "testSurname", "testEmail")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT user_id FROM USERS WHERE username='testUsername'")
                user_id = cursor.fetchone()[0]
            query = 'INSERT INTO `CART`(`customer_id`, `product_id`, `total_cost`, `quantity`) VALUES ((%s), (%s), 100, 2)'
            with connection.cursor() as cursor:
                cursor.execute(query,(user_id, product_id))
                connection.commit()
                cursor.execute(
                    "SELECT cart_id FROM CART WHERE product_id=(%s)", (product_id,))
                cart_id = cursor.fetchone()[0]
            query = 'INSERT INTO `ORDERS`(`time`, `amount`, `status`, `cart_id`, `customer_id`, `sm_id`, `date_of_purchase`) VALUES ((NULL, 2, "Preparing", (%s), (%s), 5, NULL)'
            with connection.cursor() as cursor:
                cursor.execute(query,(cart_id, user_id))
                connection.commit()
                cursor.execute(
                    "SELECT order_id FROM ORDERS WHERE cart_id=(%s)", (cart_id,))
                order_id = cursor.fetchone()[0]
        body = {
            "order_id": order_id
        }
        response = requests.post(
            self.url + "/cancelOrder", data=json.dumps(body), headers=self.headers)

        expected = "Order canceled successfully."

        self.assertEqual(response.json()["message"], expected)

    def testCancelledOrderStatus(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 1)'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                product_name = "test product"
                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                product_id = cursor.fetchone()[0]
            query = 'INSERT INTO `USERS`(`username`, `password`, `first_name`, `last_name`, `email`) VALUES ("testUsername", "testPassword", "testName", "testSurname", "testEmail")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT user_id FROM USERS WHERE username='testUsername'")
                user_id = cursor.fetchone()[0]
            query = 'INSERT INTO `CART`(`customer_id`, `product_id`, `total_cost`, `quantity`) VALUES ((%s), (%s), 100, 2)'
            with connection.cursor() as cursor:
                cursor.execute(query,(user_id, product_id))
                connection.commit()
                cursor.execute(
                    "SELECT cart_id FROM CART WHERE product_id=(%s)", (product_id,))
                cart_id = cursor.fetchone()[0]
            query = 'INSERT INTO `ORDERS`(`time`, `amount`, `status`, `cart_id`, `customer_id`, `sm_id`, `date_of_purchase`) VALUES ((NULL, 2, "Preparing", (%s), (%s), 5, NULL)'
            with connection.cursor() as cursor:
                cursor.execute(query,(cart_id, user_id))
                connection.commit()
                cursor.execute(
                    "SELECT order_id FROM ORDERS WHERE cart_id=(%s)", (cart_id,))
                order_id = cursor.fetchone()[0]
        body = {
            "order_id": order_id
        }
        requests.post(self.url + "/cancelOrder", data=json.dumps(body), headers=self.headers)

        query = 'SELECT status FROM ORDERS WHERE order_id = (%s)'
        with connection.cursor() as cursor:
            cursor.execute(query,(order_id,))
            order_status = cursor.fetchone()[0]

        self.assertEqual("Cancelled", order_status)

    def cancelledOrderStock(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            query = 'INSERT INTO `PRODUCT`(`name`, `rating`, `model`, `price`, `image_path`, `stock`) VALUES ("test product", 3.2, "AX92039", 5, "images/f-c.png", 5)'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                product_name = "test product"
                cursor.execute(
                    "SELECT product_id FROM PRODUCT WHERE name='test product'")
                product_id = cursor.fetchone()[0]
            query = 'INSERT INTO `USERS`(`username`, `password`, `first_name`, `last_name`, `email`) VALUES ("testUsername", "testPassword", "testName", "testSurname", "testEmail")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT user_id FROM USERS WHERE username='testUsername'")
                user_id = cursor.fetchone()[0]
            query = 'INSERT INTO `CART`(`customer_id`, `product_id`, `total_cost`, `quantity`) VALUES ((%s), (%s), 100, 3)'
            with connection.cursor() as cursor:
                cursor.execute(query,(user_id, product_id))
                connection.commit()
                cursor.execute(
                    "SELECT cart_id FROM CART WHERE product_id=(%s)", (product_id,))
                cart_id = cursor.fetchone()[0]
            query = 'INSERT INTO `ORDERS`(`time`, `amount`, `status`, `cart_id`, `customer_id`, `sm_id`, `date_of_purchase`) VALUES ((NULL, 3, "Preparing", (%s), (%s), 5, NULL)'
            with connection.cursor() as cursor:
                cursor.execute(query,(cart_id, user_id))
                connection.commit()
                cursor.execute(
                    "SELECT order_id FROM ORDERS WHERE cart_id=(%s)", (cart_id,))
                order_id = cursor.fetchone()[0]
        body = {
            "order_id": order_id
        }
        requests.post(self.url + "/cancelOrder", data=json.dumps(body), headers=self.headers)

        query = 'SELECT stock FROM PRODUCT WHERE product_id = (%s)'
        with connection.cursor() as cursor:
            cursor.execute(query,(product_id,))
            stock = cursor.fetchone()[0]

        self.assertEqual(5, stock)

    def testChangeMail(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            query = 'INSERT INTO `USERS`(`username`, `password`, `first_name`, `last_name`, `email`) VALUES ("testUsername", "testPassword", "testName", "testSurname", "testEmail")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT user_id FROM USERS WHERE username='testUsername'")
                user_id = cursor.fetchone()[0]
        body = {
            "username":"testUsername",
            "newMail": "testNewEmail"
        }
        requests.post(self.url + "/changeMail", data=json.dumps(body), headers=self.headers)

        query = 'SELECT email FROM USERS WHERE user_id = (%s)'
        with connection.cursor() as cursor:
            cursor.execute(query,(user_id,))
            newEmail = cursor.fetchone()[0]

        self.assertEqual("testNewEmail", newEmail)

    def testChangePhone(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            query = 'INSERT INTO `CUSTOMER`(`phone`, `address`, `email`) VALUES ("05015015151", "testAdress", "testEmail")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT customer_id FROM USERS WHERE email='testEmail'")
                customer_id = cursor.fetchone()[0]
        body = {
            "username":"testUsername",
            "newPhone": "testNewPhone"
        }
        requests.post(self.url + "/changePhone", data=json.dumps(body), headers=self.headers)

        query = 'SELECT phone FROM CUSTOMER WHERE customer_id = (%s)'
        with connection.cursor() as cursor:
            cursor.execute(query,(customer_id,))
            newPhone = cursor.fetchone()[0]

        self.assertEqual("testNewPhone", newPhone)
    
    def testChangeAddress(self):
        with connect(
            host=os.environ.get("DATABASE_HOST"),
            user=os.environ.get("DATABASE_USER"),
            password=os.environ.get("DATABASE_PASSWORD"),
            database=os.environ.get("DATABASE_DB")
        ) as connection:
            query = 'INSERT INTO `CUSTOMER`(`phone`, `address`, `email`) VALUES ("05015015151", "testAdress", "testEmail")'
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                cursor.execute(
                    "SELECT customer_id FROM USERS WHERE email='testEmail'")
                customer_id = cursor.fetchone()[0]
        body = {
            "username":"testUsername",
            "newAddress": "testNewAddress"
        }
        requests.post(self.url + "/changeAddress", data=json.dumps(body), headers=self.headers)

        query = 'SELECT address FROM CUSTOMER WHERE customer_id = (%s)'
        with connection.cursor() as cursor:
            cursor.execute(query,(customer_id,))
            newAddress = cursor.fetchone()[0]

        self.assertEqual("testNewAddress", newAddress)

if __name__ == '__main__':
    unittest.main()
