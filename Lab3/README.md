## pytest enviroment settings
$ pip install pytest
$ pip show test
$ pytest --version
$ pytest --help

## first test
一個加法函數，並寫該函數的測試方法

### test_func.py
``` python
def add(x, y):
    return x + y

def test1():
    assert add(1, 2) == 3

def test2():
    assert add(1, 3) == 4
ˋˋˋ

ˋˋˋ bash
$ pytest -vv test_func.py
or
$pytest
ˋˋˋ