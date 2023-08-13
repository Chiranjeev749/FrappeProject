from rest_framework import serializers
from .models import Book, Member, Transaction, MemberHistory, MemberTransaction

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class MemberHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberHistory
        fields = '__all__'

class MemberTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberTransaction
        fields = '__all__'
