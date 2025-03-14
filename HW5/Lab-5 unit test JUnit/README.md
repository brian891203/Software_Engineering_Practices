# HW5: unit test for AVL tree
## Test Objectives
以下整理測試 AVL Tree 時常見的 **測試目標** 與 **邊界條件**，可做為撰寫測試案例的參考：
### 一、測試目標 (Test Objectives)

1. **正確性 (Correctness)**  
   - **插入 (Insertion)**：插入新節點後，AVL Tree 仍保持平衡，且能正確插入新值。  
   - **搜尋 (Search)**：能正確尋找已存在或不存在的節點。  
   - **刪除 (Deletion)**（若有實作）：刪除節點後，能維持平衡並確保其他節點正常存在。  
   - **遍歷 (Traversal)**：包含中序、前序、後序遍歷等方法，結果正確無誤。  
   - **計算節點數 (Count Nodes)**：能正確回傳節點總數。  
   - **空樹處理 (IsEmpty / MakeEmpty)**：在空樹及清空後的樹都能正確回應。

2. **平衡性 (Balance)**  
   - 在各種插入與刪除操作後，任何節點的左右子樹高度差不超過 1。  
   - 包含 LL、RR、LR、RL 等旋轉情況都能正確觸發與執行。

3. **效率 (Performance)**  
   - 查詢與插入操作應維持 O(log n) 的平均與最壞時間複雜度。  
   - 針對大規模節點（如上萬、十萬節點）的插入或查詢，測試執行時間是否合理。

4. **健壯性 (Robustness)**  
   - 處理重複值：若遇到重複插入，應該採取忽略或其他既定策略。  
   - 負面測試：搜尋或刪除樹中不存在的值，能正常處理而不產生異常。

---

### 二、邊界條件 (Boundary Conditions)

1. **空樹 (Empty Tree)**  
   - 剛建立的樹不含任何節點，呼叫 `isEmpty()` 應該回傳 `true`。  
   - 插入第一個節點後，樹不再是空樹；若清空樹後，又能恢復空樹狀態。

2. **單節點樹 (Single Node)**  
   - 只插入一個節點，測試搜尋、刪除、遍歷的結果。  
   - 例如插入 10 後，`inorder()`, `preorder()`, `postorder()` 都只會輸出 "10"。

3. **極端順序插入 (Worst-case Insertion Order)**  
   - 例如連續插入遞增或遞減序列（如 1,2,3,4,5,6...），確保會觸發旋轉 (LL 或 RR) 並重新平衡。  
   - 測試樹是否仍能保持高度平衡。

4. **重複值插入 (Duplicate Insertion)**  
   - 插入相同的值多次，應驗證 AVL Tree 是否有正確處理（忽略或更新節點等）。  
   - 節點數是否如預期（不會多插入重複值）。

5. **旋轉情境 (Rotations)**  
   - **LL 旋轉**：如插入序列 30, 20, 10。  
   - **RR 旋轉**：如插入序列 10, 20, 30。  
   - **LR 旋轉**：如插入序列 30, 10, 20。  
   - **RL 旋轉**：如插入序列 10, 30, 20。  
   - 每種旋轉完成後，檢查節點位置與遍歷結果是否正確。

6. **大量節點 (Large Number of Nodes)**  
   - 測試在大量插入（如數萬筆資料）下，程式的執行效能與正確性。  
   - 例如在限定時間內完成插入、搜尋等操作，以驗證 O(log n) 性能。

7. **負面操作 (Negative Operations)**  
   - 搜尋或刪除樹中不存在的值，測試程式是否能優雅處理而不產生異常。  
   - 確認方法回傳 false（或拋出適當例外）等行為是否符合設計預期。

8. **清空操作 (MakeEmpty)**  
   - 在非空樹上呼叫 `makeEmpty()`，樹應該恢復到空狀態，且 `isEmpty()` 回傳 true。  
   - 後續若再次插入，樹應該能重新建立正常結構。

---

### 小結

- **測試目標**：確保 AVL Tree 基本操作（插入、刪除、搜尋、遍歷）與平衡性符合規格，並在大規模資料下維持良好效能。  
- **邊界條件**：空樹、單節點樹、極端順序插入、重複值插入、旋轉情境、大量節點等，都需要測試覆蓋。  

## JUnit5 Basic Intro
JUnit 5 基本測試 annotation 及使用範例：

