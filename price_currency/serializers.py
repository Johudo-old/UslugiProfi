from rest_framework import serializers
from price_currency.models import PriceCurrencyModel


class PriceCurrenciesSeriaizer(serializers.ModelSerializer):

    class Meta:
        model = PriceCurrencyModel
        fields = ('id', 'name', 'short_name')
