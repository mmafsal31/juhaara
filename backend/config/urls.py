from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from apps.analytics.views import DashboardStatsView, SalesAnalyticsView
from apps.authentication.views import RegisterView, ProfileView
from apps.notifications.views import NotificationViewSet
from apps.orders.views import AddressViewSet, CartItemViewSet, CouponViewSet, OrderViewSet, PaymentViewSet
from apps.products.views import CategoryViewSet, ProductViewSet, ReviewViewSet, WishlistViewSet

router = DefaultRouter()
router.register("categories", CategoryViewSet)
router.register("products", ProductViewSet)
router.register("reviews", ReviewViewSet, basename="reviews")
router.register("wishlist", WishlistViewSet, basename="wishlist")
router.register("cart", CartItemViewSet, basename="cart")
router.register("orders", OrderViewSet, basename="orders")
router.register("payments", PaymentViewSet, basename="payments")
router.register("addresses", AddressViewSet, basename="addresses")
router.register("coupons", CouponViewSet)
router.register("notifications", NotificationViewSet, basename="notifications")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/auth/register/", RegisterView.as_view()),
    path("api/auth/profile/", ProfileView.as_view()),
    path("api/auth/token/", TokenObtainPairView.as_view()),
    path("api/auth/token/refresh/", TokenRefreshView.as_view()),
    path("api/analytics/dashboard/", DashboardStatsView.as_view()),
    path("api/analytics/sales/", SalesAnalyticsView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
