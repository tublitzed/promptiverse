from django.db import models

class Prompts(models.Model):
    ENGINE = (
        ('SD', 'Stable Diffusion'),
        ('M', 'Midjourney'),
        ('CR', 'Craiyon'),
    )
    # 77 char limit - https://github.com/CompVis/stable-diffusion/issues/282#issuecomment-1248082858
    prompt = models.CharField(max_length=77)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
