from django.urls import path
from .views import BookView, MemberView, TransactionView, MemberHistoryView, MemberTransactionView

urlpatterns = [
    path('books/', BookView.as_view()),
    path('members/', MemberView.as_view()),
    path('transactions/', TransactionView.as_view()),
    path('member-history/', MemberHistoryView.as_view()),
    path('member-transaction/', MemberTransactionView.as_view()),
]
