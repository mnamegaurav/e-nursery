from django.urls import path

from django.urls import path, include

from core.views import (
    CartRetrieveUpdateAPIView,

    OrdersListAPIView,
    OrderCreateAPIView,
    OrderRetrieveUpdateAPIView,
    NurseryOrdersAPIView,

    ShopsListAPIView,
    ShopsCreateAPIView,
    ShopRetrieveUpdateDestroyAPIView,

    PlantsListAPIView,
    PlantsCreateAPIView,
    PlantRetrieveUpdateDestroyAPIView,
    )


urlpatterns = [
    path('api/me/cart/', CartRetrieveUpdateAPIView.as_view()),

    path('api/me/orders/', OrdersListAPIView.as_view()),
    path('api/me/order/create/', OrderCreateAPIView.as_view()),
    path('api/me/order/<int:id>/', OrderRetrieveUpdateAPIView.as_view()),

    path('api/nursery/orders/', NurseryOrdersAPIView.as_view()),

    path('api/shops/', ShopsListAPIView.as_view()),
    path('api/shop/create/', ShopsCreateAPIView.as_view()),
    path('api/shop/<int:pk>/', ShopRetrieveUpdateDestroyAPIView.as_view()),

    path('api/plants/', PlantsListAPIView.as_view()),
    path('api/plant/create/', PlantsCreateAPIView.as_view()),
    path('api/plant/<int:pk>/', PlantRetrieveUpdateDestroyAPIView.as_view()),
]
