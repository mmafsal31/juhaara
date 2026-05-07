from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductVariant, Review, Wishlist


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text", "sort_order"]


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ["id", "name", "value", "stock", "price_delta"]


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.get_full_name", read_only=True)

    class Meta:
        model = Review
        fields = ["id", "product", "user", "user_name", "rating", "title", "comment", "is_approved", "created_at"]
        read_only_fields = ["user", "is_approved"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False,
        allow_empty=True,
    )

    class Meta:
        model = Product
        fields = "__all__"

    def _uploaded_images(self, validated_data):
        images = validated_data.pop("uploaded_images", [])
        request = self.context.get("request")
        if request:
            images = request.FILES.getlist("uploaded_images") or images
        return images

    def create(self, validated_data):
        images = self._uploaded_images(validated_data)
        product = super().create(validated_data)
        for index, image in enumerate(images):
            ProductImage.objects.create(product=product, image=image, sort_order=index)
        return product

    def update(self, instance, validated_data):
        images = self._uploaded_images(validated_data)
        product = super().update(instance, validated_data)
        start_order = product.images.count()
        for index, image in enumerate(images):
            ProductImage.objects.create(product=product, image=image, sort_order=start_order + index)
        return product


class WishlistSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source="product", read_only=True)

    class Meta:
        model = Wishlist
        fields = ["id", "product", "product_detail", "created_at"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
