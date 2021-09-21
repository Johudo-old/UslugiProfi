from django.db import models


class CategoryModel(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(verbose_name='Название', max_length=64, unique=True)
    is_active = models.BooleanField(verbose_name='Активна', default=True)
    create_date = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)

    class Meta:
        db_table = 'category'
        ordering = ['name', 'is_active',  'create_date']
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name
