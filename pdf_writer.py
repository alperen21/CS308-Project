import pdfkit
import os
import time
import threading

class pdf_writer:
    def __init__(self, mystr, template):
        hash_result = hash(mystr)
        self.filename = str(hash_result) + "-pdffile.pdf"
        self.template = template
    
    def solid_write(self):
        self.pdf = pdfkit.from_file(self.template, self.filename)

    def solid_delete(self):
        os.remove(self.filename)

    def ephemeral_delete(self):
        print("starting: ",self.filename)
        time.sleep(30)
        os.remove(self.filename)
        print("done")

    def ephemeral_write(self):
        self.solid_write()
        t = threading.Thread(target=self.ephemeral_delete)
        t.start()
        

