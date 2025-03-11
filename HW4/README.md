# HW4
## Enviroment
* 20.04.6 LTS (Desktop version)

## Show the os version
``` bash
cat /etc/os-release
```

## Important point of caution !!!
* 為了達成這樣的同步，請在p1.c p2.c p3.c 加入適當的P(),V() 來進行同步。
切記，你只能用semaphore來達到目標。例如你不能新增一個 printf 來讓 p3 多輸出一行。在printf 的前面以及後面，你只能用semaphore指令 P()，V()。
* 實驗失敗的process 記得要 Kill 掉，以免嚴重影響系統效能
    * Steps:

        1. 查看正在執行的進程: 輸入以下命令，可以列出所有正在執行的進程，然後用 grep 篩選出你感興趣的程式
            ``` perl
            ps aux | grep prog1
            ps aux | grep p1
            ```
            使用 jobs 命令（如果是在背景啟動的 shell 中）：
            ``` bash
            jobs
            ```

        2. 殺掉失敗的進程: 當你找到了失敗進程的 PID 之後，可以使用以下命令來終止進程
            ``` bash
            kill <PID>

            # 以下會發送 SIGKILL 信號，強制終止進程，但注意這種方式可能不會讓進程進行資源釋放，所以只在必要時使用
            # kill -9 <PID>
            ```
            這個命令會發送一個 SIGTERM 信號，要求進程正常結束。

        3. 再次使用 `ps aux | grep [程式名稱]` 檢查是否確實已經終止，也可以使用 `jobs` 命令查看背景工作是否已被清空。


* 執行你的程式之前,記得用ipcrm 確定清除你之前的程式配置的任何 semaphore
    ``` nginx
    ipcs -s           # 查看當前系統中的 semaphore 資源
    ipcrm -s [semid]  # 根據 semaphore ID 清除指定的 semaphore
    ```

## HW RUN steps
1. Compile source code
    * 根據作業要求，p1.c 為負責創建 semaphore 的程式，因此需要先編譯 p1.c
        ``` nginx
        # gcc -o 輸出路徑前綴/輸出檔名 prog1.c sem.c
        # e.g., gcc -o ../bin/prog1 prog1.c sem.c
        # gcc -o ../bin/prog2 prog2.c sem.c

        # gcc -o p1 p1.c sem.c
        gcc -o bin/p1 p1.c sem.c
        ```
    * 同樣 p2.c 與 p3.c 需編譯成執行檔
        ``` nginx
        gcc -o p2 p2.c sem.c
        gcc -o p3 p3.c sem.c
        ```

2. 清除先前的 semaphore 資源以及失敗的進程
    * 在執行新一輪測試前，必須先用以下命令清除先前遺留的 semaphore，此步驟能確保新測試環境不受舊有資源干擾。
        ``` nginx
        ipcs -s         # 列出目前系統中的 semaphore 資源
        ipcrm -s [semid]  # 根據列出的 semaphore ID 清除相應資源
        ```
    * 殺掉失敗的進程: 當你找到了失敗進程的 PID 之後，可以使用以下命令來終止進程
        1. 找到失敗進程
            ``` perl
            ps aux | grep prog1
            ps aux | grep p1
            ```
            使用 jobs 命令（如果是在背景啟動的 shell 中）：
            ``` bash
            jobs
            ```
        2. 殺掉失敗的進程
            ``` bash
            kill <PID>
            ```
        3. 再次使用 `ps aux | grep [程式名稱]` 檢查是否確實已經終止，也可以使用 `jobs` 命令查看背景工作是否已被清空。

3. 啟動程式
    * 依照要求，啟動程式的順序可能不固定，但必須達到預期同步效果：
        * p1：作為 semaphore 的創建者，負責初始化 semaphore 並印出第一行訊息。
        * p2：使用 get_sem() 取得 p1 創建的 semaphore，等待 p1 完成後再印出訊息。
        * p3：同樣取得 semaphore，等待 p2 完成後印出兩行訊息。
    * 在 Linux shell 中依次以背景模式執行
        ``` bash
        ./p1 &
        ./p2 &
        ./p3 &
        ```
        即使執行順序不同（如 p1、p3、p2），程式必須藉由 semaphore 協調，最終輸出順序都應該是：
        ```
        p1印一行訊息 → p2印一行訊息 → p3印兩行訊息
        ```
        並不斷循環。

4. 監控與調整
    在執行期間，可使用 `ipcs -s` 檢查 `semaphore` 狀態，也可使用 `ps` 或 `jobs` 監控各個程式進程。
    如果發現有程式一直處於阻塞狀態或無法正常退出，請參考前述步驟手動 kill 掉相關進程，再重新開始測試。
