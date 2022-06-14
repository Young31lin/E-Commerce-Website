from django.shortcuts import render
from django.http import JsonResponse
from sqlalchemy import false
from polls.models import Product, Review
from polls.products import products
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from polls.serialize import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



@api_view(['GET'])
def productsFunc(request): 
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(products, 3)

    try :
        products = paginator.page(page)
    except PageNotAnInteger :
        products = paginator.page(1)
    except EmptyPage :
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    page = int(page)
    serialized = ProductSerializer(products, many = True)
    return Response({'products': serialized.data, 'page':page, 'pages':paginator.num_pages})

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serialized=ProductSerializer(products, many = True)
    return Response(serialized.data)


@api_view(['GET'])
def singleProductFunc(request, num): 
    product = Product.objects.get(id = num)
    serialized = ProductSerializer(product, many = False)
    return JsonResponse(serialized.data, safe=False)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProductFunc(request, num): 
    product = Product.objects.get(id = num)
    product.delete()
    return Response('Successfully deleted product')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProductFunc(request): 
    productUser = request.user
    product=Product.objects.create(user=productUser,name=' ', price=0, company = ' ', inventory =0, category=' ', description=' ')
    serialized = ProductSerializer(product, many = False)
    return JsonResponse(serialized.data, safe=False)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProductFunc(request, num): 
    data = request.data
    product = Product.objects.get(id = num)
    product.name = data['name']
    product.company = data['company']
    product.category = data['category']
    product.price = data['price']
    product.inventory = data['inventory']
    product.description = data['description']
    product.save()
    serialized = ProductSerializer(product, many = False)
    return JsonResponse(serialized.data, safe=False)

@api_view(['POST'])
def uploadImageFunc(request): 
    data = request.data
    productId = data['id']
    product = Product.objects.get(id=productId)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was Uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, num):
    product=Product.objects.get(id=num)
    user=request.user
    data=request.data
    alreadyExist=product.review_set.filter(user=user).exists()
    if(alreadyExist):
        content={'detail':'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    elif data['rating']==0:
        content={'detail':'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        review=Review.objects.create(user=user, product=product, name=user.first_name, rating=data['rating'], comment=data['comment'],)
    product.reviews = len(product.review_set.all())
    total = 0
    for i in product.review_set.all():
        total += i. rating
    product.rating = total / product.reviews
    product.save()

    return Response({'detail' : ' review added'})


