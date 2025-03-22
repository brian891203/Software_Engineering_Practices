import { BookDataBaseService } from "@externals/simple-db";
import { TestBookInfo } from "../__test__/TestingData";
import { HashGenerator } from "../utils/HashGenerator";
import { DataBaseSystem } from "./DataBaseSystem";

// 建立 BookDataBaseService 的 stub
const createBookDataBaseServiceStub = () => {
    return {
        // 模擬連線：預設回傳成功訊息，亦可依測試需求改寫
        setUp: jest.fn(),
        // 模擬取得書籍：回傳固定資料陣列
        getBooks: jest.fn(),
        // 模擬新增書籍
        addBook: jest.fn(),
        // 模擬刪除書籍
        deleteBook: jest.fn(),
    } as unknown as BookDataBaseService;
};

// 建立 HashGenerator 的 stub
const createHashGeneratorStub = () => {
    return {
        // 模擬產生 ISBN 的方法，回傳固定的 ISBN 字串
        simpleISBN: jest.fn(),
    } as unknown as HashGenerator;
};

describe("DataBaseSystem Test", () => {
    let dbStub: BookDataBaseService;
    let hashGenStub: HashGenerator;
    let dataBaseSystem: DataBaseSystem;
    let bookData: any[];

    beforeEach(() => {
        // 建立 stub 實例
        dbStub = createBookDataBaseServiceStub();
        hashGenStub = createHashGeneratorStub();
        // 建立 DataBaseSystem，使用依賴注入方式傳入 stub
        dataBaseSystem = new DataBaseSystem(dbStub, hashGenStub);
        // 建立一組測試 BookInfo 資料
        bookData = TestBookInfo;
    });

    describe("DataBaseSystem Constructor", () => {
        it("should use provided dependencies if given", () => {
        // 使用 stub（或 mock）建立假依賴
        const dbStub = {} as BookDataBaseService;
        const hashStub = {} as HashGenerator;
        const system = new DataBaseSystem(dbStub, hashStub);
    
        // 驗證傳入的依賴有被正確設定
        expect(system.db).toBe(dbStub);
        expect(system.hashGenerator).toBe(hashStub);
        });
    });

    describe("connectDB method", () => {
        it("should connect to DB successfully on first try", async () => {
            // 模擬 setUp 成功，並模擬取得書籍資料
            (dbStub.setUp as jest.Mock).mockResolvedValue("Connected");
            (dbStub.getBooks as jest.Mock).mockResolvedValue(bookData);

            const result = await dataBaseSystem.connectDB();

            // 驗證回傳結果與與資料庫互動
            expect(result).toBe("Connected");
            expect(dbStub.setUp).toHaveBeenCalledWith("http://localhost", 4000);
            expect(dbStub.getBooks).toHaveBeenCalled();
            expect(dataBaseSystem.getItems()).toEqual(bookData);
        });

        it("should retry connecting and throw error after exceeding retryTimes", async () => {
            // 模擬 setUp 每次都失敗
            (dbStub.setUp as jest.Mock).mockRejectedValue(new Error("Connection failed"));

            // 注意：為了測試重試機制，不需要模擬 getBooks 的行為

            // 由於 retryDelay 會 delay 500ms，每次測試會略微延遲
            await expect(dataBaseSystem.connectDB()).rejects.toThrow("Cannnot connect to DB");
            // 檢查 setUp 至少被呼叫 DataBaseSystem.retryTimes 次
            expect((dbStub.setUp as jest.Mock).mock.calls.length).toBe(DataBaseSystem.retryTimes);
        });
    });

    describe("addBook method", () => {
        it("should add a new book successfully", async () => {
            // 設定有效輸入
            const title = "New Book";
            const author = "New Author";
            // 模擬 hashGenerator.simpleISBN 回傳固定 ISBN
            (hashGenStub.simpleISBN as jest.Mock).mockReturnValue("ISBN123");
            // 模擬 db.addBook 成功執行
            (dbStub.addBook as jest.Mock).mockResolvedValue(undefined);

            await dataBaseSystem.addBook(title, author);

            // 驗證 hashGenerator 與 db.addBook 的互動
            expect(hashGenStub.simpleISBN).toHaveBeenCalledWith("000-00-00000-00-0");
            expect(dbStub.addBook).toHaveBeenCalledWith({
                ISBN: "ISBN123",
                title,
                author,
            });
        });

        it("should throw error when title or author is missing", async () => {
            // 模擬情境：缺少 title 或 author
            await expect(dataBaseSystem.addBook("", "Some Author")).rejects.toThrow("Add book failed");
            await expect(dataBaseSystem.addBook("Some Title", "")).rejects.toThrow("Add book failed");
        });
    });

    describe("deleteBook method", () => {
        it("should delete a book successfully", async () => {
            // 模擬 db.deleteBook 成功
            (dbStub.deleteBook as jest.Mock).mockResolvedValue(undefined);
            const isbn = "ISBN123";

            await dataBaseSystem.deleteBook(isbn);
            expect(dbStub.deleteBook).toHaveBeenCalledWith(isbn);
            });

            it("should throw error when ISBN is empty", async () => {
            await expect(dataBaseSystem.deleteBook("")).rejects.toThrow("Delete book failed");
        });
    });

    describe("process method", () => {
        it("should update items with books from db", async () => {
            (dbStub.getBooks as jest.Mock).mockResolvedValue(bookData);
            await dataBaseSystem.process([]);
            expect(dbStub.getBooks).toHaveBeenCalled();
            expect(dataBaseSystem.getItems()).toEqual(bookData);
        });

        // it("should do nothing when db.getBooks throws error", async () => {
        //   (dbStub.getBooks as jest.Mock).mockRejectedValue(new Error("DB Error"));
        //   await dataBaseSystem.process([]);
        //   // 當 db.getBooks 拋錯，items 應該不變（仍為 bookData）
        //   expect(dataBaseSystem.getItems()).toEqual(bookData);
        // });
    });
});
