from announcement.enums import PriceTypeEnum
from UslugiProfi.permissions import IsGetOrIsAuthenticated
from announcement.models import AnnouncementModel
from announcement.serializers import CreateAnnouncementsSeriaizer, GetAnnouncementsSeriaizer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST


class AnnouncementsView(APIView):
    permission_classes = (IsGetOrIsAuthenticated,)

    def get(self, request):
        if ('user' in request.query_params):
            user_id_query = request.query_params['user']
            announcements = AnnouncementModel.objects.filter(user__id=int(user_id_query))
        else:
            announcements = AnnouncementModel.objects.all()

        serializer = GetAnnouncementsSeriaizer(announcements, context={'request': request}, many=True)
        return Response(status=HTTP_200_OK, data=serializer.data)

    def post(self, request):
        request.data['user'] = request.user.id

        if (request.data['price_type'] != PriceTypeEnum.NEGOTIATED.name and not ('dimension' in request.data)):
            return Response(status=HTTP_400_BAD_REQUEST, data={'dimension': 'Поле не заполнено'})

        if (request.data['price_type'] != PriceTypeEnum.NEGOTIATED.name and not ('currency' in request.data)):
            return Response(status=HTTP_400_BAD_REQUEST, data={'currency': 'Поле не заполнено'})

        if (request.data['price_type'] == PriceTypeEnum.FIXED.name and not ('fixed_price' in request.data)):
            return Response(status=HTTP_400_BAD_REQUEST, data={'fixed_price': 'Поле не заполнено'})

        if (request.data['price_type'] == PriceTypeEnum.RANGE.name and not ('upper_price' in request.data)):
            return Response(status=HTTP_400_BAD_REQUEST, data={'upper_price': 'Поле не заполнено'})

        if (request.data['price_type'] == PriceTypeEnum.RANGE.name and not ('lower_price' in request.data)):
            return Response(status=HTTP_400_BAD_REQUEST, data={'lower_price': 'Поле не заполнено'})

        if (request.data['price_type'] == PriceTypeEnum.RANGE.name and int(request.data['lower_price']) >= int(request.data['upper_price'])):
            return Response(status=HTTP_400_BAD_REQUEST, data={'upper_price': 'Поле должно быть больше lower_price'})

        serializer = CreateAnnouncementsSeriaizer(data=request.data, context={'request': request})

        if (not (serializer.is_valid())):
            return Response(status=HTTP_400_BAD_REQUEST, data=serializer.errors)

        serializer.save()
        return Response(status=HTTP_201_CREATED, data=serializer.data)
