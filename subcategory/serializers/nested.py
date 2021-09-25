from subcategory.models import SubcategoryModel
from rest_framework import serializers


class SimplifiedSubcategoriesSeriaizer(serializers.ModelSerializer):

    class Meta:
        model = SubcategoryModel
        fields = ('id', 'name', 'category')
