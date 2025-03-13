# Makefile

# For closing the compiled warnings
CFLAGS = -w

# 定義 .PHONY 目標，確保這些目標不會與實際檔案衝突
.PHONY: all test clean order1 order2 order3 order4 order5 order6 

# ========== Compile part ==========
# all 目標用來編譯所有程式
all: bin/p1 bin/p2 bin/p3

# 建立輸出目錄並編譯 p1
bin/p1: src/p1.c src/sem.c src/awk_sem.h
	@mkdir -p bin
	gcc $(CFLAGS) -o bin/p1 src/p1.c src/sem.c

# 編譯 p2
bin/p2: src/p2.c src/sem.c src/awk_sem.h
	@mkdir -p bin
	gcc $(CFLAGS) -o bin/p2 src/p2.c src/sem.c

# 編譯 p3
bin/p3: src/p3.c src/sem.c src/awk_sem.h
	@mkdir -p bin
	gcc $(CFLAGS) -o bin/p3 src/p3.c src/sem.c


# ========== Testing part ==========
# test default order p1 -> p2 -> p3
test: all
	@echo "Running test: p1 -> p2 -> p3"
	./bin/p1 & ./bin/p2 & ./bin/p3 &
	@sleep 3
	@echo "Killing running processes..."
	@pkill -f p1; pkill -f p2; pkill -f p3

# order1: p1 -> p2 -> p3
order1: all
	@echo "Testing order: p1 -> p2 -> p3"
	./bin/p1 & ./bin/p2 & ./bin/p3 &
	@sleep 3
	@pkill -f p1; pkill -f p2; pkill -f p3

# order2: p3 -> p2 -> p1
order2: all
	@echo "Testing order: p3 -> p2 -> p1"
	./bin/p3 & ./bin/p2 & ./bin/p1 &
	@sleep 3
	@pkill -f p1; pkill -f p2; pkill -f p3

# order3: p1 -> p3 -> p2
order3: all
	@echo "Testing order: p1 -> p3 -> p2"
	./bin/p1 & ./bin/p3 & ./bin/p2 &
	@sleep 3
	@pkill -f p1; pkill -f p2; pkill -f p3

# order4: p2 -> p1 -> p3
order4: all
	@echo "Testing order: p2 -> p1 -> p3"
	./bin/p2 & ./bin/p1 & ./bin/p3 &
	@sleep 3
	@pkill -f p1; pkill -f p2; pkill -f p3

# order5: p2 -> p3 -> p1
order5: all
	@echo "Testing order: p2 -> p3 -> p1"
	./bin/p2 & ./bin/p3 & ./bin/p1 &
	@sleep 3
	@pkill -f p1; pkill -f p2; pkill -f p3

# order6: p3 -> p1 -> p2
order6: all
	@echo "Testing order: p3 -> p1 -> p2"
	./bin/p3 & ./bin/p1 & ./bin/p2 &
	@sleep 3
	@pkill -f p1; pkill -f p2; pkill -f p3

# clean 目標用來清除編譯產物
clean:
	rm -rf bin
