from djoser.serializers import UserCreateSerializer


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = UserCreateSerializer.Meta.fields + ('is_nursery',)