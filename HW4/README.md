# HW4 Process Synchronization
## Enviroment
* 20.04.6 LTS

## How to Use?
1. execute script to setup and check compiled environment and then compile the files in `./src`.
    ``` bash
    sh build.sh
    ```

2. execute the `p1`, `p2`, `p3` in different order at background.
    * For example:
        ``` bash
        ./bin/p1 & ./bin/p2 & ./bin/p3 &
        #./bin/p1 & ./bin/p3 & ./bin/p2 &
        #./bin/p2 & ./bin/p1 & ./bin/p3 &
        #./bin/p2 & ./bin/p3 & ./bin/p1 &
        #./bin/p3 & ./bin/p1 & ./bin/p2 &
        #./bin/p3 & ./bin/p2 & ./bin/p1 &
        ```
    * The output result will always be like:
        ```
        P1111111111 is here
        P222222222 is here
        P3333333 is here
        P3333333 is here
        P1111111111 is here
        P222222222 is here
        P3333333 is here
        P3333333 is here
        P1111111111 is here
        P222222222 is here
        P3333333 is here
        P3333333 is here
        P1111111111 is here
        P222222222 is here
        P3333333 is here
        P3333333 is here
        ...
        ```
    * The semaphore ID will be removed automatically.