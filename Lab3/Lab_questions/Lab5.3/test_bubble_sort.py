# Test for boundary case
import pytest
from bubble_sort import bubble_sort


def test_empty_array():
    # Empty array should return an empty array
    assert bubble_sort([]) == []

def test_single_element():
    # Single element array should return the same array
    assert bubble_sort([5]) == [5]

def test_two_elements_sorted():
    # Sorted two element array should remain unchanged
    assert bubble_sort([1, 2]) == [1, 2]

def test_two_elements_unsorted():
    # Unsorted two element array should be sorted
    assert bubble_sort([2, 1]) == [1, 2]

def test_all_elements_same():
    # Array with all elements the same should remain unchanged after sorting
    assert bubble_sort([3, 3, 3, 3]) == [3, 3, 3, 3]

def test_already_sorted():
    # Already sorted array should remain unchanged
    assert bubble_sort([1, 2, 3, 4]) == [1, 2, 3, 4]

def test_reverse_sorted():
    # Reverse sorted array should be correctly sorted into ascending order
    assert bubble_sort([4, 3, 2, 1]) == [1, 2, 3, 4]

def test_mixed_positive_negative():
    # Array with a mix of positive, zero, and negative numbers should be correctly sorted
    assert bubble_sort([-1, 0, 1, -5, 3]) == [-5, -1, 0, 1, 3]
