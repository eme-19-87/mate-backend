
from app import db

"""_summary_
    La clase que define al modelo de productos
"""
class Product(db.Model):
    __tablename__="products"
    id=db.Column(db.Integer,primary_key=True)
    #permite crear el campo que servirá como clave foránea del
    category_id=db.Column(db.Integer,db.ForeignKey('categories.id'),nullable=False)
    category = db.relationship('Category', backref=db.backref('categories', lazy=True))
    name=db.Column(db.String(64),nullable=False,unique=True)
    price=db.Column(db.Float,nullable=False)
    stock=db.Column(db.Integer,nullable=False)
    description=db.Column(db.String(256),nullable=False)
    img=db.Column(db.String(60),nullable=False)
    
    """El constructor de la clase
    
    Keyword arguments:
    name -- El nombre del producto
    category_id -- El id de la categoría del producto
    price -- El precio del producto
    stock -- El stock del producto
    description -- Una descripción del producto
    imgName -- El nombre de la imagen del producto
    Return: return_description
    """
    
    def __init__(self,name,category_id,price,stock,description,imgName):
        self.name=name
        self.category_id=category_id
        self.price=price
        self.stock=stock
        self.description=description
        self.img=imgName
    
    
    """Permite guardar o actualizar un producto específico
    

    """
    
    def save(self):
        if not self.id:
            db.session.add(self)
        db.session.commit()
    
    """Permite eliminar un producto específico
    
    """
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    
    """Permite obtener un producto según su id
    
    Keyword arguments:
    prod_id -- El id del producto buscado
    Return: Retorna un objeto de tipo Product con los datos del producto 
    o None en caso de que no se encuentre
    """
    
    #método que permite obtener el usuario mediante su id
    @staticmethod
    def get_by_id(prod_id):
        return Product.query.get(prod_id)
    
    """Permite recuperar todos los productos
    
    """
    
    #recupera todos los datos de los usuarios
    @staticmethod
    def get_all():
        return Product.query.join(Category,Category.id==Product.category_id).all()

     
    """Permite recuperar todos los productos de una categoría dada
    
    Keyword arguments:
    category_id -- El id de la categoría buscada
    Return: Retorna una lista de objetos Product o None en caso contrario
    """
    
    @staticmethod
    def get_all_by_category(category_id):
        return Product.query.filter_by(category_id=category_id).all()
    
    @staticmethod
    def get_by_name(name):
        return Product.query.filter_by(name=name).first()
    
    @staticmethod
    def get_by_name_update(name,prod_id):

        return Product.query.filter(Product.name==name,Product.id!=prod_id).first()
    
"""Modelo para la categorias

"""

class Category(db.Model):
    __tablename__='categories'
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(64),nullable=False,unique=True)
    
    """El constructor de la categoría
    
    Keyword arguments:
    name -- el nombre de la categoría
    """
    
    def __init__(self,name):
        self.name=name
    
    """Permite recuperar todas las categorias
    
    Keyword arguments:
   
    Return: Retorna una colección de las categorias existentes
    """
    
    def get_all():
        return Category.query.all()
    
    