from django.db import models
from django.contrib.auth import get_user_model

from crum import get_current_user

from core.utils import total_price_calculator


User = get_user_model()
# Create your models here.

class Shop(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    added_on = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        current_user = get_current_user()
        if current_user and current_user.pk:
            self.added_by = current_user
        super(Shop, self).save(*args, **kwargs)



class Plant(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    price = models.PositiveSmallIntegerField()
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        current_user = get_current_user()
        if current_user and current_user.pk:
            self.added_by = current_user
        super(Plant, self).save(*args, **kwargs)



class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    plants = models.ManyToManyField(Plant, blank=True)
    added_on = models.DateTimeField(auto_now_add=True)
    added_by = models.OneToOneField(User, on_delete=models.CASCADE, editable=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        current_user = get_current_user()
        if current_user and current_user.pk:
            self.added_by = current_user
        super(Cart, self).save(*args, **kwargs)

    @property
    def total_price(self):
        calculated_total_price = total_price_calculator(self)
        return calculated_total_price
    
    @property
    def all_plants(self):
        return str(";".join([plant.name for plant in self.plants.all()]))



class Order(models.Model):
    id = models.AutoField(primary_key=True)
    plants = models.ManyToManyField(Plant)
    added_on = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)

    def __str__(self):
        return str(self.total_price)

    def save(self, *args, **kwargs):
        current_user = get_current_user()
        if current_user and current_user.pk:
            self.added_by = current_user
        super(Order, self).save(*args, **kwargs)

    @property
    def total_price(self):
        calculated_total_price = total_price_calculator(self)
        return calculated_total_price

    @property
    def all_plants(self):
        return str(";".join([plant.name for plant in self.plants.all()]))
    