from flask import render_template, url_for,redirect,request, \
    flash, current_app
from flask_login import login_user,login_required,current_user,logout_user
from .forms import ProductForm
from .models import Product,Category
from datetime import datetime
from app.personalClass.RedirectDecorators import for_rol
import os
from . import product_bp


#@product_bp.route('/productos/',methods=['GET','POST'])
#@product_bp.route('/productos/<categoria>',methods=['GET','POST'])
#def products(category=1):
    #form=ProductForm()

def delete_old_file(filename):
    file_path = os.path.join('app/static/img/products', filename)
    if os.path.exists(file_path):
        os.remove(file_path)

@product_bp.route('/index/',methods=['GET'])
@for_rol(1)
def index():
    products=Product.get_all()
    return render_template('products/productList.html',products=products)
    
    
@product_bp.route('/create/',methods=['GET'])
@for_rol(1)
def create():
    form=ProductForm()
    categories=Category.get_all()
    return render_template('products/create.html',form=form,categories=categories)

@product_bp.route('/store/',methods=['POST'])
@for_rol(1)
def store():
    form=ProductForm()
    if form.validate_on_submit() and request.method=='POST':
       name=request.form['name']
       price=float(request.form['price'])
       stock=int(request.form['stock'])
       category=int(request.form['category'])
       description=request.form['description']
       img=form.img.data
       if img:
            img_name=img.filename
            file_extension = os.path.splitext(img_name)[1]
            ahora=datetime.now()
            file_name=str(ahora.day)+str(ahora.month)+str(ahora.year)+str(ahora.hour)+str(ahora.minute)+str(ahora.second)+str(ahora.microsecond)+file_extension
            img.save(os.path.join('app/static/img/products/', file_name))
       else:
           file_name="no_prod_image.png"
       product=Product(name,category,price,stock,description,file_name)
       product.save()
       return redirect(url_for('product.index'))
    return render_template('products/productForm.html',form=form)

@product_bp.route('/edit/<id>',methods=['GET'])
@for_rol(1)
def edit(id):
    
    product=Product.get_by_id(int(id))
    img=product.img
    #data={"name":product.name,"price":product.price,"stock":product.stock,
          #"description":product.description,"category":product.category}
    form=ProductForm(obj=product)
    return render_template('products/update.html',form=form,img=img,id=product.id) 

@product_bp.route('/update',methods=['POST'])
@for_rol(1)
def update():
    product=Product.get_by_id(int(request.form.get('id')))
    form=ProductForm()
    #permite que establezca el id del producto que estoy actualizando
    form.set_id(product.id)
        
    if form.validate_on_submit() and request.method=='POST':
        #si la imagen tiene un nombre de archivo, es porque quiero cambiar la imagen
        if form.img.data.filename!="":
            delete_old_file(product.img)
            img=form.img.data
            img_name=img.filename
            file_extension = os.path.splitext(img_name)[1]
            ahora=datetime.now()
            file_name=str(ahora.day)+str(ahora.month)+str(ahora.year)+str(ahora.hour)+str(ahora.minute)+str(ahora.second)+str(ahora.microsecond)+file_extension
            img.save(os.path.join('app/static/img/products/', file_name))
            product.img=file_name
        product.name=request.form.get('name')
        product.price=float(request.form.get('price'))
        product.stock=int(request.form.get('stock'))
        product.category_id=int(request.form.get('category'))
        product.description=request.form.get("description")
        product.save()
        return redirect(url_for('product.index'))
    flash(form.errors,'error')
    print(form.errors)
    return redirect(url_for('product.edit',id=request.form.get('id')))

@product_bp.route('/delete',methods=['POST'])
@for_rol(1)
def delete():
    id=int(request.form['id'])
    product=Product.get_by_id(id)
    product.delete()
    return redirect(url_for('product.index'))