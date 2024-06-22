#me permite crear un formulario de flask_wtf. Este formulario servirá para
#facilitar las capturas de los errores
from flask_wtf import FlaskForm

#FileAllowed me permite establecer que tipo de archivos le será permitido al campo
#de fileinput. En este caso, qué tipos de archivos se permitirán para el avatar
from flask_wtf.file import FileAllowed

#Importo los objetos que servirán para crear campos de radibutton, select, password,etc
from wtforms import RadioField,SelectField,FileField,PasswordField,EmailField,SubmitField,StringField,validators

#importo los modelos para controlar que el usuario no quiera colocar un mail repetido
#y para cargar las provincias en el select
from .models import User,Provincia

#sirve para controlar expresiones regulares
import re
def control_email():
  def _control_email(form,field):
    data=field.data
    email=User.get_by_email(data)
    if(email!=None):
      raise validators.ValidationError("El email ya existe")
    
  return _control_email

def control_image():
  def _control_image(form,field):
    data=form.avatarField.temporaryFile
    print(data)
    pattern = re.compile(r'^.*\.(jpg|jpeg|png)$', re.IGNORECASE)

    if(not pattern.match(data)):
      raise validators.ValidationError("La imagen debe ser jpg, jpeg o png")
  return _control_image
  
def get_provincias():
  provincias=Provincia.get_all()
  list_provincias=[]
  for prov in provincias:
    list_provincias.append((prov.id,prov.name))
   
  return list_provincias
  
  """Permite crear el formulario de logueo. Sus campos serán:
    emailField: el campo para el email
    passwordField: el campo para la contraseá"""

class LoginForm(FlaskForm):
    #creo un objeto con los campos del formulario
    
    #El campo para el email que contralará que el email sea colocado y que tenga un formato de
    #email
    emailField=EmailField("Ingrese el correo",[validators.DataRequired('El mail es requerido'),
    validators.Email('El mail tiene un formato incorrecto')])
    
    
    passwordField=PasswordField("Ingrese contraseña",[validators.DataRequired('La contraseña es requerida'),
    validators.length(8,64,'La contraseña debe tener entre 8 y 64 caracteres')])
    submit=SubmitField("Enviar")
    
class RegisterForm(FlaskForm):
    #Se crea el input para el nombre validando que no sea en blanco y que esté entre 4 y 32 caracteres
    nameField=StringField("Nombre",[validators.DataRequired('Se requiere un nombre'),
                                  validators.length(4,32,'El nombre debe tener entre 4 y 32 caracteres')])
    #Se crea el input para el apellido validando que no sea en blanco y que esté entre 4 y 32 caracteres
    lastNameField=StringField("Apellido",[validators.DataRequired('Se requiere un apellido'),
                                  validators.length(4,32,'El nombre debe tener entre 4 y 32 caracteres')])
    #Se crea el input para el email validando que no sea en blanco y que sea mail
    emailField=EmailField("Ingrese el correo",[validators.DataRequired('El mail es requerido'),
    validators.Email('El mail tiene un formato incorrecto'),control_email()])
    
    #Se crea el input para la contraseña y se valida que no sea vacío, que tenga entre 8 y 64 caracteres
    passwordField=PasswordField("Ingrese contraseña",[validators.DataRequired('La contraseña es requerida'),
    validators.length(8,64,'La contraseña debe tener entre 8 y 64 caracteres')])
    
      #Se crea el input para la repetición de la constraseña, que no sea vacío, que tenga entre 8 y 64 
      #caracteres y que coincida con el campo de la contraseña-
    repeatPasswordField=PasswordField("Repetir Contraseña",
    [validators.DataRequired('La contraseña es requerida'),
    validators.length(8,64,'La contraseña debe tener entre 8 y 64 caracteres'),
    validators.equal_to('passwordField','Las constraseñas deben coincidir')])

    avatarField=FileField("Seleccione un avatar",[validators.DataRequired("Seleccione una imagen"),FileAllowed(['jpg', 'jpeg', 'png'], 'Solo imágenes!')])
    provinciaField=SelectField("Seleccione una categoria",choices=get_provincias())
    sexField=RadioField("Elija el sexo",choices=[(0,'Masculino'),(1,'Femenino')])
    #crea el botón para enviar el formulario
    submit=SubmitField("Enviar")

