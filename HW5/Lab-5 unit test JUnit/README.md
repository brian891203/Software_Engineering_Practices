# HW5: unit test for AVL tree
## JUnit5 Basic Intro
JUnit 5 基本測試 annotation 及使用範例：
---

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