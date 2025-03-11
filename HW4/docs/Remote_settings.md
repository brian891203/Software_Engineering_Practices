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
