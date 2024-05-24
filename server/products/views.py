from django.db.models import QuerySet
from django.http import JsonResponse, HttpRequest
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from products.models import Product
from products.repository import ProductRepository, CategoriesRepository
from products.serializer import ProductSerializer, CategoriesSerializer


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = ProductRepository().get_all_products()

    @action(detail=False, methods=['get'])
    def get_all(self, request: HttpRequest):
        products: QuerySet[Product] = self.get_queryset()
        serialized_products: ProductSerializer = self.get_serializer(products, many=True)
        return Response(serialized_products.data)

    @action(detail=True, methods=['get'])
    def get_single(self, request: HttpRequest, pk: int, *args, **kwargs):
        product: QuerySet[Product] = self.get_object()
        serialized_product: ProductSerializer = self.get_serializer(product)
        return Response(serialized_product.data)


class CategoriesViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriesSerializer
    queryset = CategoriesRepository

    @action(detail=False, methods=['get'])
    def get_all_categories(self, request: HttpRequest):
        categories: QuerySet[Product] = self.get_queryset()
        serialized_categories: CategoriesSerializer = self.get_serializer(categories, many=True)
        return Response(serialized_categories.data)

