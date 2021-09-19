from django.urls import path
from .views import CurrentUserView

urlpatterns = [
    path('', CurrentUserView.as_view(), name='get_current_user_info'),
]
