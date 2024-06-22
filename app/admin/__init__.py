from flask import Blueprint

#se crea un objeto del blueprint indicando su nombre y la carpeta donde se guardarán las plantillas
admin_bp=Blueprint("admin",__name__,template_folder="templates")

from . import routes