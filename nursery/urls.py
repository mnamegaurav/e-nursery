"""nursery URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework import permissions

from drf_yasg.views import get_schema_view as get_redoc_schema
from drf_yasg import openapi

schema_view = get_redoc_schema(
    openapi.Info(
        title="E-Nursery API",
        default_version='v1',
        description="Test description",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('openapi', get_schema_view(
        title="E-Nursery",
        description="API for all E-Nursery",
        version="1.0.0"
    ), name='openapi-schema'),

    # drf CoreAPI docs
    path('', include_docs_urls(title="E-Nursery"), name='drf-doc'),

    # Open API Docs ReDoc
    path(
        'redoc/',
        schema_view.with_ui(
            'redoc', cache_timeout=0
        ), name='redoc'
    ),

    # Open API Docs Swagger
    path(
        'swagger/',
        TemplateView.as_view(
            template_name='doc.html',
            extra_context={'schema_url': 'openapi-schema'}
        ), name='swagger-doc'
    ),

    path('', include('core.urls')),
    path('', include('accounts.urls')),

]

if settings.DEBUG:
    urlpatterns.extend(
        static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))

"""
All API Routes -

-------------
Authentication Routes-
# Signup -    /api/signup
# Signin -    /api/signin
# Logout -    /api/signout
-------------



-------------
For Nurseries and Other Users

# Get All Shops -               /api/shops
# Create a Shop -               /api/shop/create
# Update/Get/Delete a Shop -    /api/shop/<id>

# Get All Plants -               /api/plants
# Create a Plant -               /api/plant/create
# Update/Get/Delete a Plant -    /api/plant/<id>
-------------




-------------
For User with having object permissions only

# Get My Cart with Items - /api/me/cart   [GET, PUT]

# Get All My Orders -                 /api/me/orders
# Get or Cancel a Order -             /api/me/order/<orderId>
# Create a new Order -                /api/me/order/create
-------------


For Nurseries-
# Get my shop orders -             /api/nursery/orders/
"""
