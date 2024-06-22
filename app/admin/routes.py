from flask import render_template, url_for,redirect,request, \
    flash, session
from flask_login import login_required,current_user
#importamos el blueprint
from . import admin_bp

#usamos el bluprint creado para crear las rutas
@admin_bp.route('/dashboard',methods=['GET'])
@login_required
def dashboard():
    return render_template('admin/dashboard.html',name=current_user.name,lastname=current_user.lastname)


