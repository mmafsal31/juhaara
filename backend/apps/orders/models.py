from django.conf import settings
from django.db import models
from apps.products.models import Product, ProductVariant


class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="addresses")
    full_name = models.CharField(max_length=140)
    phone = models.CharField(max_length=30)
    line1 = models.CharField(max_length=220)
    line2 = models.CharField(max_length=220, blank=True)
    city = models.CharField(max_length=90)
    state = models.CharField(max_length=90)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=80, default="India")
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.full_name}, {self.city}"


class Coupon(models.Model):
    code = models.CharField(max_length=40, unique=True)
    discount_percent = models.PositiveIntegerField(default=0)
    discount_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    minimum_order_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    active = models.BooleanField(default=True)
    expires_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.code


class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart_items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "product", "variant")


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        PROCESSING = "processing", "Processing"
        SHIPPED = "shipped", "Shipped"
        DELIVERED = "delivered", "Delivered"
        CANCELLED = "cancelled", "Cancelled"

    class PaymentMethod(models.TextChoices):
        COD = "cod", "Cash on Delivery"
        RAZORPAY = "razorpay", "Razorpay"
        STRIPE = "stripe", "Stripe"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="orders")
    address = models.ForeignKey(Address, on_delete=models.PROTECT)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices, default=PaymentMethod.RAZORPAY)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tracking_number = models.CharField(max_length=80, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"ORD{self.id:05d}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, blank=True, null=True)
    product_name = models.CharField(max_length=180)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)


class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")
    provider = models.CharField(max_length=40)
    provider_payment_id = models.CharField(max_length=120, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    success = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

