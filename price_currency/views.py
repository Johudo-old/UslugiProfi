from price_currency.serializers import PriceCurrenciesSeriaizer
from price_currency.models import PriceCurrencyModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK


class PriceCurrencyView(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        price_currencies = PriceCurrencyModel.objects.all()
        serializer = PriceCurrenciesSeriaizer(price_currencies, many=True)
        return Response(status=HTTP_200_OK, data=serializer.data)
