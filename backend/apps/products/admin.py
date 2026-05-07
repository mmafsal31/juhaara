from django.contrib import admin
from .models import Category, Product, ProductImage, ProductVariant, Review, Wishlist


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock", "rating", "is_featured", "is_active")
    list_filter = ("category", "is_featured", "is_active")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline, ProductVariantInline]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("product", "user", "rating", "is_approved", "created_at")
    list_filter = ("rating", "is_approved")


admin.site.register(Wishlist)
admin.site.site_header = "Juhaara Admin"
admin.site.site_title = "Juhaara"
admin.site.index_title = "Premium Store Control"

