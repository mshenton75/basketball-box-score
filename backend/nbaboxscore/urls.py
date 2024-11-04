from django.contrib import admin
from django.urls import path
from . import api

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", api.index, name="index"),
]
