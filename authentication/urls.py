from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LoginView, LogoutView, RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='token_obtain_pair'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
