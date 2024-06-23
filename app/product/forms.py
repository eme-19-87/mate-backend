from flask_wtf import FlaskForm
from flask import request
from wtforms import TextAreaField,SelectField,FileField,SubmitField,StringField,IntegerField,FloatField,validators
from .models import Product,Category
import re


def unique_name():
   def _unique_name(form, field):
      data=field.data
      #recupero el id del producto que estoy actualizando
      id=int(form.get_id())
      
      #si es cero, significa que no estoy actualizando un producto
      if id==0:
         product=Product.get_by_name(data)
      else:
         #en caso contrario, el producto se está actualizando y debo omitir el producto
         #que se actualizará porque el nombre debe ser único.
         #Si revisara todos los productos, encontraría que él mismo tiene el mismo nombre
         #y no permitiría la actualización
         product=Product.get_by_name_update(data,id)
      if product!=None:
         raise validators.ValidationError("El nombre del producto ya fue registrado")


   return _unique_name
    
def control_stock():
   def _control_stock(form, field):
      data=int(field.data)
           
      if data<=1:
         raise validators.ValidationError("El stock debe ser mayor a cero")
 

   return _control_stock
   
def control_image():
  def _control_image(form,field):
    data=field.data.name
    pattern = re.compile(r'^.*\.(jpg|jpeg|png)$', re.IGNORECASE)

    if(not pattern.match(data)):
      raise validators.ValidationError("La imagen debe ser jpg, jpeg o png")
  return _control_image

def control_price():
   def _control_price(form, field):
      data=float(field.data)
           
      if data<=0:
         raise validators.ValidationError("El precio debe ser mayor a cero")

   return _control_price
         
def get_categories():
   categories=Category.get_all()
   list_categories=[]
   for category in categories:
      list_categories.append((category.id,category.name))
   
   return list_categories

class ProductForm(FlaskForm):
    #creo un objeto con los campos del formulario
    name=TextAreaField("Nombre",[validators.DataRequired('El nombre es requerido'),unique_name()],render_kw={"rows": 2, "cols": 30})
    price=FloatField("Precio",[validators.DataRequired('El precio es requerido'),control_price()])
    stock=IntegerField("Stock",[validators.DataRequired("El stock es requerido"),control_stock()])
    description=TextAreaField("Descripcion",[validators.DataRequired("Se requier de una descripción")],render_kw={"rows": 5, "cols": 50})
    category=SelectField("Categoria",choices=get_categories())
    img=FileField("Imagen")
    submit=SubmitField("Enviar")
    
    def __init__(self, *args, **kwargs):
        super(ProductForm, self).__init__(*args, **kwargs)
        #sirve para controlar si es que se produce una actualización o no
        self.id = 0
    
    def get_id(self):
       return self.id
    
    def set_id(self,id):
       self.id=id