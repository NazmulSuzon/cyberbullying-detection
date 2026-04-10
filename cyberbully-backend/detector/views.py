from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .ml_service import predict
from .models import Post

class DetectView(APIView):
    def post(self, request):
        text = request.data.get("text", "").strip()
        if not text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

        result = predict(text)

        Post.objects.create(
            content=text,
            label=result["label"],
            confidence=result["confidence"]
        )

        return Response({
            "text": text,
            "label": result["label"],
            "confidence": result["confidence"]
        }, status=status.HTTP_200_OK)