from django.db import models
from django_resized import ResizedImageField


class PriceCurrencyModel(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(verbose_name='Название', max_length=64, unique=True)
    short_name = models.CharField(verbose_name='Короткое название', max_length=8, unique=True)

    class Meta:
        db_table = 'price_currency'
        ordering = ['name', 'short_name']
        verbose_name = 'Валюта'
        verbose_name_plural = 'Валюты'

    def __str__(self):
        return self.name
