# Generated by Django 4.0.4 on 2022-04-26 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0010_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/default.png', null=True, upload_to=''),
        ),
    ]
