from rest_framework import serializers
from .models import SalesAnalytics


class SalesAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesAnalytics
        fields = "__all__"

