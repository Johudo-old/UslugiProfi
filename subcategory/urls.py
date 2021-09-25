from subcategory.views import SubcategoriesView
from django.urls import path

urlpatterns = [
    path('', SubcategoriesView.as_view(), name='dimensions'),
]
