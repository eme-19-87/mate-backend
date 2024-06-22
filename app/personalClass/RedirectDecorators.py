from functools import wraps
from flask import abort
from flask_login import current_user
from flask import url_for,redirect,request

def for_rol(role):
    def decorator(func):
        @wraps(func)
        def decorated_function(*args, **kwargs):
            if current_user.is_authenticated and current_user.rol_id == role:
                return func(*args, **kwargs)
            else:
                return redirect(url_for('client.index'))
        return decorated_function
    return decorator

def only_client_or_guest():
    def decorator(func):
        @wraps(func)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated and current_user.rol_id == 1:
                return func(*args, **kwargs)
            else:
                return redirect(url_for('client.index'))
        return decorated_function
    return decorator

def only_guest():
    def decorator(func):
        @wraps(func)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated:
                return func(*args, **kwargs)
            else:
                return redirect(url_for('client.index'))
        return decorated_function
    return decorator