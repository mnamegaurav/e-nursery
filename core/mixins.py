from rest_framework.permissions import IsAuthenticated
from user.permissions import IsNursery, IsOwner



class NurseryPermissionMixin:
    """
    Onky Nurseries can create, update and delete own shops and plants.
    """
    def get_permissions(self):
        permission_classes = []
        nursery_actions = ['create', 'destroy', 'update', 'partial_update',]
        user_actions = ['list', 'retrieve',]
        if self.action in nursery_actions:
            permission_classes = [IsNursery, IsOwner]
        elif self.action in user_actions:
            permission_classes = [IsAuthenticated,]
        return [permission() for permission in permission_classes]


