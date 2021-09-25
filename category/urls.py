from category.views import CategoriesView
from django.urls import path

urlpatterns = [
    path('', CategoriesView.as_view(), name='dimensions'),
]
