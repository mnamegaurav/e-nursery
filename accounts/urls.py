from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from accounts.views import (
    UserSignInAPIView,
    UserSignUpAPIView,
    UserSignOutAPIView,
    UserDetailAPIView,
    UserDeactivateAPIView,
)

urlpatterns = [
    path('api/signin/', UserSignInAPIView.as_view(), name='signin_view'),
    path('api/signout/', UserSignOutAPIView.as_view(), name='signout_view'),
    path('api/signup/', UserSignUpAPIView.as_view(), name='signup_view'),
    path('api/token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh_view'),
    path('api/me/', UserDetailAPIView.as_view(), name='user_detail_view'),
    path('api/me/deactivate/', UserDeactivateAPIView.as_view(),
         name='user_deactivate_view'),
]
