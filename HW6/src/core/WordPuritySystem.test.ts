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
        wordPurityServiceStub = createWordPurityServiceStub();
        wordPuritySystem = new WordPuritySystem(wordPurityServiceStub);
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
            await wordPuritySystem.process(bookData);
            expect(wordPuritySystem.getItems()).toEqual(bookData);
            expect(wordPurityServiceStub.purity).not.toHaveBeenCalled();
        });

        it("should filter each BookInfo title using purity method when disable is false", async () => {
            wordPuritySystem.setDisablePurity(false);
            // 設定 stub 的 purity 方法實作：將所有 "Lord" 替換成 "****"
            wordPurityServiceStub.purity.mockImplementation((text: string) =>
                text.replace("Lord", "****")
            );

            await wordPuritySystem.process(bookData);
            expect(wordPurityServiceStub.purity).toHaveBeenCalledTimes(bookData.length);

            expect(wordPuritySystem.getItems()[0].title).toBe("The **** of The Rings");
        });
    });
});
