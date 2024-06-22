from flask import render_template, url_for,redirect,request, \
    flash
from flask_login import current_user
from . import client_bp
from ..product.models import Category


@client_bp.route('/')
@client_bp.route('/index')
def index():
    categories=Category.get_all()
    if not current_user.is_authenticated:
         return render_template('client/index.html',categories=categories)
    if current_user.rol_id==2:
        return render_template('client/index.html',categories=categories)
    if current_user.rol_id==1:
            return redirect(url_for('admin.dashboard'))

@client_bp.route('/contacto')
def contact():
    categories=Category.get_all()
    return render_template('client/contactForm.html',categories=categories)

@client_bp.route('/politicas')
def policy():
    categories=Category.get_all()
    return render_template('client/policy.html',categories=categories)

@client_bp.route('/disclaimer')
def disclaimer():
    categories=Category.get_all()
    return render_template('client/disclaimer.html',categories=categories)

@client_bp.route('/nosotros')
def aboutUs():
    teamData=[
        {'nombre':'Enrique',
        'apellido':'Espinoza',
        'nacimiento':'31/01/1987',
        'descripcion':'Estudio Licenciatura en sistemas en la Universidad Nacional Del Nordeste. Estoy en tercer año. Tengo conocimientos sobre Python, HTML, CSS, Javascript, PHP y Base De Datos Con MySQL'+
        'Me gusta leer y mejorar mis técnicas de programación.',
        'img':'persona1.jpg'
        },
        {'nombre':'Karen',
        'apellido':'Amarilla',
        'nacimiento':'04/01/1994',
        'descripcion':'Soy estudiante del CBC en la Universidad de Buenos Aires, Tengo conocimientos básicos de Python y Java.'+
        'En mis tiempos libres me gusta leer novelas, anime y practicar Taekwondo.',
        'img':'karen.jpg'},

        {'nombre':'Matías',
        'apellido':'Cirigliano',
        'nacimiento':'18/07/1984',
        'descripcion':'Soy Licenciado en Producción de Bioimágenes, trabajo en Radioterapia. Hace poco me inicié en el mundo de la programación, por curiosidades que surgieron en mi trabajo. Me gusta hacer actividad física, principalmente fútbol y escalada deportiva.',
        'img':'persona1.jpg'},

    ]
    categories=Category.get_all()
    return render_template('client/aboutUs.html',teamData=teamData,categories=categories)


    #request.args.get permite obtener los parámetros de query
    #print(request.args.get("saludos"))
    #print(request.get_json())
    
    #redirijo al login si el usuario ya está logueado
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    #Creo una instancia del formulario creado anteriormente y se lo paso a la vista
    form=LoginForm()
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
            return redirect(url_for('dashboard'))
    #El get de methods es para el renderizado. El post es para recibir los datos del formulario
    #flash("Error al ingresar los datos",'aviso')
    #flash(json.dumps({'category':'warning','msg':'Prueba mensaje JSON'}),'mensaje')

    return render_template('formLogin.html',form=form)


    #return json.dumps(request.form.to_dict())
    form=RegisterForm()
    if form.validate_on_submit() and request.method=='POST':
       name=request.form['nameField']
       lastName=request.form['lastNameField']
       email=request.form['emailField']
       password=request.form['passwordField']
       user=User(name,lastName,email,password)
       user.save()
       return redirect(url_for('login'))
    return render_template('registerForm.html',form=form)


