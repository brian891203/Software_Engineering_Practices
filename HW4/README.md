# HW4
## Enviroment
* 20.04.6 LTS (Desktop version)

## Show the os version
``` bash
cat /etc/os-release
```

## Remote setup for connecting to vm via ssh in VScode
* vm connection setting is `NAT`
* `[STEP1]` vm connecting settings bash(SSH and firewall)
``` bash
# setup_ssh.sh
#!/bin/bash

# 更新系統套件
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 安裝 OpenSSH 伺服器
echo "Installing OpenSSH Server..."
sudo apt install -y openssh-server

# 啟動並啟用 SSH 服務
echo "Starting and enabling SSH service..."
sudo systemctl start ssh
sudo systemctl enable ssh

# 檢查 SSH 服務狀態
echo "Checking SSH service status..."
sudo systemctl status ssh | grep "active (running)" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "SSH service is running."
else
    echo "SSH service failed to start."
    exit 1
fi

# 設定防火牆允許 SSH 連線
echo "Configuring firewall to allow SSH..."
sudo ufw allow ssh
sudo ufw reload

# 確認防火牆設定
echo "Checking firewall status..."
sudo ufw status | grep "22/tcp" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "Firewall is configured to allow SSH."
else
    echo "Failed to configure firewall for SSH."
    exit 1
fi
```

* `[STEP2]` show the vm ip, and you can connect it by the host
``` bash
ip addr show
```

## Download git on your server
``` bash
sudo apt update
sudo apt install -y git
git --version
```

## git user setting
``` git bash
git config --global user.email "your_email@example.com"
git config --global user.name "Your Name"

git config --global user.email "brian891203@gmail.com"
git config --global user.name "Brian"
```

# HW4 content
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