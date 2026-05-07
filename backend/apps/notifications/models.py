from django.conf import settings
from django.db import models


class Notification(models.Model):
    class Type(models.TextChoices):
        ORDER = "order", "Order"
        PAYMENT = "payment", "Payment"
        STOCK = "stock", "Stock"
        CUSTOMER = "customer", "Customer"
        DELIVERY = "delivery", "Delivery"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications", blank=True, null=True)
    type = models.CharField(max_length=30, choices=Type.choices)
    title = models.CharField(max_length=140)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

