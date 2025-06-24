from django.urls import path
from .views import (
    DepartamentListView, 
    DepartamentDetailView,
    DepartmentCreateView,
    DepartmentUpdateView,
    DepartmentDeleteView)

urlpatterns = [
    path('', DepartamentListView.as_view(), name='departament-list'),
    path('<int:pk>/', DepartamentDetailView.as_view(), name='departament-detail'),
    path('criar/', DepartmentCreateView.as_view(), name='departament-create'),
    path('alterar/<int:pk>/', DepartmentUpdateView.as_view(), name='departament-update'),
    path('deletar/<int:pk>/', DepartmentDeleteView.as_view(), name='departament-delete'),
]
