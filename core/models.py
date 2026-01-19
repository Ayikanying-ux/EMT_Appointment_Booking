from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Appointment(models.Model):

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
        ('COMPLETED', 'Completed'),
    ]

    user = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        related_name = 'appointments'
    )
    service_type = models.CharField(max_length=100)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    status = models.CharField(
        max_length = 20,
        choices = STATUS_CHOICES,
        default = 'PENDING'
    )
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.service_type} ({self.status})"