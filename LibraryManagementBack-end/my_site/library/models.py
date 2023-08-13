from django.db import models
from django.core.validators import MaxValueValidator

class Book(models.Model):
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    publisher = models.CharField(max_length=255)
    available = models.BooleanField("true")

    def __str__(self):
        return self.title

class Member(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    debt = models.IntegerField(validators=[MaxValueValidator(500)])

    def __str__(self):
        return self.name

class Transaction(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    borrow_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.member} borrowed {self.book}"

class MemberHistory(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    issued_books = models.ManyToManyField(Book, related_name='issued_books')
    returned_books = models.ManyToManyField(Book, related_name='returned_books')

    def __str__(self):
        return f"History for {self.member}"

class MemberTransaction(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    transaction_date = models.DateField()
    action = models.CharField(max_length=10)  # 'Borrowed' or 'Returned'

    def __str__(self):
        return f"{self.member} {self.action} {self.book}"
