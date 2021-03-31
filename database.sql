
CREATE TABLE  USERS (
  user_id INTEGER NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL, 
  password VARCHAR(30) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name  VARCHAR(30) NOT NULL,
  PRIMARY KEY (user_id)
);
CREATE TABLE CUSTOMER(
    customer_id INTEGER NOT NULL ,
    phone INTEGER(50),
    address VARCHAR(300),
    email VARCHAR(30),
    PRIMARY KEY (customer_id),
    FOREIGN KEY (customer_id) REFERENCES USERS(user_id) ON DELETE CASCADE 
);	

CREATE TABLE PRODUCT_MANAGER(
    pm_id INTEGER NOT NULL,
    PRIMARY KEY (pm_id),
   FOREIGN KEY (pm_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);
 
CREATE TABLE SALES_MANAGER(
    sm_id INTEGER NOT NULL,
    PRIMARY KEY (sm_id),
    FOREIGN KEY (sm_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);


CREATE TABLE CATEGORY(
	category_id INTEGER NOT NULL AUTO_INCREMENT,
	pm_id   INTEGER,
	category_name VARCHAR(50),
	PRIMARY KEY (category_id),
	FOREIGN KEY(pm_id) 
		REFERENCES PRODUCT_MANAGER(pm_id)  ON DELETE CASCADE);


CREATE TABLE PRODUCT(
           category_id INTEGER,
	product_id INTEGER NOT NULL AUTO_INCREMENT,
           name VARCHAR(50),
            rating FLOAT,
	model VARCHAR(30),
	price FLOAT,
	PRIMARY KEY (product_id),
           FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id) ON DELETE CASCADE);

CREATE TABLE CART(                  
   total_cost FLOAT,
   quantity INTEGER,
   cart_id INTEGER NOT NULL AUTO_INCREMENT,
   product_id INTEGER,
   customer_id  INTEGER,
   PRIMARY KEY (cart_id),
  FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id) ON DELETE CASCADE,
	   FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id) ON DELETE CASCADE);

CREATE TABLE ORDERS(
    order_id INTEGER NOT NULL AUTO_INCREMENT,
    time TIME,
    amount INTEGER,
    status VARCHAR(50),
   cart_id INTEGER,
   customer_id INTEGER,
   sm_id INTEGER,
   PRIMARY KEY (order_id),
   FOREIGN KEY (cart_id) REFERENCES CART(cart_id) ON DELETE CASCADE,
   FOREIGN KEY (sm_id) REFERENCES SALES_MANAGER(sm_id) ON DELETE CASCADE,
   FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id) ON DELETE CASCADE);

CREATE TABLE COMMENTS(
	product_id INTEGER NOT NULL,
	customer_id INTEGER,
	text VARCHAR(100),
	time TIME,
	PRIMARY KEY(product_id,customer_id),
	FOREIGN KEY(product_id)
		REFERENCES PRODUCT(product_id) ON DELETE CASCADE,
            FOREIGN KEY (customer_id)
		REFERENCES CUSTOMER (customer_id) ON DELETE CASCADE);

CREATE TABLE RATES( 
rate FLOAT,
customer_id INTEGER,
product_id INTEGER,
PRIMARY KEY(product_id,customer_id),
FOREIGN KEY(product_id) 
REFERENCES PRODUCT(product_id) ON DELETE CASCADE,
FOREIGN KEY(customer_id) 
 REFERENCES CUSTOMER(customer_id) ON DELETE CASCADE);


INSERT INTO USERS(username,password,first_name,last_name) VALUES ("begumaltunbas","1234","begum","altunbas");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("eylulsahin","234","eylul","sahin");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("gorkemguzeler","123","gorkem","guzeler");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("volkanerdemli","123","volkan","erdemli");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("barisaltop","bariss","baris","altop");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("johndoe","john123","john","doe");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("duygualtop","duyggu","duygu","altop");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("husnuyenigun","husnnu","husnu","yenigun");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("albertlevi","albert123","albert","levi");
INSERT INTO USERS(username,password,first_name,last_name) VALUES("cemalyilmaz","123**!" , "Cemal","yilmaz");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("yucelsaygin", "123456", "Yucel", "Saygin");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("otastan", "4325","Oznur", "Tastan");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("selimbalcisoy","selimbal","selim","balcisoy");
INSERT INTO USERS(username,password,first_name,last_name) VALUES ("berrinyanikoglu","berrinML","berrin","yanikoglu");

