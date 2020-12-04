from django.conf.urls import url, include
from django.contrib.auth.decorators import login_required
from apps.empresa.views import *

urlpatterns = [
	url(r'^dashboard',dashboard, name='dashboard'),	
    url(r'^listarempresas',listarEmpresas, name='empresas'),

]