from rest_framework import permissions, viewsets
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from .models import Category, Product, Review, Wishlist
from .serializers import CategorySerializer, ProductSerializer, ReviewSerializer, WishlistSerializer


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [IsOwnerOrReadOnly]
    search_fields = ["name"]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category").prefetch_related("images", "variants", "reviews").filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [IsOwnerOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filterset_fields = ["category", "is_featured"]
    search_fields = ["name", "description", "category__name"]
    ordering_fields = ["price", "rating", "created_at"]


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["product", "rating"]

    def get_queryset(self):
        return Review.objects.select_related("user", "product").filter(is_approved=True)


class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.select_related("product", "product__category").filter(user=self.request.user)
