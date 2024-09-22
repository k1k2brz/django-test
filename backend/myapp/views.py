from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.contrib.auth.models import User
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from .models import Item
from .serializers import ItemSerializer

# 로그인
@api_view(['POST'])
def login(request: Request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        django_login(request._request, user)
        return Response({"message": "로그인 성공"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

# 로그아웃
@api_view(['POST'])
def logout(request):
    django_logout(request)
    return Response({"message": "로그아웃 성공"}, status=status.HTTP_200_OK)

# 회원가입
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({"message": "회원가입 성공"}, status=status.HTTP_201_CREATED)

# 게시글
@api_view(['GET'])
def get_items(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_item(request):
    user = request.user
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_item(request, pk):
    try:
        item = Item.objects.get(id=pk)

        # 현재 로그인한 사용자가 해당 아이템의 작성자인지 확인
        if item.user != request.user:
            return Response({"error": "수정 권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)

        
        serializer = ItemSerializer(instance=item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Item.DoesNotExist:
        return Response({"error": "아이템을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_item(request, pk):
    try:
        item = Item.objects.get(id=pk)

        if item.user != request.user:
            return Response({"error": "삭제 권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)

        item.delete()
        return Response({"message": "아이템이 삭제되었습니다."}, status=status.HTTP_200_OK)

    except Item.DoesNotExist:
        return Response({"error": "아이템을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def session_status(request):
    if request.user.is_authenticated:
        return JsonResponse({'logged_in': True})
    else:
        return JsonResponse({'logged_in': False})