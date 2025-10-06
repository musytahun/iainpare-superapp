from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


# =====================================================
# 🧱 Role & Permission
# =====================================================

class Permission(models.Model):
    code = models.CharField(max_length=100, unique=True)  # ex: "user.view", "user.create"
    name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.code}"


class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)  # ex: "admin", "staff", "user"
    permissions = models.ManyToManyField(Permission, related_name="roles", blank=True)

    def __str__(self):
        return self.name


# =====================================================
# 👤 User
# =====================================================

class UserManager(BaseUserManager):
    """
    Custom manager untuk User.
    """

    def create_user(self, username: str, password: str = None, **extra_fields):
        if not username:
            raise ValueError("Username harus diisi")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)  # hash password
        user.save(using=self._db)
        return user

    def create_superuser(self, username: str, password: str = None, **extra_fields):
        """
        Membuat superuser dengan akses penuh.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        user = self.create_user(username, password, **extra_fields)
        admin_role, _ = Role.objects.get_or_create(name="admin")
        user.role = admin_role
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """
    Model utama User untuk sistem auth.
    Bisa login pakai `username`.
    """

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, related_name="users")

    # Django auth fields
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []  # kosongkan agar hanya username wajib

    def __str__(self):
        return f"{self.username} ({self.role.name if self.role else 'no role'})"

    # 🧠 Fungsi bantu untuk mengecek izin
    def has_permission(self, code: str) -> bool:
        if self.is_superuser:
            return True
        if not self.role:
            return False
        return self.role.permissions.filter(code=code).exists()
