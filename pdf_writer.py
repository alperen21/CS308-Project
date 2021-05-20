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
        


class invoice_html_render:
    def __init__(self, mystr, template):
        hash_result = hash(mystr)
        self.filename = str(hash_result) + "-htmlfile.html"
        self.template = template
        self.item = """ <tr class="item">
                        <td>deneme</td>
                        <td>deenemee</td>
                        </tr>"""*3
    def solid_write(self):
        with open(self.template,"r") as template:
            template_string = template.read()
            template_list = template_string.split("|")
            result = template_list[0] +self.item +template_list[1]
            with open(self.filename, "w") as output:
                output.write(result)

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

render = invoice_html_render("sdfghsadhjfa","invoice.html")
render.solid_write()