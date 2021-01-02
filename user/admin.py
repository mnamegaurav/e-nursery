from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

User = get_user_model()
# Register your models here.

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = UserAdmin.list_display + ('is_nursery',)