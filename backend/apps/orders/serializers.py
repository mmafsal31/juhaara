from rest_framework import serializers
from .models import Address, CartItem, Coupon, Order, OrderItem, Payment


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"
        read_only_fields = ["user"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "product", "product_name", "product_price", "variant", "quantity", "created_at"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"
        read_only_fields = ["order", "product_name", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["user", "subtotal", "shipping", "tax", "discount", "total"]

    def create(self, validated_data):
        request = self.context["request"]
        cart_items = CartItem.objects.select_related("product", "variant").filter(user=request.user)
        subtotal = sum(item.product.price * item.quantity for item in cart_items)
        shipping = 0 if subtotal >= 999 else 99
        tax = subtotal * 0.03
        discount = 0
        total = subtotal + shipping + tax - discount
        order = Order.objects.create(user=request.user, subtotal=subtotal, shipping=shipping, tax=tax, discount=discount, total=total, **validated_data)
        for item in cart_items:
            OrderItem.objects.create(order=order, product=item.product, variant=item.variant, product_name=item.product.name, quantity=item.quantity, price=item.product.price)
        cart_items.delete()
        return order


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

