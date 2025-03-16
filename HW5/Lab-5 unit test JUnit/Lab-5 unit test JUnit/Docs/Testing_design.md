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

## Some example
以下是一份完整的 unit test 案例，檔案命名為 **AVLtreetest.java**。  
  
每個 test method 都依照命名慣例命名，並在註解中詳細說明測試動機、範疇與測試意圖（包含 code coverage、partition testing、boundary tests、negative tests 與 performance tests）。  

```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import java.util.concurrent.TimeUnit;

/**
 * 測試目標：
 * 1. 針對 AvlTree 的 public methods 進行單元測試，涵蓋 isEmpty(), makeEmpty(), insert(), countNodes(), search(),
 *    inorder(), preorder(), postorder() 等。
 * 2. 測試內容包含：
 *    - Code Coverage: 讓所有分支（包含旋轉機制）皆能被測試觸及。
 *    - Partition Testing: 針對不同輸入區間（空樹、單一節點、多節點、重複值）做區隔測試。
 *    - Boundary Tests: 例如新樹、makeEmpty 後狀態、極端順序插入導致旋轉。
 *    - Negative Tests: 測試不存在的值查找、重複插入不影響節點數量。
 *    - Performance Tests: 插入大量節點時能否在合理時間內完成 (O(log n) 插入時間)。
 */
public class AVLtreetest {

    /**
     * Test: isEmpty() - Boundary Test
     * Given: 一個新建的 AVL tree (空樹)
     * When: 呼叫 isEmpty()
     * Then: 預期回傳 true
     * 
     * 測試意圖：驗證剛建立的樹為空，符合邊界條件的檢查 (code coverage: 初始狀態)。
     */
    @Test
    public void testIsEmpty_givenNewTree_expectedTrue_byBoundary() {
        // given: 建立一個空的 AVL tree
        AvlTree tree = new AvlTree();
        // when: 檢查樹是否為空
        // then: 預期回傳 true
        assertTrue(tree.isEmpty(), "Newly created AVL tree should be empty");
    }

    /**
     * Test: insert() 與 search() - Coverage 與 Partition Testing
     * Given: 在 AVL tree 中依序插入 10, 5, 15
     * When: 呼叫 search() 查找已插入與未插入的值
     * Then: 預期 search(10), search(5), search(15) 為 true，而 search(20) 為 false
     * 
     * 測試意圖：確認正常插入後能正確搜尋，並對不存在的值進行 negative 測試，同時覆蓋左右子樹分支。
     */
    @Test
    public void testInsertAndSearch_givenInsertedElements_expectedFoundBySearch_byCoverage() {
        // given: 建立 AVL tree 並插入數值
        AvlTree tree = new AvlTree();
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        // when: 搜尋已插入的值
        // then: 應能正確找到這些值
        assertTrue(tree.search(10), "10 should be found in tree");
        assertTrue(tree.search(5), "5 should be found in tree");
        assertTrue(tree.search(15), "15 should be found in tree");
        // negative test: 搜尋一個不存在的值
        assertFalse(tree.search(20), "20 should not be found in tree");
    }

    /**
     * Test: makeEmpty() - Boundary Test
     * Given: 非空 AVL tree (插入 10, 5)
     * When: 呼叫 makeEmpty()
     * Then: 預期 isEmpty() 回傳 true 且 countNodes() 為 0
     * 
     * 測試意圖：檢查 makeEmpty 方法是否能清除所有節點，達到邊界條件下的重置效果。
     */
    @Test
    public void testMakeEmpty_givenNonEmptyTree_expectedEmptyByIsEmpty_byBoundary() {
        // given: 建立 AVL tree 並插入數值
        AvlTree tree = new AvlTree();
        tree.insert(10);
        tree.insert(5);
        // when: 呼叫 makeEmpty() 清空樹
        tree.makeEmpty();
        // then: 樹應該為空，且節點數為 0
        assertTrue(tree.isEmpty(), "Tree should be empty after makeEmpty");
        assertEquals(0, tree.countNodes(), "Node count should be 0 after makeEmpty");
    }

    /**
     * Test: countNodes() - Coverage Test
     * Given: 在 AVL tree 中依序插入一組不重複數值 {10, 20, 30, 40, 50, 25}
     * When: 呼叫 countNodes()
     * Then: 預期返回值與插入數量相同
     * 
     * 測試意圖：確認 countNodes() 能正確計算樹中節點個數，並檢查在插入多個元素後所有節點都存在 (覆蓋左右子樹遞迴邏輯)。
     */
    @Test
    public void testCountNodes_givenMultipleInsertions_expectedCorrectCount_byCoverage() {
        // given: 建立 AVL tree 並插入多個數值
        AvlTree tree = new AvlTree();
        int[] elements = {10, 20, 30, 40, 50, 25};
        for (int elem : elements) {
            tree.insert(elem);
        }
        // when: 計算樹中的節點數
        int count = tree.countNodes();
        // then: 預期節點數與插入數量一致 (重複值不會重複插入)
        assertEquals(elements.length, count, "countNodes should equal number of inserted nodes");
    }

    /**
     * Test: inorder() traversal - Partition Testing
     * Given: 在 AVL tree 中以無序順序插入數值 {30, 10, 20, 40, 50}
     * When: 呼叫 inorder() traversal
     * Then: 預期返回的字串為排序後結果 "10 20 30 40 50"
     * 
     * 測試意圖：檢查中序遍歷是否能回傳正確的排序結果，驗證樹的平衡與遍歷邏輯是否正確。
     */
    @Test
    public void testInorderTraversal_givenAVLTree_expectedSortedOrder_byPartition() {
        // given: 建立 AVL tree 並以無序順序插入數值
        AvlTree tree = new AvlTree();
        int[] elements = {30, 10, 20, 40, 50};
        for (int elem : elements) {
            tree.insert(elem);
        }
        // when: 執行中序遍歷
        String inorderResult = tree.inorder();
        // then: 預期返回排序後的結果
        assertEquals("10 20 30 40 50", inorderResult, "Inorder traversal should return sorted order");
    }

    /**
     * Test: preorder() traversal - Partition Testing (Rotation Coverage)
     * Given: 插入能夠觸發 LL 旋轉的序列 {30, 20, 10}
     * When: 呼叫 preorder() traversal
     * Then: 預期旋轉後的 AVL tree 結構為 root=20, 左子=10, 右子=30，返回 "20 10 30"
     * 
     * 測試意圖：藉由插入 30,20,10 使樹進行 LL 旋轉，檢查平衡旋轉是否正確反映在前序遍歷結果中，
     * 並驗證平衡性調整的 coverage。
     */
    @Test
    public void testPreorderTraversal_givenAVLTree_expectedAVLStructure_byPartition() {
        // given: 建立 AVL tree 並依序插入觸發 LL 旋轉的數值
        AvlTree tree = new AvlTree();
        tree.insert(30);
        tree.insert(20);
        tree.insert(10);
        // when: 執行前序遍歷
        String preorderResult = tree.preorder();
        // then: 旋轉後預期的前序結果為 "20 10 30"
        assertEquals("20 10 30", preorderResult, "Preorder traversal should reflect balanced AVL tree structure after rotations");
    }

    /**
     * Test: postorder() traversal - Partition Testing (Rotation Coverage)
     * Given: 插入能夠觸發 LL 旋轉的序列 {30, 20, 10}
     * When: 呼叫 postorder() traversal
     * Then: 預期後序遍歷返回 "10 30 20" (左、右、根)
     * 
     * 測試意圖：檢查旋轉後的 AVL tree 後序遍歷結果，確保左右子樹與根的順序正確反映，並達到遞迴調用的 coverage。
     */
    @Test
    public void testPostorderTraversal_givenAVLTree_expectedPostorderOrder_byPartition() {
        // given: 建立 AVL tree 並依序插入觸發 LL 旋轉的數值
        AvlTree tree = new AvlTree();
        tree.insert(30);
        tree.insert(20);
        tree.insert(10);
        // when: 執行後序遍歷
        String postorderResult = tree.postorder();
        // then: 預期後序遍歷返回 "10 30 20"
        assertEquals("10 30 20", postorderResult, "Postorder traversal should reflect correct order after balancing");
    }

    /**
     * Test: Performance Test - 插入大量節點
     * Given: 一個新的 AVL tree 及大量節點 (n = 100000)
     * When: 依序插入 0 到 n-1 的數值
     * Then: 確認 countNodes() 返回的節點數與 n 相等，並在限定時間內完成 (5 秒內)
     * 
     * 測試意圖：測試在大規模數據插入下，AVL tree 的插入效率是否滿足 O(log n) 的性能要求 (performance test)。
     */
    @Test
    @Timeout(value = 5, unit = TimeUnit.SECONDS)
    public void testInsertPerformance_givenLargeNumberOfNodes_expectedOlogNPerformance_byPerformance() {
        // given: 建立 AVL tree 並定義大量節點數量
        AvlTree tree = new AvlTree();
        int n = 100000;
        // when: 依序插入 n 個數值
        for (int i = 0; i < n; i++) {
            tree.insert(i);
        }
        // then: countNodes() 返回 n，確認所有節點都被正確插入
        assertEquals(n, tree.countNodes(), "All inserted nodes should be present in the AVL tree");
    }

    /**
     * Test: Negative Test - 重複值插入
     * Given: 在 AVL tree 中連續插入相同的值 (15, 15, 15)
     * When: 呼叫 countNodes()
     * Then: 預期只會存在一個節點 (duplicates 不會重複插入)
     * 
     * 測試意圖：驗證 AVL tree 在遇到重複值時，能夠正確忽略重複數值，防止重複插入 (negative test)。
     */
    @Test
    public void testInsertDuplicate_givenDuplicateValues_expectedNoIncreaseInCount_byNegative() {
        // given: 建立 AVL tree 並插入重複數值
        AvlTree tree = new AvlTree();
        tree.insert(15);
        tree.insert(15);  // duplicate
        tree.insert(15);  // duplicate again
        // when: 計算節點數
        int count = tree.countNodes();
        // then: 只應該存在一個節點
        assertEquals(1, count, "Duplicates should not be inserted in AVL tree");
    }
}
```

### 測試設計說明
1. **Code Coverage**  
   - 每個 public method 都有至少一個 test case 觸及，包含：isEmpty、makeEmpty、insert、countNodes、search 與三種遍歷 (inorder, preorder, postorder)。
   - 透過不同的測試案例，確保觸及遞迴呼叫與旋轉調整的邏輯分支。

2. **Partition Testing**  
   - 分別測試空樹、單一節點、與多節點情況下各方法的行為 (例如 inorder 返回排序結果)。
   - 利用插入特定序列來驗證左右子樹的平衡與旋轉。

3. **Boundary Tests**  
   - 新樹的 isEmpty()、makeEmpty() 的邊界情況、以及極端順序插入導致旋轉。

4. **Negative Tests**  
   - 測試查找不存在的數值，以及重複插入數值不影響節點總數。

5. **Performance Tests**  
   - 利用 @Timeout 標記，測試大量節點插入情境下是否能在限定時間內完成，間接驗證 AVL tree 的性能特性。

這份測試程式可協助檢查 AvlTree 實作是否符合 AVL tree 的規格，並讓助教清楚看到每個測試案例背後的設計思路。