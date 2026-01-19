from django.contrib import admin
from .models import Appointment

# Register your models here.

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'service_type',
        'appointment_date',
        'appointment_time',
        'status',
        'created_at'
    )

    list_filter = ('status', 'service_type')
    search_fields = ('user__username', 'service_type')
