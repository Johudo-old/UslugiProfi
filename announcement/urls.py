from announcement.views import AnnouncementsView
from django.urls import path

urlpatterns = [
    path('', AnnouncementsView.as_view(), name='get_categories'),
    path('../dimension/', AnnouncementsView.as_view(), name='get_categories'),
]
