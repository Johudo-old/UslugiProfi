from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from django_resized import ResizedImageField


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class UserModel(AbstractUser):

    USER_TYPE = (
        ('IP', 'ИП'),
        ('OOO', 'ООО'),
        ('PF', 'Физ. лицо'),
    )

    username = None

    id = models.AutoField(primary_key=True)
    email = models.EmailField(verbose_name='Email', max_length=256, unique=True)
    type = models.CharField(verbose_name='Тип пользователя', max_length=3, choices=USER_TYPE, default='PF')
    name = models.CharField(verbose_name='Имя', max_length=64, blank=True)
    surname = models.CharField(verbose_name='Фамилия', max_length=64,  blank=True)
    company = models.CharField(verbose_name='Название компании', max_length=64, blank=True)
    ogrn = models.CharField(verbose_name='ОГРН', max_length=64, blank=True)
    inn = models.CharField(verbose_name='ИНН', max_length=64, blank=True)
    address = models.CharField(verbose_name='Адресс', max_length=240, blank=True)
    country = models.CharField(verbose_name='Страна', max_length=32, blank=True)
    create_date = models.DateField(verbose_name='Дата создания', auto_now_add=True)
    phone = PhoneNumberField(verbose_name='Телефон', blank=True)
    is_email_confirmed = models.BooleanField(default=False)
    avatar = ResizedImageField(verbose_name='Аватар', size=[300, 300],
                               crop=['middle', 'center'], upload_to='users_avatar', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        db_table = 'user'
        ordering = ['id', 'email', 'password', 'name', 'surname', 'type', 'phone', 'company', 'country', 'address']
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return str(self.email)
