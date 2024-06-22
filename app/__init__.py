#permite crear la aplicación flask
from flask import Flask

#permite utilizar el token CSRF para una mejor protección
from flask_wtf.csrf import CSRFProtect
#sirve para manejar el logueo del usuario
from flask_login import LoginManager
#from pprint import pp  

#sirve para conectarse a la base de datos
from flask_sqlalchemy import SQLAlchemy

#sirve para migrar la base de datos
from flask_migrate import Migrate

#instancia de la clase  LoginManager. Importante para 
#crear una sesión y controlar la misma
login_manager=LoginManager()

#Una instancia de SQLAlchemy. Importante para trabajar con el ORM
db=SQLAlchemy()

#Una instancia de Migrate. Importante para la migración de la base de datos
migrate=Migrate(db)

"""
Permite crear una instancia de la aplicación

@param settings_module: Los datos de las configuraciones
@return: Retorna una instancia de la clase Flask
@raise keyError: raises an exception
"""
def create_app(settings_module):
    #creación de la configuración e importaciones
    app=Flask(__name__)

    #permite establecer las configuraciones de la aplicación
    app.config.from_object(settings_module)
    
    #necesario para evitar errores al momento de crear la base de datos
    app.app_context().push()
    #inicializa el objeto db (para trabajar con la base de datos) pasando
    #la instancia del objeto app creado
    db.init_app(app)
    
    #inicializa los datos del objeto migrate (usado para la migración)
    #con los datos del objeto app
    migrate.init_app(app)
    
    #inicializa los datos del objeto login_manager (usado para el login de usuarios)
    #con los datos del objeto app
    login_manager.init_app(app)
    
    #creo el objeto que manejará el token csrf
    csrf = CSRFProtect()
    #inicializo los datos del objeto csrf (usado para proteger los formularios)
    #con los datos del objeto app
    csrf.init_app(app)

    #indica que si un usuario no tiene autorización para una determinada ruta
    #debe dirigirse a la ruta de index
    login_manager.login_view='index'
    
    #la estructura de la conexión es: nombreMotor:://usuario@password:puerto/nombreBaseDeDatos
    #app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:@localhost:3306/mate'
    #app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
    
    
    #importaciones de blueprints
    from app.admin import admin_bp
    from app.auth import auth_bp
    from app.client import client_bp
    from app.product import product_bp
    #registro de los blueprints
    app.register_blueprint(admin_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(client_bp)
    app.register_blueprint(product_bp)
    return app