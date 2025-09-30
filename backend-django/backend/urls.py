from django.contrib import admin
from django.urls import path
from strawberry.django.views import GraphQLView
from .schema import schema
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

def home(request):
    return HttpResponse("Welcome to Django backend. GraphQL is at /graphql/")

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('graphql/', GraphQLView.as_view(schema=schema)),
    path("graphql/", csrf_exempt(GraphQLView.as_view(schema=schema))), # csrf_exempt: dipakai kalau API hanya dipakai oleh frontend kita sendiri, dan otentikasi nanti pakai JWT / session lain.
    path('', home),
]
