import { BookDataBaseService } from "@externals/simple-db";
import { TestBookInfo } from "../__test__/TestingData";
import { HashGenerator } from "../utils/HashGenerator";
import { DataBaseSystem } from "./DataBaseSystem";

// 建立 BookDataBaseService 的 stub
const createBookDataBaseServiceStub = () => {
    return {
        setUp: jest.fn(),
        getBooks: jest.fn(),
        addBook: jest.fn(),
        deleteBook: jest.fn(),
    } as unknown as BookDataBaseService;
};
jest.mock("@externals/simple-db");

// 建立 HashGenerator 的 AutoMock
jest.mock("../utils/HashGenerator");

describe("DataBaseSystem Test", () => {
    let dbStub: BookDataBaseService;
    let MockedHashGen: HashGenerator;
    let dataBaseSystem: DataBaseSystem;
    let bookData: any[];

    beforeEach(() => {
        dbStub = createBookDataBaseServiceStub();
        MockedHashGen = new HashGenerator();
        dataBaseSystem = new DataBaseSystem(dbStub, MockedHashGen);
        bookData = TestBookInfo;
    });

    describe("DataBaseSystem Constructor", () => {
        it("should use provided dependencies if given", () => {
            const system = new DataBaseSystem(dbStub, MockedHashGen);

            expect(system.db).toBe(dbStub);
            expect(system.hashGenerator).toBe(MockedHashGen);
        });

        it("should new dependencies in constructor if dependencies is not given", () => {
            const system = new DataBaseSystem();

            expect(system.db).toBeInstanceOf(BookDataBaseService);
            expect(system.hashGenerator).toBeInstanceOf(HashGenerator);
        });
    });

    describe("connectDB method", () => {
        it("should connect to DB successfully on first try", async () => {
            // 模擬 setUp 成功
            (dbStub.setUp as jest.Mock).mockResolvedValue("Connected");
            // 模擬 getBooks 回傳 bookData，即模擬取得書籍資料
            (dbStub.getBooks as jest.Mock).mockResolvedValue(bookData);

            const result = await dataBaseSystem.connectDB();

            // Assert
            expect(result).toBe("Connected");
            expect(dbStub.setUp).toHaveBeenCalledWith("http://localhost", 4000);
            expect(dbStub.getBooks).toHaveBeenCalled();
            expect(dataBaseSystem.getItems()).toEqual(bookData);
        });

        it("should retry connecting and throw error after exceeding retryTimes", async () => {
            // 模擬 setUp 失敗
            (dbStub.setUp as jest.Mock).mockRejectedValue(new Error("Connection failed"));

            await expect(dataBaseSystem.connectDB()).rejects.toThrow("Cannnot connect to DB");
            // Assert
            // 檢查 setUp 至少被呼叫 DataBaseSystem.retryTimes 次
            expect((dbStub.setUp as jest.Mock).mock.calls.length).toBe(DataBaseSystem.retryTimes);
        });
    });

    describe("addBook method", () => {
        it("should add a new book successfully", async () => {
            const title = "New Book";
            const author = "New Author";
            // 模擬 hashGenerator.simpleISBN 回傳 mockISBN
            const mockISBN = "12-34";
            MockedHashGen.simpleISBN = jest.fn().mockReturnValue(mockISBN);

            // 模擬 db.addBook 成功執行
            (dbStub.addBook as jest.Mock).mockResolvedValue(undefined);

            await dataBaseSystem.addBook(title, author);

            // Assert
            expect(dbStub.addBook).toHaveBeenCalledWith({
                ISBN: mockISBN,
                title,
                author,
            });
        });

        it("should throw error when title or author is missing", async () => {
            // 模擬缺少 title 或 author
            // Assert
            await expect(dataBaseSystem.addBook("", "Some Author")).rejects.toThrow("Add book failed");
            await expect(dataBaseSystem.addBook("Some Title", "")).rejects.toThrow("Add book failed");
        });
    });

    describe("deleteBook method", () => {
        it("should delete a book successfully", async () => {
            // 模擬 db.deleteBook 成功
            (dbStub.deleteBook as jest.Mock).mockResolvedValue(undefined);
            const mockISBN = "12-34";

            await dataBaseSystem.deleteBook(mockISBN);

            // Assert
            expect(dbStub.deleteBook).toHaveBeenCalledWith(mockISBN);
        });

        it("should throw error when ISBN is empty", async () => {
            await expect(dataBaseSystem.deleteBook("")).rejects.toThrow("Delete book failed");
        });
    });

    describe("process method", () => {
        it("should update items with books from db", async () => {
            (dbStub.getBooks as jest.Mock).mockResolvedValue(bookData);
            await dataBaseSystem.process([]);

            // Assert
            expect(dbStub.getBooks).toHaveBeenCalled();
            expect(dataBaseSystem.getItems()).toEqual(bookData);
        });

        it("should do nothing when db.getBooks throws error", async () => {
            (dbStub.getBooks as jest.Mock).mockResolvedValue(bookData);
            await dataBaseSystem.process([]);
            
            (dbStub.getBooks as jest.Mock).mockRejectedValue(new Error("DB Error"));
            await dataBaseSystem.process([]);
            // 當 db.getBooks throw error，items 應該仍為 bookData
            // Assert
            expect(dataBaseSystem.getItems()).toEqual(bookData);
        });
    });
});
