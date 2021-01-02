from rest_framework import serializers

#local imports
from core.models import Shop, Plant, Cart, Order


# Serializers

class ShopSerializer(serializers.ModelSerializer):
    added_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Shop
        fields = ('id', 'name', 'added_on', 'added_by',)
        read_only_fields = ('id', 'added_on', 'added_by',)



class PlantSerializer(serializers.ModelSerializer):
    added_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Plant
        fields = ('id', 'name', 'price', 'image', 'shop', 'added_on', 'added_by',)
        read_only_fields = ('id', 'added_on', 'added_by',)



class CartSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ('plants', 'added_on', 'total_price',)
        read_only_fields = ('added_on',)



class OrderSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()
    added_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Order
        fields = ('id', 'plants', 'added_on', 'total_price', 'added_by')
        read_only_fields = ('id', 'added_on', 'added_by')
