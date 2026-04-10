from django.urls import path
from .views import DetectView

urlpatterns = [
    path("api/detect/", DetectView.as_view()),
]