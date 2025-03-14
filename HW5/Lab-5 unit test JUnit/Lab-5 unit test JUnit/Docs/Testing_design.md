# Testing Design
### A. Code Coverage

**目標：**  
確保測試案例能執行 AVL Tree 的所有 public 方法與大部分邏輯分支，包含旋轉（LL、RR、LR、RL）的執行路徑。

**設計思路：**  
- 每個 public 方法（isEmpty、makeEmpty、insert、countNodes、search、inorder、preorder、postorder）都必須至少被呼叫一次。
- 針對 insert 方法，分別設計案例讓程式分別走到「左子樹插入」、「右子樹插入」以及重複值情境，從而觸發不同旋轉（如 LL、RR、LR、RL）的邏輯。

*範例：*  
- 插入 {30, 20, 10} 觸發 LL 旋轉  
- 插入 {10, 20, 30} 觸發 RR 旋轉  
- 插入 {30, 10, 20} 觸發 LR 旋轉  
- 插入 {10, 30, 20} 觸發 RL 旋轉

---

### B. Partition Testing

**目標：**  
將輸入分成幾個區間，每個區間代表不同的情境或資料分布。

**設計思路：**  
- **數據分布的 Partition：**  
  - 有序（遞增、遞減）序列  
  - 隨機順序  
  - 重複值（如果規格明確表示重複值不會重複插入）
- **方法測試 Partition：**  
  - 對於 search()：測試存在的值與不存在的值  
  - 對於遍歷方法：不同插入順序對結果的影響

*範例：*  
- 分區 1：插入無序資料 {30, 10, 20, 40, 50}，中序結果應為排序後「10 20 30 40 50」  
- 分區 2：插入遞增資料 {1, 2, 3, 4, 5}，檢查是否自動旋轉保持平衡  
- 分區 3：重複值測試，例如多次插入 15，並檢查 countNodes 是否只增加一次

---

### C. Boundary Tests

**目標：**  
檢查在極端條件下 AVL Tree 的行為是否正確。

**設計思路：**  
- **空樹：**  
  - 剛建立的 AVL Tree，isEmpty() 應返回 true  
  - 呼叫 inorder、preorder、postorder 都應返回空字串  
- **單節點：**  
  - 插入一個元素後，遍歷結果應該只包含這個單一元素  
- **極端插入順序：**  
  - 連續插入遞增或遞減資料，確保旋轉發生後依然正確  
- **清空操作：**  
  - 呼叫 makeEmpty() 後，所有方法都應回到空樹狀態

*範例：*  
- 空樹測試：new AvlTree() 後 assertTrue(isEmpty()) 且 countNodes() = 0  
- 單節點測試：插入 10，遍歷結果均為 "10"  
- 清空測試：插入多個數據後呼叫 makeEmpty()，檢查 isEmpty 與 countNodes

---

### D. Negative Tests

**目標：**  
確保在錯誤或意外輸入下，AVL Tree 不會出現異常行為。

**設計思路：**  
- 搜尋不存在的值：search() 返回 false  
- 重複插入：確認 countNodes 不會重複增加  
- 插入邊界值（例如極大或極小整數），確認樹依然能處理

*範例：*  
- 搜尋一個未插入的數字，例如在 {10, 20, 30} 中 search(40) 應返回 false  
- 重複插入：插入 15 多次後，countNodes() 應返回 1

---

### E. Performance Tests

**目標：**  
測試 AVL Tree 在大數據量下是否能保持 O(log n) 性能。

**設計思路：**  
- 插入大量節點（例如 100,000 或更多）  
- 使用 @Timeout 註解限定測試執行時間，確保在合理時間內完成  
- 測試在大數據量下，countNodes() 與 search() 操作是否快速

*範例：*  
- 插入 100,000 個有序或隨機數據，並用 @Timeout(5秒) 確認在 5 秒內完成  
- 在大量節點中隨機選擇值進行 search()，確保不超時且返回正確結果

---

### 綜合案例範例

下面是一個綜合測試案例的範例（僅示範部分）：

```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import java.util.concurrent.TimeUnit;

public class AVLTreeTest {

    // A. Code Coverage: 測試所有基本 public 方法
    @Test
    void isEmpty_WhenTreeIsNew_ShouldReturnTrue() {
        // given: 新建立 AVL Tree
        AvlTree underTest = new AvlTree();
        // then: 空樹狀態確認
        assertTrue(underTest.isEmpty(), "New AVL Tree should be empty");
    }

    // B. Partition Testing: 不同資料分布下的遍歷測試
    @Test
    void inorder_WhenUnorderedDataInserted_ShouldReturnSortedSequence() {
        // given: 插入無序數據
        AvlTree underTest = new AvlTree();
        int[] data = {30, 10, 20, 40, 50};
        for (int num : data) {
            underTest.insert(num);
        }
        // then: 中序遍歷結果應為排序後的數字字串
        assertEquals("10 20 30 40 50", underTest.inorder(), "Inorder traversal should return sorted sequence");
    }

    // C. Boundary Test: 單節點測試
    @Test
    void inorder_WhenSingleElementInserted_ShouldReturnSingleElement() {
        // given: 插入單一元素
        AvlTree underTest = new AvlTree();
        underTest.insert(10);
        // then: 中序遍歷僅包含這個元素
        assertEquals("10", underTest.inorder(), "Inorder traversal for a single element should return that element");
    }

    // D. Negative Test: 搜尋不存在的元素
    @Test
    void search_WhenElementNotPresent_ShouldReturnFalse() {
        // given: 插入幾個數據
        AvlTree underTest = new AvlTree();
        underTest.insert(10);
        underTest.insert(20);
        // then: 搜尋不存在的值返回 false
        assertFalse(underTest.search(30), "Searching for a non-existent element should return false");
    }

    // D. Negative Test: 重複插入相同數據
    @Test
    void insert_WhenDuplicateValuesInserted_ShouldNotIncreaseNodeCount() {
        // given: 插入重複數值
        AvlTree underTest = new AvlTree();
        underTest.insert(15);
        underTest.insert(15); // duplicate
        // then: 節點數應只算一次
        assertEquals(1, underTest.countNodes(), "Duplicate insertion should not increase node count");
    }

    // E. Performance Test: 大量數據插入
    @Test
    @Timeout(value = 5, unit = TimeUnit.SECONDS)
    void insert_PerformanceTest_WithLargeNumberOfNodes_ShouldCompleteWithinTimeout() {
        // given: 準備大量節點
        AvlTree underTest = new AvlTree();
        int n = 100000;
        // when: 插入 n 個數據
        for (int i = 0; i < n; i++) {
            underTest.insert(i);
        }
        // then: 確認所有節點皆被正確插入
        assertEquals(n, underTest.countNodes(), "All nodes should be present after bulk insertion");
    }
}
```

### 總結

根據以上要求設計測試案例時，可遵循以下步驟：
1. **Code Coverage**：每個 public 方法至少一個測試案例，並覆蓋不同程式邏輯分支（例如旋轉邏輯）。
2. **Partition Testing**：依據不同的輸入分布（無序、遞增、重複）設計測試案例。
3. **Boundary Tests**：測試空樹、單節點樹、極端數據（連續遞增或遞減）的行為。
4. **Negative Tests**：檢查不存在值、重複插入等情況下 AVL Tree 是否能正確處理。
5. **Performance Tests**：透過大量數據的測試案例來確認操作的效能（例如使用 @Timeout 限制測試時間）。

這樣的測試設計可以全面驗證 AVL Tree 的正確性、穩定性與效能，滿足大部分測試需求。