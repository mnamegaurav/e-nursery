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
from django.conf.urls import url
from django.views.generic import TemplateView

from rest_framework.schemas import get_schema_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    path('', include('accounts.urls')),

    path('openapi', get_schema_view(
        title="Your Project",
        description="API for all things …",
        version="1.0.0"
    ), name='openapi-schema'),

    path('', TemplateView.as_view(
        template_name='doc.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='api_doc'),
]

if settings.DEBUG == True:
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
