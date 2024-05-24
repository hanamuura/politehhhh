from django.db import models

# Create your models here.
class OrderStatus(models.Model):
    status_name = models.CharField(max_length=255)

    class Meta: 
        db_table = 'order_status'


class Order(models.Model):
    order_date = models.DateTimeField()

    user = models.ManyToManyField('authentification.CustomUser', related_name='user')
    status = models.OneToOneField(OrderStatus, null=True, related_name='order_status', on_delete=models.SET_NULL)

    class Meta: 
        db_table = 'order'
