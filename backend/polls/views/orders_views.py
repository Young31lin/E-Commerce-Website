from django.shortcuts import render
from django.http import JsonResponse
from sqlalchemy import false
from polls.models import Product, Order, ShippingAddress, OrderItem
from polls.products import products
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from polls.serialize import ProductSerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems (request):
    user=request.user
    data=request.data
    orderItems=data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'Detail': 'No order items '}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order=Order.objects.create(
            user=user,
            paymentMethod=data['payment']['payment'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        shipping=ShippingAddress.objects.create(
            order=order,
            streetAddress=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            country=data['shippingAddress']['country'],
            postalCode=data['shippingAddress']['postal'],
            shippingPrice=data['shippingPrice']
        )
        for i in orderItems:
            product=Product.objects.get(id=i['product'])
            item=OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=i['qty'],
                price=i['price']
            )
            product.inventory -= item.quantity
            product.save
        
        serializer=OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user=request.user
    try:
        order=Order.objects.get(id=pk)
        if user.is_staff or order.user==user:
            serializer=OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'Detail' : 'not authorized'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'Detail':'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)  

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order=Order.objects.get(id=pk)
    order.paid=True
    order.save()
    return Response('Order was paid')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user=request.user
    orders=user.order_set.all()
    serializer=OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders=Order.objects.all()
    serializer=OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToShipped(request, num):
    order=Order.objects.get(id=num)
    order.shipped = True
    order.deliveryDate = datetime.now()
    order.save()
    return Response('Order Shipped')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, num):
    order=Order.objects.get(id=num)
    order.delivered = True
    order.deliveredDate = datetime.now()
    order.save()
    return Response('Order Delivered!')