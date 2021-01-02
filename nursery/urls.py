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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('core/', include('core.urls')),
    path('user/', include('user.urls')),
]

if settings.DEBUG==True:
    urlpatterns.extend(static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))

"""
All API Routes -

Authentication Routes-
Signup -    /user/auth/users/
Signin -    /user/auth/jwt/create/ then /token/login/
Logout -    /token/logout/


Available for All authenticated users-
List All Shops -           /core/api/shops/
List All Plants -          /core/api/plants/
Veiew a Plants -          /core/api/plants/<id>
My Cart -             /core/api/cart/
My Orders -           /core/api/orders/

Only for nurseries -
My Shops -            /core/api/my/shops/
My Shop Orders -      /core/api/myshop/orders/
"""