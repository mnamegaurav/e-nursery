from django.urls import path, include

urlpatterns = [
    """
    djoser is a third party package used for integrating 
    API based authentication system in django.
    """
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
