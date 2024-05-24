from django.db import models


# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.JSONField(default=dict)
    price = models.DecimalField(max_digits=12, decimal_places=4)
    availability = models.IntegerField(null=True)

    categories = models.ManyToManyField('products.Categories', related_name='products_categories')

    class Meta:
        db_table = 'product'
        ordering = ['name', 'availability']


class Categories(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'categories'


