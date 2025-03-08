import pytest


def func(x):
    if x == 0:
        raise ValueError("value error!")
    else:
        pass

def test1():
    with pytest.raises(ValueError):
        func(0)

def test2():
    assert func(1) == None