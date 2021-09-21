from announcement.models import AnnouncementModel
from announcement.serializers import GetAnnouncementsSeriaizer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK


class AnnouncementsView(APIView):

    def get(self, request):
        if ('user' in request.query_params):
            user_id_query = request.query_params['user']
            announcements = AnnouncementModel.objects.filter(user__id=int(user_id_query))
        else:
            announcements = AnnouncementModel.objects.all()

        serializer = GetAnnouncementsSeriaizer(announcements, context={'request': request}, many=True)
        return Response(status=HTTP_200_OK, data=serializer.data)
