from category.serializers.common import CategoriesSeriaizer, CategoriesWithSubcategoriesSeriaizer
from category.models import CategoryModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.permissions import AllowAny


class CategoriesView(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        categories = CategoryModel.objects.all()

        if ('with_subcategories' in request.query_params) and (request.query_params['with_subcategories'] == 'true'):
            serializer = CategoriesWithSubcategoriesSeriaizer(categories, many=True)
        else:
            serializer = CategoriesSeriaizer(categories, many=True)

        return Response(status=HTTP_200_OK, data=serializer.data)
