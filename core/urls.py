from django.urls import path, include

from rest_framework import routers

from core.views import (
    ShopViewSet,
    MyShopViewSet,
    PlantViewSet,
    OrderViewSet,
    MyShopOrdersAPIView,
    CartAPIView,
    )


router = routers.SimpleRouter()
router.register('shops', ShopViewSet, basename='shops')
router.register('my/shops', MyShopViewSet, basename='my_shops')
router.register('plants', PlantViewSet, basename='plants')
router.register('orders', OrderViewSet, basename='orders')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/cart/', CartAPIView.as_view(), name='cart_api'),
    path('api/myshop/orders/', MyShopOrdersAPIView.as_view(), name='my_shop_orders'),
]
