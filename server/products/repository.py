from django.db.models import QuerySet

from products.models import Product, Categories


class ProductRepository:
    model = Product

    def get_all_products(self) -> QuerySet[Product]:
        return self.model.objects.all()

    def get_single_product(self, product_id: int) -> QuerySet[Product]:
        return self.model.objects.filter(id=product_id).first()


class CategoriesRepository:
    model = Categories

    def get_all_categories(self) -> QuerySet[Categories]:
        return self.model.objects.all()
