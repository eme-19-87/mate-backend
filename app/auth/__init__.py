from flask import Blueprint

#se crea un objeto del blueprint indicando su nombre y la carpeta donde se guardarán las plantillas
auth_bp=Blueprint("auth",__name__,template_folder="templates")

from . import routes