INSERT INTO USERS(user_id, username,password,first_name,last_name) VALUES (1,"albertlevi","albert123","albert","levi");
INSERT INTO USERS(user_id, username,password,first_name,last_name) VALUES(2,"cemalyilmaz","123**!" , "Cemal","yilmaz");
INSERT INTO USERS(user_id, username,password,first_name,last_name) VALUES (3,"yucelsaygin", "123456", "Yucel", "Saygin");
INSERT INTO USERS(user_id, username,password,first_name,last_name) VALUES (4,"otastan", "4325","Oznur", "Tastan");
INSERT INTO USERS(user_id, username,password,first_name,last_name) VALUES (5,"selimbalcisoy","selimbal","selim","balcisoy");
INSERT INTO USERS(user_id, username,password,first_name,last_name) VALUES (6,"berrinyanikoglu","berrinML","berrin","yanikoglu");

INSERT INTO SALES_MANAGER(sm_id) VALUES (12);
INSERT INTO SALES_MANAGER(sm_id) VALUES (13);
INSERT INTO SALES_MANAGER(sm_id) VALUES (14);


INSERT INTO CUSTOMER(customer_id,phone,address,email) VALUES (1,443657,'istanbul','albertlevininmaili@gmail.com');
INSERT INTO CUSTOMER(customer_id,phone,address,email) VALUES (2,37676,'istanbul','cemalyilmazmaili@gmail.com');
INSERT INTO CUSTOMER(customer_id,phone,address,email) VALUES (3,2365543,'ankara','yucelsayginmaili@gmail.com');
INSERT INTO CUSTOMER(customer_id,phone,address,email) VALUES (4,6545,'istanbul','otastanmili@gmail.com');
INSERT INTO CUSTOMER(customer_id,phone,address,email) VALUES (5,2441 , 'nyc' , 'selimbalmaili@gmail.com');
INSERT INTO CUSTOMER(customer_id,phone,address,email) VALUES (6,46786,'ankara','berrinyanikoglumaili@gmail.com');

INSERT INTO PRODUCT_MANAGER(pm_id) VALUES(1);
INSERT INTO PRODUCT_MANAGER(pm_id) VALUES(2);
INSERT INTO PRODUCT_MANAGER(pm_id) VALUES(3);


INSERT INTO CATEGORY(category_id,pm_id,category_name) VALUES (4,1,'filter coffee');
INSERT INTO CATEGORY(category_id,pm_id,category_name) VALUES (5,2,'turkish coffee');
INSERT INTO CATEGORY(category_id,pm_id,category_name) VALUES (6,3, 'espresso');
INSERT INTO CATEGORY(category_id,pm_id,category_name) VALUES (7,3, 'hot chocolate');
INSERT INTO CATEGORY(category_id,pm_id,category_name) VALUES (8,3, 'coffee machines');

INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (4,'Ethiopia Espresso',4.8  ,'PN2345'  , 15);
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (4,'Kenya Espresso', 4.9 , 'PN2346' , 15);
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (4,'Guatemala Espresso', 4.7 ,  'PN2347', 15);
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (4,'Hot Chocolate 50gr', 4 , 'PN3513' , 15.5);
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (4,'Hot Chocolate 100gr', 4 , 'PN3523' , 20);
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (5,'Filter Coffee Machine', 4.3 , 'PN3512'  , 149);
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (5,'Espresso Machine', 4.6, 'PN2312'  ,229 );
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (5,'Turkish Coffee Machine', 4.1, 'PN1112'  , 119  ); 
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (8,'Double Roasted Turkish Coffee 150g', 4.3 , 'PN9012'  , 15);
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (8,'Double Roasted Turkish Coffee 250g', 4.3 , 'PN9013'  , 18);
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (8,'Roasted Turkish Coffee 250g', 4.6 ,'PN9112'  ,15 );
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (8,'Roasted Turkish Coffee 150g', 4.1 , 'PN3832'  , 12 ); 
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (7,'Vanilla Flavoured Filter Coffee',4 , 'PN7483' ,19 );
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (7,'Caramel Flavoured Filter Coffee', 3.2 , 'PN0037', 19);
INSERT INTO PRODUCT(category_id,name,rating,model,price) VALUES (7,'Hazelnut Flavoured Filter Coffee', 5.0 ,'PN0078' ,25);



