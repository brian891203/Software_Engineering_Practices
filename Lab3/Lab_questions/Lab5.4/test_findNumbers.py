import pytest
from findNumbers import find_numbers

# Boundary test cases

def test_empty_list():
    # Empty list should return an empty list
    assert find_numbers([]) == []

def test_boundary_values():
    # Test boundary values: zero, very near zero positive and negative numbers
    input_data = [0, 0.000001, -0.000001, 1, -1]
    expected = ["zero", "positive", "negative", "positive", "negative"]
    assert find_numbers(input_data) == expected

def test_mixed_values():
    # Test mixed values: alternating negative, zero, and positive numbers
    input_data = [-10, 0, 10, -5, 5]
    expected = ["negative", "zero", "positive", "negative", "positive"]
    assert find_numbers(input_data) == expected

# Negative test cases

def test_invalid_element_type():
    # Passing a list with non-numeric elements should raise a TypeError
    with pytest.raises(TypeError):
        find_numbers([0, "a", 1])
        
def test_non_iterable_input():
    # Passing a non-iterable (e.g., integer) should raise a TypeError
    with pytest.raises(TypeError):
        find_numbers(123)