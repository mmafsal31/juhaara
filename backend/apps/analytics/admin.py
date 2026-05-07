from django.contrib import admin
from .models import SalesAnalytics


@admin.register(SalesAnalytics)
class SalesAnalyticsAdmin(admin.ModelAdmin):
    list_display = ("date", "total_sales", "order_count", "customer_count", "top_product_name")
    date_hierarchy = "date"

