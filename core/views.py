from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.generics import (
    RetrieveUpdateAPIView, 
    ListAPIView,
    )
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAdminUser, 
    IsAuthenticated
    )

from user.permissions import IsNursery, IsOwner
from core.mixins import NurseryPermissionMixin
from core.models import Shop, Plant, Cart, Order
from core.serializers import (
    ShopSerializer,
    PlantSerializer,
    CartSerializer,
    OrderSerializer,
    )
# Create your views here.

class ShopViewSet(NurseryPermissionMixin, viewsets.ModelViewSet):
    serializer_class = ShopSerializer
    queryset = Shop.objects.all()
    """
    do not need to add permission_classes, 
    because NurseryPermissionMixin has already handling it.
    """



class PlantViewSet(NurseryPermissionMixin, viewsets.ModelViewSet):
    serializer_class = PlantSerializer
    queryset = Plant.objects.all()
    """
    do not need to add permission_classes, 
    because NurseryPermissionMixin has already handling it.
    """



class MyShopViewSet(NurseryPermissionMixin, viewsets.ModelViewSet):
    serializer_class = ShopSerializer
    queryset = Shop.objects.all()
    """
    do not need to add permission_classes, 
    because NurseryPermissionMixin has already handling it.
    """

    def get_queryset(self):
        return Shop.objects.filter(added_by=self.request.user)



class CartAPIView(RetrieveUpdateAPIView):
    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.cart



class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Order.objects.filter(added_by=self.request.user)



class MyShopOrdersAPIView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, IsNursery,)

    def get_queryset(self):
        return Order.objects.filter(plants__added_by=self.request.user).distinct()