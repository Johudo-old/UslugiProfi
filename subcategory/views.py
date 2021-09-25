from subcategory.serializers.common import SubcategoriesSeriaizer, SubcategoriesWithCategorySeriaizer
from subcategory.models import SubcategoryModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.permissions import AllowAny


class SubcategoriesView(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        subcategories = SubcategoryModel.objects.all()

        if ('with_category' in request.query_params) and (request.query_params['with_category'] == 'true'):
            serializer = SubcategoriesWithCategorySeriaizer(subcategories, many=True)
        else:
            serializer = SubcategoriesSeriaizer(subcategories, many=True)

        return Response(status=HTTP_200_OK, data=serializer.data)
