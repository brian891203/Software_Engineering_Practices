import { TestBookInfo } from "../__test__/TestingData";
import { WordPuritySystem } from "./WordPuritySystem";

// 建立一個 WordPurityService 的 stub
const createWordPurityServiceStub = () => {
  return {
    // 模擬 addWord，僅記錄呼叫情形
    addWord: jest.fn(),
    // 模擬 purity 方法
    // 預設實作不做處理，直接回傳原文字
    purity: jest.fn((text: string) => text)
  };
};

describe("WordPuritySystem Test", () => {
    let wordPurityServiceStub: any;
    let wordPuritySystem: WordPuritySystem;
    let bookData: any[];

    beforeEach(() => {
        // 建立 stub 物件
        wordPurityServiceStub = createWordPurityServiceStub();
        // 建立 WordPuritySystem，傳入 stub
        wordPuritySystem = new WordPuritySystem(wordPurityServiceStub);
        // 假設測試用的 BookInfo 資料
        bookData = TestBookInfo;
    });

    it("should call addWord in constructor with default sensitive words", () => {
        expect(wordPurityServiceStub.addWord).toHaveBeenCalledTimes(1);
        expect(wordPurityServiceStub.addWord).toHaveBeenCalledWith([
            "Copperfield",
            "Wonderland",
            "Lord",
            "Thrones",
            "Mockingbird"]);
    });

    it("should set and get disable flag correctly", () => {
        wordPuritySystem.setDisablePurity(true);
        expect(wordPuritySystem.isDisablePurity()).toBe(true);

        wordPuritySystem.setDisablePurity(false);
        expect(wordPuritySystem.isDisablePurity()).toBe(false);
    });

    describe("process method", () => {
        it("should leave items unchanged when disable is true", async () => {
            wordPuritySystem.setDisablePurity(true);
            // 執行 process 方法（disable 為 true）
            await wordPuritySystem.process(bookData);
            // 預期結果：items 與原始 bookData 相同
            expect(wordPuritySystem.getItems()).toEqual(bookData);
            // 並不呼叫 purity 方法
            expect(wordPurityServiceStub.purity).not.toHaveBeenCalled();
        });

        it("should filter each BookInfo title using purity method when disable is false", async () => {
            wordPuritySystem.setDisablePurity(false);
            // 設定 stub 的 purity 方法實作：將所有 "abc" (不分大小寫) 替換成 "***"
            wordPurityServiceStub.purity.mockImplementation((text: string) =>
                text.replace("Lord", "****")
            );

            // 執行 process 方法（disable 為 false）
            await wordPuritySystem.process(bookData);

            // 預期會呼叫 purity 方法兩次（對應兩筆資料）
            expect(wordPurityServiceStub.purity).toHaveBeenCalledTimes(bookData.length);

            // 檢查轉換結果
            // 第一筆 BookInfo 的 title 為 "xyzABC123abc"，轉換後應變為 "xyz***123***"
            expect(wordPuritySystem.getItems()[0].title).toBe("The **** of The Rings");
            // 第二筆 BookInfo 的 title 無敏感字，應不變
            // expect(wordPuritySystem.getItems()[1].title).toBe("Game of ******* I");
        });
    });
});
