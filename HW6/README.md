# HW5
## 重點整理:
* Stub：用來取代外部依賴，提供預設固定的行為，不太關心呼叫細節。
範例：建立一個簡單物件來模擬 WordPurityService。

* Mock：除了提供預設行為外，還記錄函式調用的資訊（呼叫次數、參數等），常用於驗證依賴之間的互動。
範例：使用 jest.fn() 建立一個替身，並用 toHaveBeenCalledTimes/ toHaveBeenCalledWith 進行驗證。

* Spy：監控一個已有方法的調用情況，可以保留原始實作或覆寫行為，並可在測試結束後還原。
範例：用 jest.spyOn() 監控 Math.random 或物件的方法。

## Jest Mock 相關用法:
以下整理了使用 Jest 進行 mock 的兩種常見情境：一是 mock 一個物件（或模組），二是 mock 一個物件上的方法。以下為完整說明：

---

### 1. Jest Mock 一個物件（或模組）

#### a. 使用 jest.mock()
- **目的：** 用於完全替換一個模組的實作，讓測試中使用的物件都是受控的替身（Test Double）。
- **用法：**
  - 在測試檔案上方或 Jest 設定中使用：
    ```js
    // 假設有一個模組 "./api"
    jest.mock('./api');
    ```
  - Jest 會自動將該模組中所有導出的函式替換成 jest.fn() 產生的 mock 函式，你可以設定各個函式的返回值或行為：
    ```js
    import { fetchData } from './api';
    fetchData.mockReturnValue(Promise.resolve({ data: 'mocked' }));
    ```
- **優點：**
  - 可以一次性替換整個模組，避免依賴真實的外部系統。
  - 測試時可以精確控制每個函式的返回值或模擬失敗情境。

#### b. 直接使用 jest.fn() 創建物件
- **目的：** 當你只需要建立一個簡單的物件替身，而不需要引用真實模組時，可以直接用物件字面值搭配 jest.fn()。
- **用法：**
  ```js
  const myObject = {
    methodA: jest.fn().mockReturnValue("result A"),
    methodB: jest.fn().mockImplementation((arg) => arg + 1),
  };
  ```
- **優點：**
  - 直接定義受控行為，方便在測試中驗證方法呼叫次數、傳入參數等細節。

---

### 2. Jest Mock 一個方法

#### a. 使用 jest.spyOn()
- **目的：** 監控（spy on）已存在物件上的某個方法，並在需要時覆寫其實作或檢查調用資訊。
- **用法：**
  ```js
  const obj = {
    add: (a, b) => a + b,
  };
  
  // 監控 obj.add 方法
  const addSpy = jest.spyOn(obj, "add");
  
  // 如果需要，可以覆寫其行為：
  addSpy.mockReturnValue(42);
  
  // 呼叫方法：
  const result = obj.add(1, 2);
  
  // 驗證調用情形：
  expect(addSpy).toBeCalledTimes(1);
  expect(addSpy).toHaveBeenCalledWith(1, 2);
  
  // 測試結束後恢復原始實作：
  addSpy.mockRestore();
  ```
- **優點：**
  - 可以在保留原始實作的同時，監控方法的呼叫情況。
  - 提供更細粒度的控制，並且可以在測試結束時還原原始方法，避免影響其他測試。

#### b. 直接覆寫方法為 jest.fn()
- **目的：** 如果你不需要原始實作，可直接將物件上的方法替換為一個 mock 函式。
- **用法：**
  ```js
  const obj = {
    add: (a, b) => a + b,
  };
  
  // 直接替換為 mock 函式
  obj.add = jest.fn(() => 42);
  
  // 呼叫後，結果固定為 42
  expect(obj.add(1, 2)).toBe(42);
  expect(obj.add).toBeCalledTimes(1);
  ```
- **優點：**
  - 簡單直接，適用於當你只想完全控制方法行為，而不需要保留原始實作。

---

### 小結

- **Mock 一個物件/模組：**  
  使用 `jest.mock()` 可以一次性替換整個模組的所有導出，或是使用 `jest.fn()` 直接建立物件內的各個 mock 方法。

- **Mock 一個方法：**  
  - **jest.spyOn()** 可監控現有方法（保留原始行為或覆寫），適合需要檢查方法呼叫次數、參數等細節，且最後可以用 `.mockRestore()` 還原原始方法。  
  - 直接覆寫方法（`obj.method = jest.fn()`）則完全替換原有實作，適合只需控制返回值的情況。

## Jest stub, mock, spy
在測試中，「stub」、「mock」與「spy」都屬於測試替身（Test Doubles）的概念，它們的目的都是為了隔離被測試單元，或是監控、控制依賴的行為，但用途與特性各有不同：

---

### 1. Stub

**定義：**  
Stub 是一個簡單的替身，它提供固定的回應或行為，通常用來取代外部依賴，讓測試可以得到預期的、可控的輸出，而不需要真正執行外部邏輯。

**特點：**  
- 不關注呼叫的次數或參數，只回傳預設結果。
- 用於隔離被測試單元，讓測試結果更可預期。

**在 Jest 中的使用範例：**

