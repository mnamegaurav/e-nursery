from functools import reduce


# To calculate the total price of an order or cart
def total_ammount_calculator(plants):
    price_list = [*(map(lambda plant: plant.price, plants))]
    # price_list = [20, 10, 100,.....]
    if price_list:
        calculated_total_ammount = reduce(
            lambda prev, next: prev + next, price_list
        )
    else:
        calculated_total_ammount = 0
    return calculated_total_ammount
