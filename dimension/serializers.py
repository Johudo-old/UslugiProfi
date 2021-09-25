from dimension.models import DimensionModel
from rest_framework import serializers


class DimensionsSeriaizer(serializers.ModelSerializer):

    class Meta:
        model = DimensionModel
        fields = ('id', 'name', 'short_name')
