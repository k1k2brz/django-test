from django.urls import path
from .views import get_items, add_item, update_item, delete_item, signup, login, logout

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    
    path('items/', get_items, name='get_items'),
    path('items/add/', add_item, name='add_item'),
    path('items/update/<int:pk>/', update_item, name='update_item'),
    path('items/delete/<int:pk>/', delete_item, name='delete_item'),
]