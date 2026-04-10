from django.db import models

class Post(models.Model):
    content = models.TextField()
    label = models.CharField(max_length=50)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.label} ({self.confidence}%) - {self.content[:50]}"