    # # apps/accounts/selectors.py
    # from typing import Optional
    # from .models import User, Role, Permission, Module

    # # ==== USERS ====
    # def get_users():
    #     return User.objects.prefetch_related("roles__permissions").all()

    # def get_user_by_id(*, id: int) -> Optional[User]:
    #     return User.objects.filter(id=id).first()

    # def get_user_by_username(*, username: str) -> Optional[User]:
    #     return User.objects.filter(id=id).first()





    # def get_user_modules(user):
    #     if not user or not user.is_authenticated:
    #         print("user belum login atau AnonymousUser")
    #         return []
        
    #     # Ambil modul yang terkait dengan semua role user
    #     modules = user.get_accessible_modules().prefetch_related("roles")
    #     print("Modules untuk", user.username, ":", modules)
    #     return modules

    # def get_roles_for_module(user: User, module_id: int):
    #     """Ambil role user di modul tertentu"""
    #     return (
    #         Role.objects.filter(users=user, modules__id=module_id)
    #         .distinct()
    #         .order_by("name")
    #     )



    # # ==== ROLE & PERMISSION ====
    # def get_modules():
    #     return Module.objects.all().order_by("name")

    # def get_roles():
    #     return Role.objects.all().order_by("name")

    # def get_permissions():
    #     return Permission.objects.all().order_by("code")

    # def get_role_by_id(*, id: int):
    #     return Role.objects.filter(pk=id).first()

    # def get_permission_by_id(*, id: int):
    #     return Permission.objects.filter(pk=id).first()

    # def get_module_by_id(*, id: int):
    #     return Module.objects.filter(pk=id).first()