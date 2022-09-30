from django.shortcuts import render
from django.views.generic import TemplateView


# class HomePageView(TemplateView):
#    def get(self, request, **kwargs):
#        return render(request, 'index.html', context=None)


def index(request):
    return render(request, 'index.html', context=None)
