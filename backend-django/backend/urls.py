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
    # endpoint GraphQL utama
    # csrf_exempt: menonaktifkan CSRF check khusus endpoint GraphQL dan hanya dipakai oleh frontend kita sendiri
    # biasanya dipakai di API murni, nanti keamanan ditambah JWT / token auth
    path("graphql/", csrf_exempt(GraphQLView.as_view(schema=schema))),
    path('', home),
]
