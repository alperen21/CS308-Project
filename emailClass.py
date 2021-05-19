from datetime import datetime
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from Google import Create_Service
import base64


class SMTPemail():
    def __init__(self, TO, MSG, TITLE):

        # init this instance of this object
        self.TO = TO
        self.MSG = MSG
        self.TITLE = TITLE

        # initialising the MIMEMultipart object and body object
        self.mail = MIMEMultipart()

        self.mail["To"] = self.TO
        self.mail["Subject"] = self.TITLE

        body = MIMEText(self.MSG, "plain")
        self.mail.attach(body)

    def connect(self):

        self.connection = smtplib.SMTP("smtp.gmail.com", 587)
        self.connection.ehlo()
        self.connection.starttls()

    def login(self):

        self.connection.login(os.environ.get("EMAIL"),
                              os.environ.get("PASSWORD"))

    def disconnect(self):

        self.connection.close()

    def send(self):

        try:
            self.connect()
            self.login()

            self.connection.sendmail(
                os.environ.get("EMAIL"),
                self.mail["To"],
                self.mail.as_string()
            )

            self.disconnect()
            print("")
        except Exception:
            print("")


class OAuthMail():
    def __init__(self, TO, TITLE, MSG=None, html=None):

        # init this instance of this object
        self.html = html
        self.TO = TO
        self.MSG = MSG
        self.TITLE = TITLE
        self.mail = MIMEMultipart()

        self.mail["To"] = self.TO
        self.mail["Subject"] = self.TITLE

        if (html is None):
            body = MIMEText(self.MSG, "plain")
            self.mail.attach(body)
        else:
            with open(self.html, "r") as file:
                message = file.read()
                body = MIMEText(message, 'html')
                self.mail.attach(body)

    def start_service(self):
        self.service = Create_Service(
            "client_secret.json",
            "gmail",
            "v1",
            ["https://mail.google.com/"]
        )

    def send(self):

        try:
            self.start_service()
            raw_string = base64.urlsafe_b64encode(
                self.mail.as_bytes()).decode()
            message = self.service.users().messages().send(
                userId='alperenbot086@gmail.com', body={'raw': raw_string}).execute()
            print("email successfully sent")
        except Exception:
            print("email could not be sent")


# OAuthMail("alperenyildiz@sabanciuniv.edu",
#          "html email", html="mails/welcome.html").send()
# with open("index.html", "r") as file:
#    print(file.read())
