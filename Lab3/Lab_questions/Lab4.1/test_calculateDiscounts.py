# Lab 4.1
# test_calculateDiscounts.py
from calculateDiscounts import calculate_discounts


def test_calculate_discounts():
    prices = [120, 80, 70, 30, 50]
    membership_levels = ['Gold', 'Gold', 'Silver', 'Silver', 'Bronze']
    expected_discounted_prices = ['96.00', '72.00', '60.50', '28.50', '50.00']

    result = calculate_discounts(prices, membership_levels)

    assert result == expected_discounted_prices