### 1. @Test  
標記一個方法為測試方法。JUnit 5 執行時會自動尋找所有使用此 annotation 的方法並執行。

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ExampleTest {

    @Test
    void simpleTest() {
        // arrange
        int expected = 5;
        int actual = 2 + 3;
        // assert
        assertEquals(expected, actual, "2 + 3 應該等於 5");
    }
}
```

---

### 2. @BeforeAll 與 @AfterAll  
- **@BeforeAll**：在所有測試方法執行前只執行一次，通常用於設定整個測試類別共用的資源。  
- **@AfterAll**：在所有測試方法執行完畢後只執行一次，用於釋放共用資源。  
注意：這兩個方法必須是 `static` 的。

```java
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ExampleTest {

    @BeforeAll
    static void setupAll() {
        System.out.println("BeforeAll: 初始化共用資源");
    }

    @AfterAll
    static void tearDownAll() {
        System.out.println("AfterAll: 釋放共用資源");
    }

    @Test
    void testA() {
        assertTrue(true);
    }
    
    @Test
    void testB() {
        assertEquals(1, 1);
    }
}
```

---

### 3. @BeforeEach 與 @AfterEach  
- **@BeforeEach**：在每個測試方法執行前執行，用來重設或初始化測試狀態。  
- **@AfterEach**：在每個測試方法執行後執行，用於清理或還原測試狀態。

```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ExampleTest {

    @BeforeEach
    void setup() {
        System.out.println("BeforeEach: 每次測試前執行");
    }

    @AfterEach
    void tearDown() {
        System.out.println("AfterEach: 每次測試後執行");
    }

    @Test
    void testExample() {
        assertNotNull("Hello");
    }
}
```

---

### 4. @DisplayName  
可以用來給測試方法或測試類別自訂顯示名稱，這個名稱會在測試報告中顯示，讓測試目的更明確。

```java
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ExampleTest {

    @Test
    @DisplayName("測試加法功能：2 + 3 = 5")
    void testAddition() {
        assertEquals(5, 2 + 3);
    }
}
```

---

### 5. @Disabled  
用來標記某個測試方法或整個測試類別暫時不執行，通常用於尚未完成或需要暫停的測試。

```java
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ExampleTest {

    @Test
    @Disabled("這個測試尚未實作完成")
    void testPending() {
        // 尚未實作的測試方法
        fail("尚未實作");
    }
}
```

---

### 6. @Nested  
允許在同一個測試類別內部建立內部測試類別，使測試組織更清晰，可以用來分組相關的測試案例。

```java
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ExampleTest {

    @Nested
    class AdditionTests {
        @Test
        void testPositiveNumbers() {
            assertEquals(7, 3 + 4);
        }

        @Test
        void testNegativeNumbers() {
            assertEquals(-7, -3 + -4);
        }
    }
    
    @Nested
    class SubtractionTests {
        @Test
        void testSubtraction() {
            assertEquals(1, 5 - 4);
        }
    }
}
```

---

### Summary
- **@Test**：標記測試方法  
- **@BeforeAll / @AfterAll**：整個測試類別只執行一次的初始化與清理  
- **@BeforeEach / @AfterEach**：每個測試方法前後的初始化與清理  
- **@DisplayName**：自訂顯示名稱  
- **@Disabled**：禁用測試  
- **@Nested**：分組測試

## Naming standards for unit tests
### 命名規則

1. **描述性名稱**  
   測試方法名稱應該清楚描述「被測單元（Method/Function）」、「執行狀態」與「預期結果」，使測試案例能自我說明。避免簡短、模糊或只有數字的名稱。

2. **格式化命名**  
   常見格式為：  
   **MethodName_StateUnderTest_ExpectedBehavior**  
   或是：  
   **MethodName_WhenCondition_ShouldExpectedResult**  
   使用底線（_）或駝峰命名法來區分各個部分。

3. **不必加 Test 前綴**  
   由於測試框架會根據 @Test 註解識別測試方法，方法名稱中不需要再加上「Test」字樣，除非需要進一步區分同一單元的不同測試。

4. **讀起來像句子**  
   命名最好能像一句完整的描述，這有助於後續閱讀測試報告時快速了解測試失敗原因。

5. **避免使用抽象術語**  
   測試名稱應該具體、直觀，避免僅用「shouldPass」這類過於抽象的描述，而是要指出實際行為與預期結果。

---

### 範例

- **範例 1**  
  測試一個新建立的 AVL Tree 是否為空：  
  ```java
  @Test
  void isEmpty_WhenNewlyCreated_ShouldReturnTrue() {
      AvlTree tree = new AvlTree();
      assertTrue(tree.isEmpty(), "Newly created AVL tree should be empty");
  }
  ```
  *說明：方法名稱指出測試 isEmpty() 方法；狀態為「當新建時」；預期結果為「應該回傳 true」。*

- **範例 2**  
  測試插入重複數值不會改變樹的節點數量：  
  ```java
  @Test
  void insert_WhenDuplicateValueInserted_ShouldNotIncreaseNodeCount() {
      AvlTree tree = new AvlTree();
      tree.insert(15);
      tree.insert(15);  // duplicate
      assertEquals(1, tree.countNodes(), "Duplicate insertion should not increase node count");
  }
  ```
  *說明：方法名稱清楚描述測試 insert 方法在遇到重複值時，預期不會增加節點數。*

- **範例 3**  
  測試 AVL Tree 的中序遍歷結果是否為排序後的序列：  
  ```java
  @Test
  void inorder_WhenCalled_ShouldReturnSortedElements() {
      AvlTree tree = new AvlTree();
      int[] elements = {30, 10, 20, 40, 50};
      for (int elem : elements) {
          tree.insert(elem);
      }
      assertEquals("10 20 30 40 50", tree.inorder(), "Inorder traversal should return elements in sorted order");
  }
  ```
  *說明：方法名稱表明當呼叫 inorder() 時，預期回傳一個排序後的字串。*

---

### Summary

根據 Osherove 的命名標準，測試方法的名稱應具備下列三個部分：
- **被測單元**：例如 isEmpty、insert、inorder 等。
- **狀態條件**：如 WhenNewlyCreated、WhenDuplicateValueInserted。
- **預期結果**：如 ShouldReturnTrue、ShouldNotIncreaseNodeCount、ShouldReturnSortedElements。