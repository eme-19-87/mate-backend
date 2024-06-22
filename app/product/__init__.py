from flask import Blueprint

#se crea un objeto del blueprint indicando su nombre y la carpeta donde se guardarán las plantillas
product_bp=Blueprint("product",__name__,template_folder="templates",url_prefix='/product')

from . import routes