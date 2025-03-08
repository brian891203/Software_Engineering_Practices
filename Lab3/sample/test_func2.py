def add(x, y):
    return x + y

import pytest


@pytest.mark.parametrize(
    "x, y, expected",
    [
        (1, 1, 2),
        (2, 2, 4),
        (10, 10, 20)
    ]
)

def test_add(x, y, expected):
    assert add(x, y) == expected