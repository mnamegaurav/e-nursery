# Generated by Django 3.2.1 on 2021-06-02 16:41

from django.db import migrations, models
import django.db.models.deletion
import django_fsm


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20210601_2049'),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=django_fsm.FSMIntegerField(choices=[(0, 'created'), (1, 'paid'), (2, 'fulfilled'), (3, 'cancelled'), (4, 'returned')], default=0, editable=False, protected=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='total_ammount',
            field=models.PositiveSmallIntegerField(editable=False),
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.country')),
            ],
        ),
    ]