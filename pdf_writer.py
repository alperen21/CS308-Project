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
    def __init__(self, mystr, template, items):
        hash_result = hash(mystr)
        self.items = items
        self.filename = str(hash_result) + "-htmlfile.html"
        self.template = template
        self.item_template = """ <tr class="item">
                        <td>{}</td>
                        <td>{}</td>
                        </tr>"""
    def solid_write(self):
        with open(self.template,"r") as template:
            template_string = template.read()
            template_list = template_string.split("|")
            items_html = ""
            item = ""
            total_cost = 0
            for key in self.items:
                item = self.item_template.format(key, self.items[key])
                items_html += item
                total_cost += float(self.items[key])
            total = """<tr class="total">
					<td></td>

					<td>Total: ${}</td>
				</tr>""".format(total_cost)
            result = template_list[0] +items_html + total + template_list[1]


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
        

