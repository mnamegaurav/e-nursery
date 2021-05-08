from rest_framework import serializers

#local imports
from core.models import Shop, Plant, Cart, Order


# Serializers

class ShopSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Shop
        fields = ('id', 'name', 'added_on', 'user',)
        read_only_fields = ('id', 'added_on', 'user',)



class PlantSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Plant
        fields = ('id', 'name', 'price', 'image', 'shop', 'added_on', 'user')
        read_only_fields = ('id', 'added_on', 'user')



class CartSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()
    all_plants = PlantSerializer(source='plants_set',read_only=True)

    class Meta:
        model = Cart
        fields = ('plants', 'added_on', 'total_price', 'all_plants')
        read_only_fields = ('added_on', 'all_plants')



class OrderSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()
    all_plants = PlantSerializer(source='plants_set',read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Order
        fields = ('id', 'plants', 'added_on', 'total_price', 'user', 'all_plants' , 'is_active')
        read_only_fields = ('id', 'added_on', 'user', 'all_plants')

    # overrride the update method to change the active status of order
    def update(self, instance, validated_data):
        validated_data = {'is_active': validated_data.pop('is_active')}
        return super().update(instance, validated_data)