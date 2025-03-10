import pytest
from classifyTriangle import classify_triangle


# 1. Equilateral partition
def test_equilateral_triangle():
    assert classify_triangle(5, 5, 5) == "Equilateral"

# 2. Isosceles partition
def test_isosceles_triangle_side12():
    assert classify_triangle(5, 5, 3) == "Isosceles"

def test_isosceles_triangle_side13():
    assert classify_triangle(5, 3, 5) == "Isosceles"

def test_isosceles_triangle_side23():
    assert classify_triangle(3, 5, 5) == "Isosceles"

# 3. Scalene partition
def test_scalene_triangle():
    assert classify_triangle(3, 4, 5) == "Scalene"