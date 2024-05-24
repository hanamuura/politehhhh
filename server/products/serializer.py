from rest_framework import serializers

from products.models import Product, Categories


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['name']


class ProductSerializer(serializers.ModelSerializer):
    categories = CategoriesSerializer(many=True, read_only=True, allow_null=True)

    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'availability', 'categories']
