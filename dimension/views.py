from dimension.models import DimensionModel
from dimension.serializers import DimensionsSeriaizer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.permissions import AllowAny


class DimensionsView(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        dimensions = DimensionModel.objects.all()
        serializer = DimensionsSeriaizer(dimensions, many=True)
        return Response(status=HTTP_200_OK, data=serializer.data)
