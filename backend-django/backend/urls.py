from django.contrib import admin
from django.urls import path
from strawberry.django.views import GraphQLView
from .schema import schema
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Django backend. GraphQL is at /graphql/")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', GraphQLView.as_view(schema=schema)),
    path('', home),
]
