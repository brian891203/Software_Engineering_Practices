#!/bin/bash
# Automatically clear previous semaphores, kill any failing processes,
# and compile p1.c, p2.c, and p3.c

echo "=== Killing old processes (p1, p2, p3) ==="
# Use pkill to terminate background processes matching the patterns
pkill -f p1 2>/dev/null
pkill -f p2 2>/dev/null
pkill -f p3 2>/dev/null

# Pause briefly to allow the system to finish terminating the processes
sleep 1

echo "=== Clearing semaphores owned by user $USER ==="
# List semaphores using ipcs -s and use awk to extract the semaphore IDs owned by the current user
SEM_IDS=$(ipcs -s | awk -v user="$USER" '$3==user {print $2}')
if [ -z "$SEM_IDS" ]; then
    echo "No semaphores found to clear."
else
    for id in $SEM_IDS; do
        echo "Removing semaphore with ID: $id"
        ipcrm -s $id
    done
fi

echo "=== Compiling programs ==="
# Compile p1.c, p2.c, and p3.c and link with sem.c, outputting executables to ../bin/
gcc -o ../bin/p1 p1.c sem.c && echo "p1 compiled successfully" || { echo "p1 compilation failed"; exit 1; }
gcc -o ../bin/p2 p2.c sem.c && echo "p2 compiled successfully" || { echo "p2 compilation failed"; exit 1; }
gcc -o ../bin/p3 p3.c sem.c && echo "p3 compiled successfully" || { echo "p3 compilation failed"; exit 1; }

echo "=== All tasks completed ==="
