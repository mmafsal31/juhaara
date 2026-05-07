from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from django.contrib.auth.models import Group, User

for model in (User, Group):
    try:
        admin.site.unregister(model)
    except admin.sites.NotRegistered:
        pass

@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    pass

admin.site.register(Group)
