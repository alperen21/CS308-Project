import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


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
            print("email sent to:", self.TO)
        except Exception:
            print("email could not be sent to:", self.TO)
