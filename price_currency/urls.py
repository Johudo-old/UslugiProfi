from price_currency.views import PriceCurrencyView
from django.urls import path

urlpatterns = [
    path('', PriceCurrencyView.as_view(), name='price_currency'),
]
