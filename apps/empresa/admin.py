from django.contrib import admin
from apps.empresa.models import *

# Register your models here.

admin.site.register(Empresa)
admin.site.register(Estado)
admin.site.register(Proyecto)
admin.site.register(Historia)