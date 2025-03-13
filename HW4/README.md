# HW4 Process Synchronization
## Enviroment
* 20.04.6 LTS

## How to Use?
1. execute script to setup and check compiled environment and then compile the files in `./src`.
    ``` bash
    sh build.sh
    ```

2. execute script to test the `p1` `p2` `p3` in differnt order.
    * For example:
        ``` bash
        sh run.sh
        ```
    * The output result will always be like:
        ```
        Select execution order to test (or 'q' to quit):
        1) Order: p1 -> p2 -> p3
        2) Order: p3 -> p2 -> p1
        3) Order: p1 -> p3 -> p2
        4) Order: p2 -> p1 -> p3
        5) Order: p2 -> p3 -> p1
        6) Order: p3 -> p1 -> p2
        Enter choice (1-6 or q to quit): 6
        Running order6 (p3 -> p1 -> p2)...
        Testing order: p3 -> p1 -> p2
        ./bin/p3 & ./bin/p1 & ./bin/p2 &
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