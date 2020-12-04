# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Empresa',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('nombre', models.CharField(unique=True, max_length=100)),
                ('nit', models.CharField(unique=True, max_length=20)),
                ('telefono', models.CharField(max_length=20)),
                ('direccion', models.CharField(max_length=20)),
                ('correo', models.EmailField(unique=True, max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='EmpresaUser',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('empresa', models.ForeignKey(to='empresa.Empresa')),
                ('usuario', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Estado',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('nombre', models.ForeignKey(null=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Historia',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('nombre', models.CharField(unique=True, max_length=100)),
                ('descripcion', models.CharField(max_length=500)),
                ('estado', models.ForeignKey(null=True, to='empresa.Estado')),
            ],
        ),
        migrations.CreateModel(
            name='Proyecto',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('nombre', models.CharField(unique=True, max_length=100)),
                ('descripcion', models.CharField(max_length=500)),
                ('empresa', models.ForeignKey(to='empresa.Empresa')),
                ('estado', models.ForeignKey(to='empresa.Estado')),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('nombre', models.CharField(unique=True, max_length=100)),
                ('descripcion', models.CharField(max_length=500)),
                ('estado', models.ForeignKey(null=True, to='empresa.Estado')),
                ('historia', models.ForeignKey(to='empresa.Historia')),
            ],
        ),
        migrations.AddField(
            model_name='historia',
            name='proyecto',
            field=models.ForeignKey(to='empresa.Proyecto'),
        ),
    ]
