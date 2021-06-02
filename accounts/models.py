from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.functional import cached_property

from phonenumber_field.modelfields import PhoneNumberField

from accounts.managers import CustomUserManager

# Create your models here.


class User(AbstractUser):
    is_nursery = models.BooleanField(default=False)
    email = models.EmailField(unique=True)

    # Optional fields
    full_name = models.CharField(max_length=100, null=True, blank=True)
    username = models.CharField(max_length=100, null=True, blank=True)

    first_name = None
    last_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Address(models.Model):
    user = models.ForeignKey(
        User, related_name="addresses", on_delete=models.CASCADE)
    shipping_address = models.TextField()
    pin_code = models.CharField(max_length=50)
    state = models.ForeignKey("core.State", on_delete=models.CASCADE)
    main_contact = PhoneNumberField()
    alternate_contact = PhoneNumberField(null=True, blank=True)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"
