from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),

    path('register-page/', views.register_page, name='register_page'),
    path('login-page/', views.login_page, name='login_page'),
    path('appointments-page/', views.appointments_page, name='appointments_page'),
    path('admin-dashboard-page/', views.admin_dashboard_page, name='admin_dashboard_page'),

    # Appointments
    path('appointments/', views.list_appointments, name='list_appointments'), # Admin: all appointments, User: own
    path('create-appointment/', views.create_appointment, name='create_appointment'), # User creates
    path('appointments/<int:appointment_id>/update/', views.update_appointment, name='update_appointment'), # Admin updates
]