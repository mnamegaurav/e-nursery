import razorpay

from django.conf import settings


class RazorPayClient:
    def __init__(self):
        self.RAZOR_PAY_API_KEY = settings.RAZOR_PAY_API_KEY
        self.RAZOR_PAY_API_SECRET = settings.RAZOR_PAY_API_SECRET

        self.client = razorpay.Client(
            auth=(self.RAZOR_PAY_API_KEY, self.RAZOR_PAY_API_SECRET))

    def refund_payment(self):
        pass

    def create_payment(self):
        pass

    def get_payment(self):
        pass

    def get_refund(self):
        pass
