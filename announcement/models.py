from announcement.enums import PriceTypeEnum
from dimension.models import DimensionModel
from price_currency.models import PriceCurrencyModel
from announcement.utils import path_and_rename_announcement_image
from user.models import UserModel
from subcategory.models import SubcategoryModel
from django.db import models
from django_resized import ResizedImageField


class AnnouncementModel(models.Model):

    PRICE_TYPE = (
        (PriceTypeEnum.FIXED.name, 'Фиксированная цена'),
        (PriceTypeEnum.NEGOTIATED.name, 'Договорная цена'),
        (PriceTypeEnum.RANGE.name, 'Диапозон цен'),
    )

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64, verbose_name='Имя')
    description = models.TextField(verbose_name='Описание', blank=True)
    is_active = models.BooleanField(verbose_name='Активна', default=True)
    create_date = models.DateField(verbose_name='Дата создания', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)
    image = ResizedImageField(verbose_name='Фото', size=[500, 500], quality=100,
                              crop=['middle', 'center'], upload_to=path_and_rename_announcement_image)

    price_type = models.CharField(verbose_name='Тип цены', max_length=12, choices=PRICE_TYPE)
    fixed_price = models.DecimalField(verbose_name='Фиксированная цена', max_digits=12,
                                      decimal_places=2, null=True, blank=True)
    upper_price = models.DecimalField(verbose_name='Верхний диапазон цены',
                                      max_digits=12, decimal_places=2, null=True,  blank=True)
    lower_price = models.DecimalField(verbose_name='Нижний диапазон цены',
                                      max_digits=12, decimal_places=2, null=True, blank=True)

    address = models.CharField(max_length=240, verbose_name='Адрес', blank=True)
    address_lat = models.DecimalField(verbose_name='Широта', max_digits=13, decimal_places=10, null=True, blank=True)
    address_lng = models.DecimalField(verbose_name='Долгота', max_digits=13, decimal_places=10, null=True, blank=True)

    user = models.ForeignKey(UserModel, verbose_name='Автор', on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubcategoryModel, verbose_name='Подкатегория', on_delete=models.CASCADE)
    currency = models.ForeignKey(PriceCurrencyModel, verbose_name='Валюта',
                                 on_delete=models.CASCADE, null=True, blank=True)
    dimension = models.ForeignKey(DimensionModel, verbose_name='Размерность',
                                  on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'announcement'
        ordering = ['id', 'name', 'description', 'subcategory', 'user', 'address', 'address_lat', 'address_lng', 'create_date',
                    'update_time', 'price_type', 'fixed_price', 'upper_price', 'lower_price', 'currency', 'dimension', 'image', 'is_active']
        verbose_name = 'Объявление'
        verbose_name_plural = 'Объявления'

    def __str__(self):
        return self.name
