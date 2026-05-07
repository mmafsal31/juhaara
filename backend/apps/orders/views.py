from rest_framework import permissions, viewsets
from .models import Address, CartItem, Coupon, Order, Payment
from .serializers import AddressSerializer, CartItemSerializer, CouponSerializer, OrderSerializer, PaymentSerializer


class OwnerWritePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        return request.user.is_staff or view.basename in {"cart", "orders", "addresses"}


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)


class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [OwnerWritePermission]


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.select_related("product", "variant").filter(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ["status", "payment_method"]
    ordering_fields = ["created_at", "total"]

    def get_queryset(self):
        qs = Order.objects.select_related("user", "address", "coupon").prefetch_related("items")
        if self.request.user.is_staff:
            return qs
        return qs.filter(user=self.request.user)


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Payment.objects.select_related("order")
        if self.request.user.is_staff:
            return qs
        return qs.filter(order__user=self.request.user)

