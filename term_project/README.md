# SEP Term Project
* 2025 NCU Software Engineering Practices
* SUT : https://github.com/RogelioKG/Duel-Master
## Demo
[![Watch the video](https://img.youtube.com/vi/p3dNXhsoRhc/0.jpg)](https://youtu.be/p3dNXhsoRhc)

## Abstract
By githib webhook to trigger Jenkins testing server to do the pipeline jobs of the auto-testing works.

Testing procedure:
1. Github webhook will sent a HTTP post to the jenkins server when a new (commit or push event) occur.
   * Utilize `MS devtunnel` to expose localhost:8080 as a publicly accessible URL, since the Jenkins server is deployed on it.
2. By Jenkins Github plugin, Jenkins Job uses GitSCM to checkout specified repo & branch and pull the latest version to dev & prod server.
3. Jenkins Job launches the system(backend & frontend) from the pulled src.
4. Jenkins Job uses scripts to execute the testing cases with Robotiive(Auto-testing software based on CV).
5. Report the testing result to the related commit via GitHub Commit Status API.
6. Shut down the backend service and finish the test.

## Testing procedures
### Auto-Testing Pipeline Overview

This pipeline leverages a GitHub webhook to automatically trigger a Jenkins testing server that runs a series of pipeline jobs for automated testing. The overall process includes pulling the latest source code, launching the backend and frontend systems, executing test cases via the Robotiive auto-testing software (based on computer vision), updating the commit status on GitHub via the Commit Status API, and finally shutting down the backend service.

### Testing Procedure

1. **Webhook Trigger**  
   - When a new commit or push event occurs in the GitHub repository, a webhook sends an HTTP POST notification to the Jenkins server.
   - The GitHub webhook is configured in the repository settings, with the payload URL pointing to your Jenkins server (e.g., `http://<jenkins-server>:8080/github-webhook/`). The webhook payload contains details such as the commit SHA, branch name, repository information, and the list of commits.

2. **SCM Checkout**  
   - Using the Jenkins GitHub Plugin and GitSCM, the Jenkins job automatically checks out the specified repository and branch. This ensures that the latest source code is pulled into the Jenkins workspace.
   - When the checkout step runs, the Git plugin sets several environment variables (like `GIT_COMMIT`, `GIT_BRANCH`, and `BUILD_URL`), which are later used in the pipeline for reporting and status updates.

3. **Launching the System (Backend & Frontend)**  
   - After the source code is pulled, the Jenkins job launches the system components:
     - **Backend Service:** A separate Jenkins job (e.g., "SEP114-term_project_Backend-hookUpdate") is triggered to start the backend service.
     - **Frontend Service:** The job then updates the frontend dependencies (using `npm install`) and starts the frontend service (using `npm run dev`), typically in the background so that the pipeline does not block.

4. **Executing Automated Tests**  
   - With the system up and running, the pipeline executes automated test cases using a testing script that invokes the Robotiive auto-testing software. This software, based on computer vision techniques, runs predefined test cases (e.g., Task2, Task3, Task6) and logs any errors to a file (e.g., `errorlog.txt`).

5. **Updating Commit Status via GitHub Commit Status API**  
   - Once tests complete, the pipeline reads the contents of `errorlog.txt` (if it exists) to determine whether the tests passed or failed.
   - Based on this result:
     - If no errors are found, the pipeline sets the commit status to "success" with a descriptive message.
     - If errors are present, it sets the status to "failure" and includes details in the description.
   - This is done by constructing a JSON payload (which includes fields such as `state`, `target_url`, `description`, and `context`) and sending it via `curl` to GitHub's Commit Status API endpoint. The commit SHA used for the update is obtained from the environment variable (e.g., `GIT_COMMIT`).

6. **Automatically Creating an Issue (On Test Failure)**  
   - If `errorlog.txt` contains error messages (indicating test failures), the pipeline also constructs a JSON payload to automatically create a GitHub issue.
   - This payload includes a title and body (with the error log details) and is sent via `curl` to GitHub's Issues API, allowing developers to review the failure details directly on GitHub.

7. **Shutting Down the Backend Service**  
   - Finally, regardless of the test outcome, the pipeline triggers a separate Jenkins job (e.g., "SEP114-term_project_Backend-Shutdown") to shut down the backend service, ensuring that the testing environment is properly cleaned up.
   
8. **Cleanup**  
   - The pipeline cleans up by deleting `errorlog.txt` at the end of the process, ensuring that each run starts with a clean slate.

### Key Configuration

- **SCM Configuration:**  
  Ensure your Jenkins job is configured to use GitSCM (or Multibranch Pipeline) so that the latest code is pulled automatically, and important environment variables (such as `GIT_COMMIT`) are set.

- **Webhook Setup:**  
  In your GitHub repository settings, configure a webhook with:
  - **Payload URL:** The URL of your Jenkins server’s webhook endpoint (e.g., `http://<jenkins-server>:8080/github-webhook/`).
  - **Content Type:** `application/json`
  - **Trigger Events:** Typically push events (and others if needed).

- **GitHub API Authentication:**  
  Create a GitHub Personal Access Token (PAT) with the minimal necessary scopes:
  - For public repositories: **public_repo**
  - For private repositories: **repo**
  These permissions allow the PAT to update commit statuses and create issues. Store the PAT in Jenkins using the Credentials plugin (with an ID like `GITHUB_TOKEN`) and reference it in your pipeline.

- **Error Handling and Reporting:**  
  The pipeline uses Groovy’s JsonOutput to generate JSON payloads for the Commit Status API and Issues API, ensuring proper escaping of special characters.
  
- **Deployment and Service Management:**  
  The backend and frontend services are started using separate jobs or background execution (e.g., with `start "FrontendService" /B cmd /c "npm run dev"`), and the testing job triggers these and later shuts down the backend via another Jenkins job.


## Github webhook trigger jenkins
* 使用 MS devtunnel 去將 localhost 8080 port mapping 到一個 public url
    ``` bash
    winget install Microsoft.devtunnel

    devtunnel user login

    # Start a http server on port 8080
    devtunnel echo http -p 8080
    # Tunnel port 8080
    devtunnel host -p 8080
    # allow anonymous
    devtunnel host -p 8080 -a
    ```
* Jenkins Checks API GitHub Personal Access Token (PAT):
    ```
    ************************************
    ```
* Github plugin 會將指定的 repo pull 到 `C:\Users\User\.jenkins\workspace` 中，並根據 Job name 去建立對應的 folder

## Jenkins testing scripts
* Record
    ``` groovy script
    // v1:
    pipeline {
        agent any

        triggers {
            githubPush()
        }

        stages {
            stage('收到 webhook') {
                steps {
                    echo '【收到 webhook】從 GitHub 拉取最新程式碼'
                    // 從 GitHub 拉取最新程式碼，此處指定分支與儲存庫 URL
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[url: 'https://github.com/brian891203/Duel-Master.git/']]
                    ])
                }
            }

            stage('啟動後端') {
                steps {
                    echo '【啟動後端】開始啟動後端服務...'
                    // 替換為你的後端啟動命令
                    bat 'start "" /B cmd /c "cd /d C:\\Users\\User\\.jenkins\\workspace\\SEP114-term_project_pipeline\\backend && scripts\\run-backend-pip.bat"'
                }
            }

            // stage('啟動前端') {
            //     steps {
            //         echo '【啟動前端】開始啟動前端服務...'
            //         // 替換為你的前端啟動命令
            //         bat 'cd /d C:\\Users\\User\\.jenkins\\workspace\\SEP114-term_project_pipeline\\frontend && npm install && npm run dev'
            //     }
            // }
        }

        post {
            success {
                echo 'Pipeline 建置成功！'
            }
            failure {
                echo 'Pipeline 建置失敗！'
            }
        }
    }
    ```

    ``` groovy script
    // v2
    // 使用 Groovy 的 JsonOutput 產生 JSON payload
    import groovy.json.JsonOutput

    pipeline {
        agent any
        
        environment {
            // 從 Jenkins 憑證中讀取 GitHub Token
            GITHUB_TOKEN = credentials('GITHUB_TOKEN')
        }

        triggers {
            githubPush()
        }

        stages {
            // stage('收到 webhook') {
            //     steps {
            //         echo '【收到 webhook】收到通知，不執行程式碼拉取，直接執行後續流程'
            //     }
            // }
            
            stage('收到 webhook') {
                steps {
                    echo '【收到 webhook】從 GitHub 拉取最新程式碼'
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[url: 'https://github.com/brian891203/Duel-Master.git/']]
                    ])
                }
            }
            
            stage('啟動後端服務') {
                steps {
                    echo '【啟動後端】觸發啟動後端服務 Job...'
                    // 觸發名為 "Backend-Shutdown" 的 Jenkins Job
                    // wait: true 代表等待該 Job 完成，再繼續後續流程
                    build job: 'SEP114-term_project_Backend-hookUpdate', wait: false
                    
                    echo '等待後端開啟...'  
                    bat 'ping -n 21 127.0.0.1 > nul'
                }
            }
            
            stage('npm Update') {
                steps {
                    echo '【啟動前端】npm Update...'
                    bat '''
                        cd /d C:\\Users\\User\\.jenkins\\workspace\\SEP114-term_project_pipeline\\frontend
                        npm install
                    '''
                    
                    echo 'Wait for 10 sec...'
                    bat 'ping -n 11 127.0.0.1 > nul'
                }
            }

            stage('啟動前端服務') {
                steps {
                    echo '【啟動前端】開始啟動前端服務...'
                    bat '''
                        cd /d C:\\Users\\User\\.jenkins\\workspace\\SEP114-term_project_pipeline\\frontend
                        start "FrontendService" /B cmd /c "npm run dev"
                    '''
                    
                    echo 'Wait for 10 sec...'
                    bat 'ping -n 11 127.0.0.1 > nul'
                }
            }

            stage('執行測試') {
                steps {
                    echo '【測試】執行自動測試任務...'
                    // 這裡執行原始批次邏輯，依序執行每個任務
                    bat '''
                        @echo off
                        cd "C:\\Users\\User\\Desktop\\SEP\\Lab2_Auto-testing"
                        set tasks=Task2
                        for %%T in (%tasks%) do (
                            echo Running task %%T...
                            start http://localhost:5173
                            Robotiive_runner.exe SEP_term_project %%T 2>&1
                        )
                    '''
                }
            }
        }

        post {
            always {
                echo '【關閉後端】不論流程結果，開始關閉後端服務...'
                // 觸發後端關閉 Job (請根據實際 Job 名稱修改)
                build job: 'SEP114-term_project_Backend-Shutdown', wait: false
                echo '所有流程已完成。'
            }
        }
    }
    ```

    ``` groovy script
    // v3(Final version)
    // 使用 Groovy 的 JsonOutput 產生 JSON payload
    import groovy.json.JsonOutput

    pipeline {
        agent any
        
        environment {
            // 從 Jenkins 憑證中讀取 GitHub Token
            GITHUB_TOKEN = credentials('GITHUB_TOKEN')
        }

        triggers {
            githubPush()
        }

        stages {
            stage('收到 webhook') {
                steps {
                    echo '【收到 webhook】從 GitHub 拉取最新程式碼'                    
                    script {
                        def scmVars = checkout([
                            $class: 'GitSCM',
                            branches: [[name: '*/main']],
                            userRemoteConfigs: [[url: 'https://github.com/brian891203/Duel-Master.git/']]
                        ])
                        echo "Commit SHA: ${scmVars.GIT_COMMIT}"
                        env.GIT_COMMIT = scmVars.GIT_COMMIT
                    }
                }
            }
            
            stage('啟動後端服務') {
                steps {
                    echo '【啟動後端】觸發啟動後端服務 Job...'
                    // 觸發 "Backend-hookUpdate" 的 Jenkins Job
                    // wait: false 代表不必等待該 Job 完成，繼續後續流程
                    build job: 'SEP114-term_project_Backend-hookUpdate', wait: false
                    
                    echo '等待後端開啟...'
                    // 以下可以達到等待 10 秒的效果
                    echo 'Wait for 10 sec...'
                    bat 'ping -n 21 127.0.0.1 > nul'
                }
            }
            
            stage('npm Update') {
                steps {
                    echo '【啟動前端】npm Update...'
                    bat '''
                        cd /d C:\\Users\\User\\.jenkins\\workspace\\SEP114-term_project_pipeline\\frontend
                        npm install
                    '''
                    
                    echo 'Wait for 10 sec...'
                    bat 'ping -n 11 127.0.0.1 > nul'
                }
            }

            stage('啟動前端服務') {
                steps {
                    echo '【啟動前端】開始啟動前端服務...'
                    bat '''
                        cd /d C:\\Users\\User\\.jenkins\\workspace\\SEP114-term_project_pipeline\\frontend
                        start "FrontendService" /B cmd /c "npm run dev"
                    '''
                    
                    echo 'Wait for 10 sec...'
                    bat 'ping -n 11 127.0.0.1 > nul'
                }
            }

            stage('執行測試') {
                steps {
                    echo '【測試】執行自動測試任務...'
                    // 執行批次測試(Robotiive test case)邏輯
                    bat '''
                        @echo off
                        cd "C:\\Users\\User\\Desktop\\SEP\\Lab2_Auto-testing"
                        set tasks=Task2 Task3 Task6
                        for %%T in (%tasks%) do (
                            echo Running task %%T...
                            start http://localhost:5173
                            Robotiive_runner.exe SEP_term_project %%T 2>&1
                        )
                    '''
                }
            }
        }

        post {
            always {
                script {
                    echo '【報告】開始回報檢查記錄與 Issue...'
                    // 切換工作目錄到指定路徑
                    dir("C:\\Users\\User\\.jenkins\\workspace\\SEP114-term_project_pipeline") {
                        // 讀取 errorlog.txt 的內容
                        def errorContent = ""
                        if (fileExists("errorlog.txt")) {
                            errorContent = readFile('errorlog.txt').trim()
                        }
                        
                        // 取得當前 commit SHA，若未定義則設為 "unknown"
                        def commitSha = env.GIT_COMMIT ?: "unknown"
                        
                        // 根據是否有錯誤內容決定狀態與描述
                        def state = errorContent ? "failure" : "success"
                        def description = errorContent ? "自動化測試失敗，請檢查 errorlog.txt" : "自動化測試成功"
                        def targetUrl = env.BUILD_URL ?: ""
                        def context = "jenkins/ci"
                        
                        // 使用 Groovy 的 JsonOutput 產生 JSON payload
                        def payload = groovy.json.JsonOutput.toJson([
                            state       : state,
                            target_url  : targetUrl,
                            description : description,
                            context     : context
                        ])
                        
                        echo "Commit Status Payload: ${payload}"
                        
                        // 將 payload 寫入檔案
                        writeFile file: 'commitStatusPayload.json', text: payload
                        
                        // 組合 URL 以更新 commit 狀態
                        def commitStatusUrl = "https://api.github.com/repos/brian891203/Duel-Master/statuses/${commitSha}"
                        echo "Commit Status URL: ${commitStatusUrl}"
                        
                        // 使用 bat 執行 curl.exe 呼叫 GitHub Commit Status API 更新狀態
                        bat "curl.exe -s -H \"Authorization: token %GITHUB_TOKEN%\" -H \"Content-Type: application/json\" -X POST -d @commitStatusPayload.json ${commitStatusUrl}"
                        
                        // 如果有錯誤內容，則建立 Issue；否則跳過
                        if (errorContent) {
                            def issuePayload = groovy.json.JsonOutput.toJson([
                                title: "自動化測試失敗 - 請檢查 errorlog.txt",
                                body : "測試失敗，以下是錯誤日誌內容：\n\n" + errorContent
                            ])
                            
                            echo "Issue Payload: ${issuePayload}"
                            
                            writeFile file: 'issuePayload.json', text: issuePayload
                            
                            bat 'curl.exe -s -H "Authorization: token %GITHUB_TOKEN%" -H "Content-Type: application/json" -X POST -d @issuePayload.json https://api.github.com/repos/brian891203/Duel-Master/issues'
                        } else {
                            echo "測試成功，無錯誤日誌，跳過建立 Issue。"
                        }
                        
                        // 清理 errorlog.txt
                        bat 'if exist errorlog.txt del errorlog.txt'
                    }
                    
                    echo '【關閉後端】開始關閉後端服務...'
                    // 觸發後端關閉 Job (請根據實際 Job 名稱修改)
                    build job: 'SEP114-term_project_Backend-Shutdown', wait: false
                    echo '所有流程已完成。'
                }
            }
        }
    }
    ```