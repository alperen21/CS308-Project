from flask import Flask, render_template
import mysql.connector
from flask import request

app = Flask(__name__)

conn = mysql.connector.connect(host="remotemysql.com", user="7RHhKqjZjO", password="SZWMpehck2", database="7RHhKqjZjO")
cursor = conn.cursor()


@app.route('/')
def home():
    return render_template('login.html')

@app.route('/register')
def about():
    return render_template('register.html')



@app.route('/login_validation', methods=['POST'])
def login_validation():
    email=request.form.get('email')
    password=request.form.get('password')

    cursor.execute(""" SELECT * FROM `users` WHERE `email` LIKE '{}' AND `password` LIKE '{}'""".format(email,password))
    users = cursor.fetchall()
    if len(users)>0:
        return render_template('home.html')
    else:
        return render_template('login.html')
        
@app.route('/add_user', methods=['POST'])
def add_user():
    name=request.form.get('uname')
    email=request.form.get('uemail')
    password=request.form.get('upassword')

    cursor.execute("""INSERT INTO `users` (`name`, `email`, `password`) VALUES ('{}', '{}', '{}')""".format(name,email,password))
    conn.commit()
    return "User registration successfull"





if __name__ == "__main__":
    app.run(debug=True)


