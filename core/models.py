from django.db import models
from django.contrib.auth import get_user_model
from django.utils.functional import cached_property

from django_fsm import FSMIntegerField, transition
import uuid

from core.utils import total_ammount_calculator

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
    def total_ammount(self):
        calculated_total_ammount = total_ammount_calculator(self.plants.all())
        return calculated_total_ammount

    @cached_property
    def all_plants(self):
        return self.plants.all()


class Order(models.Model):

    STATUS_CREATED = 0
    STATUS_PAID = 1
    STATUS_FULFILLED = 2
    STATUS_CANCELLED = 3
    STATUS_RETURNED = 4

    STATUS_CHOICES = (
        (STATUS_CREATED, 'created'),
        (STATUS_PAID, 'paid'),
        (STATUS_FULFILLED, 'fulfilled'),
        (STATUS_CANCELLED, 'cancelled'),
        (STATUS_RETURNED, 'returned'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    plants = models.ManyToManyField(
        Plant, related_name='order_plants', blank=True)
    total_ammount = models.PositiveSmallIntegerField(editable=False)
    added_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey(
        User, related_name='orders', on_delete=models.CASCADE)
    status = FSMIntegerField(choices=STATUS_CHOICES,
                             default=STATUS_CREATED, protected=True, editable=False)

    def __str__(self):
        return self.user.email

    @cached_property
    def all_plants(self):
        return self.plants.all()

    @transition(field=status, source=STATUS_CREATED, target=STATUS_PAID)
    def pay(self, amount):
        self.amount = amount
        pass

    @transition(field=status, source=STATUS_PAID, target=STATUS_FULFILLED)
    def fulfill_order(self):
        pass

    @transition(field=status, source=[STATUS_CREATED, STATUS_PAID], target=STATUS_CANCELLED)
    def cancel_order(self):
        pass

    @transition(field=status, source=STATUS_FULFILLED, target=STATUS_RETURNED)
    def return_order(self):
        pass
