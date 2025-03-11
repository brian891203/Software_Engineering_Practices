以下是各個檔案的主要功能與負責內容：
# Source code explaination
* By gpt

1. **linux-sem-handout-english.doc**  
   - 這份文件是作業說明文件，內含作業目標、實驗背景、要求、測試方法與注意事項。它說明了如何利用 semaphore 來同步多個進程，並列出了必須遵守的限制與運行步驟。

2. **awk_sem.h**  
   - 此標頭檔定義了 semaphore 相關函式的原型，包括：  
     - `create_sem()`：創建 semaphore 並初始化其值。  
     - `get_sem()`：根據路徑與識別字元取得已存在的 semaphore。  
     - `P()` 與 `V()`：分別代表 semaphore 的等待（P 操作）與信號（V 操作）。  
     - 另外還有 `destroy_sem()`、`get_blocked_no()` 與 `get_sem_val()`，其中後兩個主要用於除錯。

3. **p1.c**  
   - 此程式是作業中需要完成的三個主要程式之一。  
   - 負責：  
     - 創建 semaphore（初始由 p1 負責創建所有需用到的 semaphore）。
     - 印出 p1 對應的訊息（例如 "P1111111111 is here"）。
     - 並在適當位置加入 P() 與 V() 呼叫以實現同步控制。

4. **p2.c**  
   - 同樣是需要完成的主要程式之一。  
   - 負責：  
     - 透過 `get_sem()` 取得 p1 創建的 semaphore。
     - 印出 p2 對應的訊息（例如 "P222222222 is here"）。
     - 利用 P() 與 V() 操作來配合其他進程的同步要求。

5. **p3.c**  
   - 也是作業中要求完成的程式之一。  
   - 負責：  
     - 同樣從 p1 取得 semaphore。
     - 印出 p3 對應的訊息（例如 "P3333333 is here"），且需印出兩次以符合題目要求。
     - 透過正確的 P() 與 V() 操作實現與 p1、p2 的協調。

6. **prog1.c**  
   - 此程式是範例程式，示範如何使用 semaphore API。  
   - 負責：  
     - 使用 `create_sem()` 建立一個 semaphore，其初始值設為 0。
     - 呼叫 P() 使進程進入等待狀態，等待其他程式（例如 prog2）釋放 semaphore 後再繼續執行。
     - 範例中也包含了如何利用 `destroy_sem()` 清除 semaphore 的示意（雖然最終沒有啟用）。

7. **prog2.c**  
   - 與 prog1.c 配對的範例程式。  
   - 負責：  
     - 透過 `get_sem()` 取得由 prog1 創建的 semaphore。
     - 呼叫 V() 來釋放 semaphore，喚醒因 P() 而阻塞的 prog1。
     - 程式中也利用 `get_blocked_no()` 與 `get_sem_val()` 示範如何查看 semaphore 的狀態。

8. **sem.c**  
   - 此檔案提供了 semaphore 操作的具體實作。  
   - 包含：  
     - `create_sem()` 與 `get_sem()` 的實作，分別用於建立與取得 semaphore。
     - 實作 P() 與 V() 操作的內部呼叫，封裝了 Linux 系統呼叫 `semop()`。
     - 還包含了 `destroy_sem()`、`get_blocked_no()` 與 `get_sem_val()`，用於刪除 semaphore與查詢 semaphore 狀態，這兩個輔助函式主要用於除錯，但在最終提交的作業中不允許使用。

每個檔案的分工使得整個作業的結構清晰：範例程式提供了 semaphore 使用的基本示範，而 p1.c、p2.c、p3.c 則是你需要依照要求完成的同步任務，而 sem.c 與 awk_sem.h 則提供了底層的 semaphore 操作函式。