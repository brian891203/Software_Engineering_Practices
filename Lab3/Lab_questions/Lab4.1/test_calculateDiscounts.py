# Lab 4.1
# test_calculateDiscounts.py
import pytest
from calculateDiscounts import calculate_discounts


def test_calculate_discounts():
    prices = [120, 80, 70, 30, 50, 5]
    membership_levels = ['Gold', 'Gold', 'Silver', 'Silver', 'Bronze', 'Gold']
    expected_discounted_prices = ['96.00', '72.00', '59.50', '28.50', '50.00', '4.50']

    result = calculate_discounts(prices, membership_levels)

    assert result == expected_discounted_prices

def test_calculate_discounts_empty_input():
    with pytest.raises(Exception) as e:
        calculate_discounts([], [])
    assert str(e.value) == 'Prices and membership levels must be provided as non-empty lists.'

def test_calculate_discounts_different_lengths():
    with pytest.raises(Exception) as e:
        membership_levels = ['Gold', 'Gold']
        expected_discounted_prices = ['96.00', '72.00', '59.50', '28.50', '50.00']
        calculate_discounts(expected_discounted_prices, membership_levels)

    assert str(e.value) == 'Prices and membership levels lists must have the same length.'