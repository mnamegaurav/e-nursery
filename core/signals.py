from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model

from core.models import Cart

User = get_user_model()


@receiver(post_save, sender=User)
def create_initial_things_for_user(sender, instance, created, **kwargs):
    if created:
        """
        Create an empty cart for users and nurseries
        """
        Cart.objects.create(user=instance)
