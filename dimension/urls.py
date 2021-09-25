from dimension.views import DimensionsView
from django.urls import path

urlpatterns = [
    path('', DimensionsView.as_view(), name='dimensions'),
]
