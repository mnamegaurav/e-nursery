from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from accounts.views import (
    UserSignUpAPIView, 
    UserSignOutAPIView
)

urlpatterns = [
    path('api/signin/', TokenObtainPairView.as_view(), name='signin_view'),
    path('api/signout/', UserSignOutAPIView.as_view(), name='signout_view'),
    path('api/signup/', UserSignUpAPIView.as_view(), name='signup_view'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
