from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model

from core.models import Shop, Cart

User = get_user_model()


@receiver(post_save, sender=User)
def create_initial_things_for_user(sender, instance, created, **kwargs):
    if created:
        if instance.is_nursery:
            Shop.objects.create(name=f"{instance.username}'s shop", added_by=instance)

        """
        Create an empty cart for users and nurseries
        """
        Cart.objects.create(added_by=instance)