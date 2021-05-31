from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()


class UserDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'is_nursery',
            'full_name',
            'username',
        )
        read_only_fields = ('is_nursery',)


class UserDeactivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'is_active',
        )


class UserSignUpSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(required=True, write_only=True, style={
                                      'input_type': 'password'})
    password2 = serializers.CharField(required=True, write_only=True, style={
                                      'input_type': 'password'})

    class Meta:
        model = User
        fields = [
            'email',
            'is_nursery',
            'full_name',
            'username',
            'password1',
            'password2',
        ]
        read_only_fields = ('full_name', 'username',)
        extra_kwargs = {
            'password1': {'write_only': True},
            'password2': {'write_only': True},
        }

    def create(self, validated_data):
        email = validated_data.get('email')
        is_nursery = validated_data.get('is_nursery')
        password1 = validated_data.get('password1')
        password2 = validated_data.get('password2')

        if password1 == password2:
            user = User(email=email, is_nursery=is_nursery)
            user.set_password(password1)
            user.save()
            return user
        else:
            raise serializers.ValidationError({
                'error': 'Both passwords do not match'
            })
