import os

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render


def index(req):
    return JsonResponse({"qwer": "qwer"})
