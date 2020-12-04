from django.db import models
from django.contrib.auth.models import User,Group
from django.contrib import admin

# Create your models here.

class Empresa(models.Model):
    nombre = models.CharField(max_length = 100, unique=True,blank=False)
    nit = models.CharField(max_length = 20, unique=True,blank=False)
    telefono = models.CharField(max_length = 20,blank=False)
    direccion = models.CharField(max_length = 20,blank=False)
    correo = models.EmailField(max_length=254,unique=True, blank=False)
    def __str__(self):
        return '{}'.format(self.nombre)

class EmpresaAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('nombre', 'nit','telefono','direccion','correo')
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': ('enable_comments', 'registration_required', 'template_name')
        }),
    )
    list_display = ('nombre', 'nit','telefono','direccion','correo')

class EmpresaUser(models.Model):
    usuario = models.ForeignKey(User, null=False)
    empresa = models.ForeignKey(Empresa, null=False)

class Estado(models.Model):
    nombre = models.CharField(max_length = 100, unique=True,blank=False)
    def __str__(self):
        return '{}'.format(self.nombre)

class Proyecto(models.Model):
    nombre = models.CharField(max_length = 100, unique=True,blank=False)
    descripcion = models.CharField(max_length = 500,blank=False)
    empresa = models.ForeignKey(Empresa, null=False)
    estado = models.ForeignKey(Estado, null=False)
    def __str__(self):
        return '{}'.format(self.nombre)

class Historia(models.Model):
    nombre = models.CharField(max_length = 100, unique=True,blank=False)
    descripcion = models.CharField(max_length = 500,blank=False)
    proyecto = models.ForeignKey(Proyecto, null=False)
    estado = models.ForeignKey(Estado, null=True)
    def __str__(self):
        return '{}'.format(self.nombre)

class Ticket(models.Model):
    nombre = models.CharField(max_length = 100, unique=True,blank=False)
    descripcion = models.CharField(max_length = 500,blank=False)
    historia = models.ForeignKey(Historia, null=False)
    estado = models.ForeignKey(Estado, null=True)
    def __str__(self):
        return '{}'.format(self.nombre)