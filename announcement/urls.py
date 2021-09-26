from announcement.views import AnnouncementByIdView, AnnouncementsView
from django.urls import path

urlpatterns = [
    path("", AnnouncementsView.as_view(), name="all_categories"),
    path("<int:id>/", AnnouncementByIdView.as_view(), name="category_by_id"),
]
