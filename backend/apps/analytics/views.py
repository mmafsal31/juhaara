from django.contrib.auth.models import User
from django.db.models import Sum
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from apps.orders.models import Order
from apps.products.models import Product
from .models import SalesAnalytics
from .serializers import SalesAnalyticsSerializer


class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        total_sales = Order.objects.aggregate(value=Sum("total"))["value"] or 0
        return Response({
            "total_sales": total_sales,
            "orders": Order.objects.count(),
            "customers": User.objects.filter(is_staff=False).count(),
            "products": Product.objects.count(),
            "low_stock": Product.objects.filter(stock__lte=5).count(),
            "revenue_target_percent": 75,
        })


class SalesAnalyticsView(ListAPIView):
    queryset = SalesAnalytics.objects.all()
    serializer_class = SalesAnalyticsSerializer
    permission_classes = [permissions.IsAdminUser]

