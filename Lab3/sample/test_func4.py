import pytest


# 以下有五個測試方法，總共分成兩個測試組別，g1 和 g2
# 這樣可以透過 pytest -m g1 來執行 g1 組別的測試
# 也可以透過 pytest -m g2 來執行 g2 組別的測試
@pytest.mark.g1
def test_func1():
    pass

@pytest.mark.g2
def test_func2():
    pass

@pytest.mark.g1
def test_func3():
    pass

@pytest.mark.g2
def test_func4():
    pass

@pytest.mark.g1
def test_func5():
    pass