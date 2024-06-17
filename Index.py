from flask import Flask, render_template, url_for,redirect,request, \
    flash, session
from markupsafe import escape
from flask_wtf import FlaskForm
from flask_wtf.csrf import CSRFProtect
from Forms import LoginForm
import random
import json




app=Flask(__name__)


app.config.update(
    DEBUG=True,
    SECRET_KEY="secret",
)
csrf = CSRFProtect()
csrf.init_app(app)

#Agrega la función promedio como global para que nuestra plantilla de Jinja pueda acceder sin necesidad
#de pasar la función como parámetro a la misma
@app.add_template_global
def promedio(arreglo):
    suma=0
    for valor in arreglo:
        suma+=valor['peso']
    return round(suma/len(arreglo),3)

def suma(arreglo):
    total=0
    for valor in arreglo:
        total+=valor['peso']
    return total
app.add_template_filter(suma,'suma')

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/contacto')
def contact():
    return render_template('contactForm.html')

@app.route('/politicas')
def policy():
    return render_template('policy.html')

@app.route('/disclaimer')
def disclaimer():
    return render_template('disclaimer.html')

@app.route('/nosotros')
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
    
    return render_template('aboutUs.html',teamData=teamData)

@app.route('/login', methods=['GET','POST'])
def login():
    #request.args.get permite obtener los parámetros de query
    #print(request.args.get("saludos"))
    #print(request.get_json())
    
    #Creo una instancia del formulario creado anteriormente y se lo paso a la vista
    form=LoginForm()
    if form.validate_on_submit():
        email=form.emailField.data
        password=form.passwordField.data
        if(password=='1234' and email=='espinoza.enrique.87@gmail.com'):
            #return redirect(f'/dashboard/{email}')
            session['username']='username'
            session['email']=email
            return redirect(url_for('dashboard'))
    #El get de methods es para el renderizado. El post es para recibir los datos del formulario
    #flash("Error al ingresar los datos",'aviso')
    #flash(json.dumps({'category':'warning','msg':'Prueba mensaje JSON'}),'mensaje')

    return render_template('formLogin.html',form=form)

@app.route('/registro', methods=['GET','POST'])
def register():
    return render_template('registerForm.html')

@app.route('/productos/',methods=['GET','POST'])
@app.route('/productos/<categoria>',methods=['GET','POST'])
def products(categoria='Mate'):
    products=[  {
            'id':1,
            'nombre':'Set Matero con Bolso Premium Crudo Super Deluxe',
            'precio':'$57.295,00',
            'rutaImg':'setMatero2.png',
            'descripcion':'Set Matero De Prueba',
            'categoria':"EquipoMatero",
            'activo':1
         }]
    return render_template('productView.html',products=products)

@app.route('/dashboard/<email>',methods=['GET','POST'])
@app.route('/dashboard',methods=['GET'])
def dashboard(email=None):
  
    return render_template('dashboard.html')

@app.route('/logout',methods=['GET','POST'])
def logout():
    session.clear()
    return redirect(url_for('index'))
    
    
@app.route('/elementos')
def elementos():
    datos=[
        {'nombre':'Hidrógeno','simbolo':'H','peso':1.088},
        {'nombre':'Oxígeno','simbolo':'0','peso':16.125},
        {'nombre':'Boro','simbolo':'B','peso':5.088},
    ]
    return render_template('index.html',elementos=datos)
    
    
    
    
@app.route('/data/<value>')
def data(value):
    return f'<div> <input type="email" value={value} style="font:40px;"></div>'

@app.route('/cuadrado/<int:numero>')
def cuadrado(numero):
    return f'<h1 style="color:red;">{numero*numero} </h1>'

@app.route('/saludo/<string:nombre>/<int:edad>')
@app.route('/saludo/<string:nombre>')
@app.route('/saludo')
def saludo(nombre=None,edad=None):
    resultado=''
    if(nombre==None and edad==None):
       resultado=f'<h1 style="color:red;">Hola, humano </h1>'
    elif(nombre!=None and edad==None):
        resultado=f'<h1 style="color:red;">Hola, {nombre} </h1>'
    else:
        resultado=f'<h1 style="color:red;">Hola,{nombre}. Tienes {edad} años </h1>'
    return resultado

@app.route('/code/<path:code>')
def code(code):
     resultado=f'<h1 style="color:red;">Código,{escape(code)}.</h1>'
     return resultado
 
 #no es necesario cuando Flask levanta nuestro servidor
 #Es útil cuando ejecutamos todo desde la consola
#if __name__=='__main__':
#    app.run(debug=True)