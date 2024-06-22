import os
from app import create_app

#permite capturar una variable de entorno
settings_module=os.getenv("CONFIG_ENV")

#creo la instancia de la aplicación Flask
app=create_app(settings_module)