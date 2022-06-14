from django.db import models
from django.contrib.auth.models import User

# Create your models here.

##id is primary key for all models 
class Product(models.Model): 
	id = models.AutoField(primary_key = True, editable = False)
	user = models.ForeignKey(User, on_delete = models.SET_NULL,	null=True)
	name = models.CharField(max_length = 50, blank = False)
	company = models.CharField(max_length = 50, blank = False)
	category = models.CharField(max_length = 50, blank = False)
	rating = models.DecimalField(max_digits = 3, decimal_places = 2, blank=True, default=0)
	reviews = models.IntegerField(blank =True, default = 0)
	price = models.DecimalField(max_digits = 7, decimal_places = 2, blank=False)
	inventory = models.IntegerField(blank =True, default = 0)
	description = models.TextField(blank = True)
	dateAdded = models.DateTimeField(auto_now_add=True)
	image = models.ImageField(blank=True, null=True, default='/default.png')

	def __str__(self):
		return self.name

class Review(models.Model): 
	product = models.ForeignKey(Product, on_delete = models.SET_NULL, null=True)
	id = models.AutoField(primary_key = True, editable = False)
	user = models.ForeignKey(User, on_delete = models.SET_NULL,	null=True)
	name = models.CharField(max_length = 50, blank = False)
	rating = models.IntegerField(blank=True, default = 0)
	comment = models.TextField(blank = True, null=True)
	image = models.ImageField(blank=True, null=True)

	def __str__(self):
		return self.comment

class Order(models.Model): 
	id = models.AutoField(primary_key = True, editable = False)
	user = models.ForeignKey(User, on_delete = models.SET_NULL,	null=True)
	paymentMethod = models.CharField(max_length = 50, blank = False)
	taxPrice = models.DecimalField(max_digits = 7, decimal_places = 2, blank=False)
	shippingPrice = models.DecimalField(max_digits = 7, decimal_places = 2, blank=False)
	totalPrice = models.DecimalField(max_digits = 7, decimal_places = 2, blank=False)
	paid = models.BooleanField(default = False)
	orderCreationDate = models.DateTimeField(auto_now_add = True)
	deliveryDate = models.DateTimeField(blank = True, null=True)
	deliveredDate = models.DateTimeField(blank = True, null=True)
	delivered = models.BooleanField(default = False)
	shipped = models.BooleanField(default = False)

	def __str__(self):
		return str(self.totalPrice)


class OrderItem(models.Model): 
	product = models.ForeignKey(Product, on_delete = models.SET_NULL, null=True)
	name = models.CharField(max_length = 50, null=True, blank = True)
	quantity = models.IntegerField(blank = True, default = 0)
	price = models.DecimalField(max_digits = 7, decimal_places = 2, null=True, blank=True)
	order = models.ForeignKey(Order, on_delete = models.SET_NULL, null=True)

	def __str__(self):
		return self.name

class ShippingAddress(models.Model): 
	id = models.AutoField(primary_key = True, editable = False)
	order = models.OneToOneField(Order, on_delete = models.CASCADE, blank=False)
	streetAddress = models.TextField(blank = False)
	city = models.CharField(max_length = 100, blank = False)
	country = models.CharField(max_length = 50, blank = False)
	postalCode = models.IntegerField(blank =False, default = 0)
	shippingPrice = models.DecimalField(max_digits = 7, decimal_places = 2, blank=True, null=True)

	def __str__(self):
		return self.streetAddress