from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


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
        return self.create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Model utama User untuk sistem auth.
    Bisa login pakai `username`.
    """

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)

    # Django auth fields
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []  # kosongkan agar hanya username wajib

    def __str__(self):
        return self.username
