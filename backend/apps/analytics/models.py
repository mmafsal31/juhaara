from django.db import models


class SalesAnalytics(models.Model):
    date = models.DateField(unique=True)
    total_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    order_count = models.PositiveIntegerField(default=0)
    customer_count = models.PositiveIntegerField(default=0)
    top_product_name = models.CharField(max_length=180, blank=True)

    class Meta:
        ordering = ["-date"]
        verbose_name_plural = "Sales analytics"

    def __str__(self):
        return str(self.date)

