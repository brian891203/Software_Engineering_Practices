# PyTest tutorial
* 參考教學影片: https://www.youtube.com/watch?v=CDBcNB2RrvE
* https://timkuo42.medium.com/pytest%E5%9F%BA%E7%A4%8E%E5%85%A5%E9%96%80%E6%95%99%E5%AD%B8-%E4%B8%8A-3d1ee547f7d

## pytest enviroment settings
$ pip install pytest

$ pip show test

$ pytest --version

$ pytest --help

## pytest 測試機制說明
* pytest 會自動搜尋檔案名以 test 為開頭（例如：test_example.py）或以 _test.py 為結尾的檔案，來做為測試檔案
pytest 首先會遍歷當前目錄及所有子目錄，根據預設規則（檔案名以 test 為開頭或結尾）找到所有測試文件，並將其中的測試函數、測試類別進行收集。

* 在進到測試文件中，也是會自動搜尋並收集所有函式或方法名稱以 test 開頭的測試用例
- **測試函式**：  
  在模組中，所有直接定義的以 `test` 開頭的函式都會被自動識別並執行。例如：
  ```python
  def test_addition():
      assert 1 + 1 == 2
  ```

- **測試類別與方法**：  
  如果你在測試文件中定義了一個類別，類別名稱通常也必須以 `Test` 開頭，而這個類別內部所有以 `test` 開頭的方法也會被自動收集並執行。例如：
  ```python
  class TestMathOperations:
      def test_subtraction(self):
          assert 2 - 1 == 1
  ```

只要符合這個命名規則，pytest 就會自動發現並執行這些測試用例，而不需要額外指定。

## first test
一個加法函數，並寫該函數的測試方法

### test_func.py
``` python
def add(x, y):
    return x + y

def test1():
    assert add(1, 2) == 4

def test2():
    assert add(1, 3) == 4

```

``` bash
# 測試指定 test 文件
pytest -vv test_func.py
# or
## 會把該路徑下所有以 test 為開頭的測試文件都做一次測試
pytest -vv
## -v 是 verbose 的縮寫，代表輸出更多測試過程中的詳細訊息。
## 使用 -vv（兩個 v）則會啟用更高層級的詳細輸出，顯示更豐富的資訊
```

## 計算測試的時間
``` bash
pytest --durations=0 -vv test_func.py
```

## 測試例外發生
``` python
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

```

## 傳遞不同參數去進行測試
``` python
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

```

## 分組測試
* 將測試方法分為不同的測試組別，而在進行測試時，可以單獨只測試某個組的測試方法

``` bash
# 觀察系統預設分組(markers)
pytest --markers

# 建立自訂分組
nano pytest.ini
...
[pytest]
markers =
    g1: group1.
    g2: group2.
...

# 再次觀察自訂分組是否已經加入置系統內
pytest --markers
```

### test_func4.py
``` python
# 以下有五個測試方法，總共分成兩個測試組別，g1 和 g2
# 這樣可以透過 pytest -m g1 來執行 g1 組別的測試
# 也可以透過 pytest -m g2 來執行 g2 組別的測試

import pytest

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
```

``` bash
# 不指定就是預設的所有測試方法都測試一遍
pytest -vv

# 只測試 g1 組別的測試方法
pytest -vv -m g1

# 只測試 g2 組別的測試方法
pytest -vv -m g2
```


# Lab 3 content

## Test coverage
``` bash
# 將 test coverage 資訊顯示在 terminal 上
pytest --cov -vv

# 將 test coverage 資訊整理成 report 存放成 html 格式於 htmlcov folder 中，會顯示像是哪幾行 source code 沒有被測試到
pytest --cov-report html --cov
```

## pytest content manager
* pytest.raise(Exception)
``` python
import pytest

def test_zero_div():
    with pytest.raises(ZeroDivisionError):
        1 / 0

test_zero_div()
```

## Branch coverage
``` bash
python -m pytest --cov-branch --cov
```