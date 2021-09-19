from user.serializers import CurrentUserSeriaizer
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = CurrentUserSeriaizer(request.user)
        return Response(status=HTTP_200_OK, data=serializer.data)
