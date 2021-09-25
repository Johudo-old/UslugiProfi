from category.models import CategoryModel
from django.db import models


class SubcategoryModel(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(verbose_name='Название', max_length=64, unique=True)
    is_active = models.BooleanField(verbose_name='Активна', default=True)
    create_date = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)

    category = models.ForeignKey(CategoryModel, verbose_name='Категория',
                                 on_delete=models.CASCADE, related_name='subcategories')

    class Meta:
        db_table = 'subcategory'
        ordering = ['name', 'category', 'is_active',  'create_date']
        verbose_name = 'Подкатегория'
        verbose_name_plural = 'Подкатегории'

    def __str__(self):
        return self.name
