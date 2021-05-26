from django.db import models
from django.contrib.auth import get_user_model
from django.utils.functional import cached_property

import uuid

from core.utils import total_price_calculator

User = get_user_model()
# Create your models here.


class Shop(models.Model):
    name = models.CharField(max_length=50)
    added_on = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Plant(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='plants', null=True, blank=True)
    price = models.PositiveSmallIntegerField()
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Cart(models.Model):
    plants = models.ManyToManyField(
        Plant, related_name='cart_plants', blank=True)
    added_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(
        User, related_name='cart', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email

    @cached_property
    def total_price(self):
        calculated_total_price = total_price_calculator(self)
        return calculated_total_price

    @cached_property
    def all_plants(self):
        return self.plants.all()


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    plants = models.ManyToManyField(
        Plant, related_name='order_plants', blank=True)
    added_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey(
        User, related_name='orders', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email

    @cached_property
    def total_price(self):
        calculated_total_price = total_price_calculator(self)
        return calculated_total_price

    @cached_property
    def all_plants(self):
        return self.plants.all()
