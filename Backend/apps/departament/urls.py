from django.urls import path
from .views import (
    DepartamentListView, 
    DepartamentDetailView,
    DepartmentCreateView,
    DepartmentUpdateView,
    DepartmentDeleteView,
    EmployeeListView,
    EmployeeDetailView,
    EmployeeCreateView,
    EmployeeUpdateView)

urlpatterns = [
    path('', DepartamentListView.as_view(), name='departament-list'),
    path('<int:pk>/', DepartamentDetailView.as_view(), name='departament-detail'),
    path('criar/', DepartmentCreateView.as_view(), name='departament-create'),
    path('alterar/<int:pk>/', DepartmentUpdateView.as_view(), name='departament-update'),
    path('deletar/<int:pk>/', DepartmentDeleteView.as_view(), name='departament-delete'),
] + [
    path('<int:pk>/funcionarios/', EmployeeListView.as_view(), name='employee-list'),
    path('<int:pk>/funcionarios/<int:fpk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    path('<int:pk>/funcionarios/criar/', EmployeeCreateView.as_view(), name='employee-create'),
    path('<int:pk>/funcionarios/alterar/<int:fpk>/', EmployeeUpdateView.as_view(), name='employee-update'),
]
