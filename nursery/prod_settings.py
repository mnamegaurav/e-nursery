# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ["DB_NAME"],
        "USER": os.environ["DB_USER"],
        "PORT": os.environ["DB_PORT"],
        "HOST": os.environ["DB_HOST"],
        "PASSWORD": os.environ["DB_PASSWORD"],
    }
}

ALLOWED_HOSTS = ["*"]

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'dc136pnf3svtcl',
#         'USER': 'rfirpdeigxclvw',
#         'PASSWORD': 'fcc7d4c81251588f7ba329f44a2300a00096531be4b2d3ee5ae8eba21e42386c',
#         'HOST': 'ec2-54-170-123-247.eu-west-1.compute.amazonaws.com',
#         'PORT': 5432,
#     }
# }