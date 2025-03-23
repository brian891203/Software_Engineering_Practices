import { BookDataBaseService, BookInfo } from "@externals/simple-db";
import { TestBookInfo } from "../__test__/TestingData";
import { ListViewerManager, UpdateType } from "./ListManager";
import { SortSystem } from "./SortSystem";
import { WordPuritySystem } from "./WordPuritySystem";

jest.mock("@externals/simple-db");
jest.mock("../utils/HashGenerator");
jest.mock("../core/DataBaseSystem");
jest.mock("../core/DisplayRangeSystem");
jest.mock("../core/FilterSystem");
jest.mock("../core/SortSystem");
jest.mock("../core/WordPuritySystem");
jest.mock("@externals/word-purity");

describe("ListManager Test", () => {
    let bookData: any[];
    let system: ListViewerManager;
    let processors: any[];

    beforeEach(async () => {
        bookData = TestBookInfo;
        system = new ListViewerManager();

        (BookDataBaseService.prototype.setUp as jest.Mock).mockResolvedValue("Connected");
        (BookDataBaseService.prototype.getBooks as jest.Mock).mockResolvedValue(TestBookInfo);

        await system.setUp();

        // 取得 processors 陣列
        // 0: DataBaseSystem, 1: WordPuritySystem, 2: FilterSystem, 3: SortSystem, 4: DisplayRangeSystem
        processors = [];
        for (let i = 0; i < 5; i++) {
            processors.push(system.getProcessor(i));
        }

        // 為每個 processor 模擬其方法：
        // process: 回傳 resolved 的 Promise（不論傳入什麼）
        // getItems: 模擬回傳一個標記值（方便檢查流程）
        // getUpdateMessage: 回傳一個固定訊息，表示該系統更新完成
        processors.forEach((proc, index) => {
            proc.process = jest.fn().mockResolvedValue(undefined);
            proc.getItems = jest.fn().mockReturnValue([`Items-${index}`]);
            proc.getUpdateMessage = jest.fn().mockReturnValue(`Updated-${index}`);
        });
    });


    describe("updateResult method", () => {
        it("should update all systems starting from the given updateType and collect update messages", async () => {
            // 當 updateType 為 Data (0) 時，更新所有系統（索引 0 至 4）
            await system.updateResult(UpdateType.Data);
            // 對於每一個 processor 0~4，process() 都應該被呼叫一次
            processors.forEach((proc, index) => {
                // 前一個 processor 的 getItems 傳入後面的 process
                // 對於 index 0，傳入空陣列
                // index > 0，傳入 processors[index - 1].getItems() 的回傳值
                const expectedPreItems = index === 0 ? [] : [ `Items-${index - 1}` ];
                expect(proc.process).toHaveBeenCalledWith(expectedPreItems);
            });
            // 更新訊息集合應為每個 processor 的 getUpdateMessage() 回傳的訊息，順序 0~4
            expect(system.getUpdateMessage()).toEqual([
                "Updated-0",
                "Updated-1",
                "Updated-2",
                "Updated-3",
                "Updated-4",
            ]);
        });

        it("should update only systems from a specified updateType", async () => {
            // 例如，若起始更新點為 Filter (2)，則只更新 processors[2], [3], [4]
            await system.updateResult(UpdateType.Filter);
            // processors[0] 與 processors[1] 不應被呼叫
            expect(processors[0].process).not.toHaveBeenCalled();
            expect(processors[1].process).not.toHaveBeenCalled();
            // processors[2], [3], [4] 應依序呼叫 process
            for (let i = 2; i < 5; i++) {
                const expectedPreItems = i === 2 ? [`Items-1`] : [`Items-${i - 1}`];
                expect(processors[i].process).toHaveBeenCalledWith(expectedPreItems);
            }
            // 收集的 update message 只包含 processors[2]、[3]、[4]
            expect(system.getUpdateMessage()).toEqual([
                "Updated-2",
                "Updated-3",
                "Updated-4",
            ]);
        });
        
    });

    describe("getProcessor method", () => {
        it("should return the correct processor based on UpdateType", () => {
            // UpdateType.Sort (3) 應該返回 SortSystem
            const sortProc = system.getProcessor<SortSystem>(UpdateType.Sort);
            expect(sortProc).toBe(processors[3]);

            // UpdateType.Purity (1) 應該返回 WordPuritySystem
            const purityProc = system.getProcessor<WordPuritySystem>(UpdateType.Purity);
            expect(purityProc).toBe(processors[1]);
        });
    });

    describe("generateDisplayItemRow method", () => {
        it("should generate display item row based on the last processor's getItems", () => {
            // 假設最後一個 processor (DisplayRangeSystem) 的 getItems 返回一組 BookInfo 物件
            const fakeDisplayBooks: BookInfo[] = [
                { ISBN: "100", title: "Display Book", author: "Display Author" },
                { ISBN: "101", title: "Display Book 2", author: "Display Author 2" },
            ];
            const displayProc = processors[4];
            displayProc.getItems = jest.fn().mockReturnValue(fakeDisplayBooks);
            const result = system.generateDisplayItemRow();
            // 檢查返回值是否正確 map 出每個 BookInfo 的三個屬性
            expect(result).toEqual(fakeDisplayBooks);
        });
    });
});
