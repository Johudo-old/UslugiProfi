from user.serializers import CurrentUserSeriaizer, UpdateCurrentUserSeriaizer
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Return current user data.
        """
        serializer = CurrentUserSeriaizer(request.user, context={"request": request})
        return Response(status=HTTP_200_OK, data=serializer.data)

    def patch(self, request):
        """
        Updates current user data.
        """
        serializer = UpdateCurrentUserSeriaizer(request.user, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response(status=HTTP_400_BAD_REQUEST, data=serializer.errors)

        serializer.save()

        return Response(status=HTTP_200_OK, data=serializer.data)
