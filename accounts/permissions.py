from rest_framework.permissions import BasePermission


# Custom permission to check if logged in user is nursery
class IsNursery(BasePermission):
    """
    Allows access only to nursery.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_nursery)



class IsOwner(BasePermission):
    """
    Handles object level permissions for objects.
    """

    def has_object_permission(self, request, view, obj):

        # check if user is owner
        if obj.user:
            return bool(request.user == obj.user)
        return False