假設我們有一個外部服務，透過 Stub 來取代其行為：
```ts
// 假設 WordPurityService 的簡化版本
class WordPurityService {
  addWord(words: string[]) {
    // 真實實作可能有複雜的邏輯
  }
  purity(text: string) {
    // 真實實作可能根據敏感字串替換文本
    return text;
  }
}

// 建立一個 Stub：提供固定回傳值
const wordPurityServiceStub = {
  addWord: jest.fn(), // Stub 只記錄呼叫，不關心細節
  // Stub 實作：直接將所有 "abc" (不分大小寫) 替換成 "***"
  purity: jest.fn((text: string) => text.replace(/abc/gi, "***"))
};

// 測試中使用 stub
describe("WordPuritySystem using stub", () => {
  it("should replace sensitive words correctly", () => {
    // 假設 BookInfo 資料如下
    const bookData = [{ ISBN: "001", title: "xyzABC123abc", author: "Author1" }];
    // 建立使用 stub 的系統 (依賴注入)
    const system = new WordPuritySystem(wordPurityServiceStub);
    system.setDisablePurity(false);
    return system.process(bookData).then(() => {
      expect(system.items[0].title).toBe("xyz***123***");
    });
  });
});
```

---

### 2. Mock

**定義：**  
Mock 是一個功能更強大的替身，它不僅能提供預設回應，還能記錄呼叫次數、參數、返回值等資訊。透過 mock，你可以在測試中驗證被測試單元與依賴之間的互動是否正確。

**特點：**  
- 可設定回傳值、實作，且能追蹤方法調用的細節。
- 常用來驗證外部依賴的互動，例如確定某個方法是否被呼叫、呼叫次數與參數。

**在 Jest 中的使用範例：**

使用 `jest.fn()` 建立一個 mock 函式：
```ts
// 直接使用 jest.fn() 創建一個 mock 函式
const myMockFunction = jest.fn();
myMockFunction("arg1");
expect(myMockFunction).toHaveBeenCalledTimes(1);
expect(myMockFunction).toHaveBeenCalledWith("arg1");

// 或者為 stub 建立的替身中也可以視需要使用 mock 功能：
const wordPurityServiceMock = {
  addWord: jest.fn(),
  purity: jest.fn((text: string) => text.replace(/abc/gi, "***"))
};

describe("WordPuritySystem using mock", () => {
  it("should call addWord on creation and process titles", async () => {
    const bookData = [{ ISBN: "001", title: "xyzABC123abc", author: "Author1" }];
    const system = new WordPuritySystem(wordPurityServiceMock);
    expect(wordPurityServiceMock.addWord).toHaveBeenCalledWith(["Copperfield", "Wonderland"]);
    
    system.setDisablePurity(false);
    await system.process(bookData);
    
    expect(wordPurityServiceMock.purity).toHaveBeenCalledTimes(1);
    expect(system.items[0].title).toBe("xyz***123***");
  });
});
```

---

### 3. Spy

**定義：**  
Spy 是用來監控已存在的方法。它會「包裝」原有方法，記錄調用情況（如次數、參數、返回值），並可選擇是否保留原始實作。與直接使用 mock 函式相比，spy 更適合用於你想要保持原有行為但同時進行監控的情境。

**特點：**  
- 保留原始方法的實作（預設情況下）。
- 能夠追蹤方法呼叫的細節。
- 透過 `jest.spyOn()` 建立，且可以使用 `.mockRestore()` 還原原始方法。

**在 Jest 中的使用範例：**

監控一個物件上的方法：
```ts
const math = {
  add: (a, b) => a + b,
};

// 使用 spy 監控 math.add 方法
const addSpy = jest.spyOn(math, "add");
const result = math.add(1, 2);
expect(result).toBe(3);
expect(addSpy).toHaveBeenCalledTimes(1);
expect(addSpy).toHaveBeenCalledWith(1, 2);

// 還原原始實作
addSpy.mockRestore();
```

---

### 小結

- **Stub**：用來取代外部依賴，提供預設固定的行為，不太關心呼叫細節。  
  _範例：建立一個簡單物件來模擬 WordPurityService。_

- **Mock**：除了提供預設行為外，還記錄函式調用的資訊（呼叫次數、參數等），常用於驗證依賴之間的互動。  
  _範例：使用 jest.fn() 建立一個替身，並用 toHaveBeenCalledTimes/ toHaveBeenCalledWith 進行驗證。_

- **Spy**：監控一個已有方法的調用情況，可以保留原始實作或覆寫行為，並可在測試結束後還原。  
  _範例：用 jest.spyOn() 監控 Math.random 或物件的方法。_

這三者各有用途，選擇哪一種方式取決於你的測試需求：若僅需要簡單替換，使用 Stub；若需要檢查互動細節，使用 Mock；若希望監控並保留原始行為，則使用 Spy。

## Q3:
* Mock Math.random 的回傳值的幾種作法
``` ts
Math.random = jest.fn(() => 0.5); // 每次調用都返回 0.5
Math.random = jest.fn().mockReturnValue(0.5);

const randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);
```