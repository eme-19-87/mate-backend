from flask import render_template, url_for,redirect,request, \
    flash, current_app
from flask_login import login_user,login_required,current_user,logout_user
from werkzeug.utils import secure_filename
from .forms import LoginForm, RegisterForm
from .models import User
from ..product.models import Category
from . import auth_bp
import os
from datetime import datetime



@auth_bp.route('/login', methods=['GET','POST'])
def login():
    #request.args.get permite obtener los parámetros de query
    #print(request.args.get("saludos"))
    #print(request.get_json())
    
    #redirijo al login si el usuario ya está logueado
    if current_user.is_authenticated:
        return redirect(url_for('client.index'))
    #Creo una instancia del formulario creado anteriormente y se lo paso a la vista
    form=LoginForm()
    categories=Category.get_all()
    if form.validate_on_submit() and request.method=='POST':
        email=form.emailField.data
        password=form.passwordField.data
        #return redirect(f'/dashboard/{email}')
        #session['username']='username'
        #session['email']=email
        #recupero al usuario
       
        user=User.get_by_email(email)
        if user is not None and user.verify_password(password):
            
            login_user(user)
            return redirect(url_for('client.index'))
    #El get de methods es para el renderizado. El post es para recibir los datos del formulario
    #flash("Error al ingresar los datos",'aviso')
    #flash(json.dumps({'category':'warning','msg':'Prueba mensaje JSON'}),'mensaje')

    return render_template('auth/formLogin.html',form=form,categories=categories)

@auth_bp.route('/registro', methods=['GET','POST'])
def register():
    #return json.dumps(request.form.to_dict())
    form=RegisterForm()
    categories=Category.get_all()
    if form.validate_on_submit() and request.method=='POST':
       name=request.form['nameField']
       lastName=request.form['lastNameField']
       email=request.form['emailField']
       password=request.form['passwordField']
       sex=request.form['sexField']
       provincia=request.form['provinciaField']
       avatar=form.avatarField.data
       file_name=avatar.filename
       file_extension = os.path.splitext(file_name)[1]
       ahora=datetime.now()
       img_name=str(ahora.day)+str(ahora.month)+str(ahora.year)+str(ahora.hour)+str(ahora.minute)+str(ahora.second)+str(ahora.microsecond)+file_extension
       avatar.save(os.path.join('static/img/users', secure_filename(img_name)))
       user=User(name,lastName,email,password,sex,avatar,provincia)
       user.save()
       return redirect(url_for('auth.login'))
    return render_template('auth/registerForm.html',form=form,categories=categories)





@auth_bp.route('/logout',methods=['GET','POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('client.index'))

 #esto permite la carga del usuario
 #login_user se encarga de llamar a este método y hacer la carga  
 #con current_app pude solucionar el problema de que no encontraba el login_manager
 #supongo que el problema es que no encontraba los datos de la aplicación para aplicar el decorador
@current_app.login_manager.user_loader
def load_user(user_id):
    return User.get_by_id(int(user_id))
