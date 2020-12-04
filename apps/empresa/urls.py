from django.conf.urls import url, include
from django.contrib.auth.decorators import login_required
from apps.empresa.views import *

urlpatterns = [
	url(r'^dashboard',dashboard, name='dashboard'),	
    url(r'^listarempresas',listarEmpresas, name='empresas'),
    url(r'^listarproyectos',listarProyectos, name='proyectos'),
    url(r'^listarestados',listarEstados, name='estados'),
    url(r'^listarhistorias',listarHistorias, name='historia'),
    url(r'^listartickets',listarHistorias, name='tickets'),
]