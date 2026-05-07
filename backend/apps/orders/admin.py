from django.contrib import admin
from .models import Address, CartItem, Coupon, Order, OrderItem, Payment


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "status", "payment_method", "total", "created_at")
    list_filter = ("status", "payment_method", "created_at")
    search_fields = ("user__username", "tracking_number")
    inlines = [OrderItemInline]


admin.site.register(Address)
admin.site.register(CartItem)
admin.site.register(Coupon)
admin.site.register(Payment)

