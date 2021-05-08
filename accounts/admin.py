from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

User = get_user_model()
# Register your models here.

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'full_name', 'is_nursery',)
    list_display_links = ('email', 'username')
    fields = ('email', 'username', 'full_name', 'is_nursery', 'is_active', 'is_staff', 'user_permissions')
    fieldsets = None