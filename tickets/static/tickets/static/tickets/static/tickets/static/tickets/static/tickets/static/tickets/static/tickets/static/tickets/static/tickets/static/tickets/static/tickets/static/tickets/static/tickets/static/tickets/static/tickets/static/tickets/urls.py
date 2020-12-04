from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import login, logout_then_login, password_reset, password_reset_done, password_reset_confirm, password_reset_complete

urlpatterns = [
    # Examples:
    # url(r'^$', 'tickets.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/login/$', login, {'template_name': 'general/login.html'}, name='login'),
    url(r'^accounts/logout', logout_then_login, name='logout'),
]
