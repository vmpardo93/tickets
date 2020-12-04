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

def listarProyectos(request):
    Proyectos =  Proyecto.objects.all()
    context = {
        "proyectos":Proyectos,
        'showProyectos': 'show',
        'activeProyectos': 'active',
        'activeGroup': 'active',
    }
    return render(request, "empresa/listarProyectos.html", context)

def listarEstados(request):
    estados =  Estado.objects.all()
    context = {
        "estados":estados,
        'showEstados': 'show',
        'activeEstados': 'active',
        'activeGroup': 'active',
    }
    return render(request, "empresa/listarEstados.html", context)
    
def listarHistorias(request):
    historias =  Historia.objects.all()
    context = {
        "historias":historias,
        'showHistorias': 'show',
        'activeHistorias': 'active',
        'activeGroup': 'active',
    }
    return render(request, "empresa/listarHistorias.html", context)