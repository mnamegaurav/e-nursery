from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
    )
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    RetrieveUpdateAPIView, 
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    )

from accounts.permissions import IsNursery, IsOwner
from core.models import Shop, Plant, Cart, Order
from core.serializers import (
    ShopSerializer,
    PlantSerializer,
    CartSerializer,
    OrderSerializer,
    )
# Create your views here.


class CartRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """
    /api/me/cart [GET, PUT]
    """
    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated, IsOwner,)

    def get_object(self):
        return self.request.user.cart



class OrdersListAPIView(ListAPIView):
    """
    /api/me/orders [GET]
    """
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return self.request.user.orders.all()



class OrderCreateAPIView(CreateAPIView):
    """
    /api/me/order/create [POST]
    """
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)



# class OrderDetailCancelAPIView(RetrieveUpdateAPIView):
#     """
#     /api/me/order/<id> [GET,POST,]
#     """
#     serializer_class = OrderSerializer
#     permission_classes = (IsAuthenticated, IsOwner, )

#     def get_queryset(self):
#         return self.request.user.orders.all()



class NurseryOrdersAPIView(ListAPIView):
    """
    /api/nursery/orders [GET]
    """
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, IsNursery,)

    def get_queryset(self):
        return Order.objects.filter(plants__user=self.request.user).distinct()



class ShopsListAPIView(ListAPIView):
    """
    /api/shops [GET]
    """
    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Shop.objects.all()



class ShopsCreateAPIView(CreateAPIView):
    """
    /api/shop/create [POST]
    """
    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticated, IsNursery)



class ShopRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    /api/shop [GET, PUT, DELETE]
    """
    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticated, IsOwner, IsNursery)
    queryset = Shop.objects.all()



class PlantsListAPIView(ListAPIView):
    """
    /api/plants [GET]
    """
    serializer_class = PlantSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Plant.objects.all()



class PlantsCreateAPIView(CreateAPIView):
    """
    /api/plant/create [POST]
    """
    serializer_class = PlantSerializer
    permission_classes = (IsAuthenticated, IsNursery)



class PlantRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    /api/plant [GET, PUT, DELETE]
    """
    serializer_class = PlantSerializer
    permission_classes = (IsAuthenticated, IsOwner, IsNursery)
    queryset = Plant.objects.all()