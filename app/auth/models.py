from flask_login import UserMixin
from werkzeug.security import check_password_hash,generate_password_hash
from app import db
class User(db.Model,UserMixin):
    __tablename__="users"
    id=db.Column(db.Integer,primary_key=True)
    #permite crear el campo que servirá como clave foránea del
    rol_id=db.Column(db.Integer,db.ForeignKey('roles.id'),nullable=False)
    provincia_id=db.Column(db.Integer,db.ForeignKey('provincias.id'),nullable=False)
    #rol=db.relationship('Rol',backref='Users',lazy=True)
    #provincia=db.relationship('Provincia',backref='Users',lazy=True)
    name=db.Column(db.String(64),nullable=False)
    lastname=db.Column(db.String(64),nullable=False)
    password=db.Column(db.String(256),nullable=False)
    email=db.Column(db.String(50),nullable=False,unique=True)
    sexo=db.Column(db.Integer,nullable=False)
    avatar=db.Column(db.String(50),nullable=False)
    
    def __init__(self,name,lastname,email,password,sex,avatar,provincia):
        self.name=name
        self.lastname=lastname
        self.email=email
        self.rol_id=2
        self.sexo=sex
        self.avatar=avatar
        self.provincia_id=provincia
        self.password=generate_password_hash(password)
        
    #verifica que la contraseña sea correcta
    def verify_password(self, password):
        return check_password_hash(self.password,password)
    
    #método para almacenar los datos en la tabla
    def save(self):
        if not self.id:
            db.session.add(self)
        db.session.commit()
    
    #permite eliminar un usuario de la tabla de usuarios
    def delete(self):
        db.session.delete()
        db.session.commit()
    
    #método que permite obtener al usuario mediante su email
    #query permite armar la consulta sql
    #filter_by permite seleccionar un registro en particular basándonos en el valor de uno de sus campos
    #first permite obtener el primer registro que cumpla la condición
    #staticmethod permite crear un método estático
    @staticmethod
    def get_by_email(email):
        return User.query.filter_by(email=email).first()

    #método que permite obtener el usuario mediante su id
    @staticmethod
    def get_by_id(user_id):
        return User.query.get(user_id)
    
    #recupera todos los datos de los usuarios
    @staticmethod
    def get_all():
        return User.get_all()

class Rol(db.Model):
    __tablename__="roles"
    id=db.Column(db.Integer,primary_key=True)
     #permite relacionar los usuarios con un rol específico
    user=db.relationship('User',backref='Roles',lazy=True)
    name=db.Column(db.String(64),nullable=False,unique=True)
    
    def __init__(self,name):
        self.name=name

class Provincia(db.Model):
    __tablename__="provincias"
    id=db.Column(db.Integer,primary_key=True)
    user=db.relationship('User',backref='Provincias',lazy=True)
    name=db.Column(db.String(64),nullable=False,unique=True)
    
    @staticmethod
    def get_all():
        return Provincia.query.all()