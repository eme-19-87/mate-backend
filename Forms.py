from flask_wtf import FlaskForm
from wtforms import PasswordField,EmailField,SubmitField,validators

class LoginForm(FlaskForm):
    #creo un objeto con los campos del formulario
    emailField=EmailField("Ingrese el correo",[validators.DataRequired('El mail es requerido'),
    validators.Email('El mail tiene un formato incorrecto')])
    passwordField=PasswordField("Ingrese contraseña",[validators.DataRequired('La contraseña es requerida'),
    validators.length(8,64,'La contraseña debe tener entre 8 y 64 caracteres')])
    submit=SubmitField("Enviar")

