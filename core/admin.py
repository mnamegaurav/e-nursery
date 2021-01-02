from django.contrib import admin

from core.models import Shop, Plant, Cart, Order
# Register your models here.

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'added_on', 'added_by')


@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'image', 'price', 'shop', 'added_on')


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_plants', 'added_on', 'total_price',)

    def get_plants(self, obj):
        return obj.all_plants
    get_plants.short_description = 'Plants'


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_plants', 'added_on', 'total_price', 'added_by')
    
    def get_plants(self, obj):
        return obj.all_plants
    get_plants.short_description = 'Plants'