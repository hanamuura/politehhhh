from django.db import models


# Create your models here.
class Image(models.Model):
    path = models.CharField(max_length=255)


class Meta(models.Model):
    h1 = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField()
