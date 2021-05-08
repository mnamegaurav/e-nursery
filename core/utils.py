from functools import reduce


# To calculate the total price of an order or cart
def total_price_calculator(instance):
    price_list = instance.plants.values_list('price')
    # price_list = [(20,), (10,), (100),.....]
    if price_list:
        calculated_total_price = sum(reduce(lambda prev,next: prev+next, price_list))
    else:
        calculated_total_price = 0
    return calculated_total_price