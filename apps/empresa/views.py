from django.shortcuts import render
from apps.empresa.models import *

# Create your views here.

def dashboard(request):
    return render (request, "empresa/dashboard.html")

def listarEmpresas(request):
    empresas =  Empresa.objects.all()
    context = {
        "empresas":empresas,
        'showEmpresa': 'show',
        'activeEmpresa': 'active',
        'activeGroup': 'active',
    }
    return render(request, "empresa/listarEmpresas.html", context)

# def listarEmpresas(request):
#     return render (request, "empresa/dashboard.html")
def listarProyectos(request):
    return render (request, "empresa/dashboard.html")
def listarEstados(request):
    return render (request, "empresa/dashboard.html")
    