from django.contrib import admin
from django.urls import path
from schema.schema import CustomGraphQLView, schema
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from strawberry.django.views import GraphQLView

def home(request):
    return HttpResponse("Hi, there's nothing here.")

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('graphql/', GraphQLView.as_view(schema=schema)),
    # csrf_exempt: menonaktifkan CSRF check khusus endpoint GraphQL dan hanya dipakai oleh frontend kita sendiri
    # biasanya dipakai di API murni, nanti keamanan ditambah JWT / token auth
    path("graphql/", csrf_exempt(CustomGraphQLView.as_view(schema=schema))), # endpoint GraphQL
    # path("graphql/", csrf_exempt(GraphQLView.as_view(schema=schema))), # endpoint GraphQL
    path('', home),
]
