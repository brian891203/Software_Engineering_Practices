import { TestBookInfo } from "../__test__/TestingData";
import { SortSystem } from "./SortSystem";

describe("SortSystem Test", () => {
    let sortSystem: SortSystem;
    let bookData: any[];

    beforeEach(() => {
        // Arrange
        sortSystem = new SortSystem();
        bookData = TestBookInfo;
    });

    test("should set and get SortType correctly", () => {
        let sortType = SortSystem.ASC;
        sortSystem.setSortType(sortType);
        expect(sortSystem.getSortType()).toEqual("ASC");

        sortType = SortSystem.DESC;
        sortSystem.setSortType(sortType);
        expect(sortSystem.getSortType()).toEqual("DESC");

        sortType = "RANDOM";
        expect(() => sortSystem.setSortType(sortType)).toThrowError("It must be ASC or DESC");
    });

    test("process sort items in ASC", async () => {
        // Arrange
        sortSystem.setSortType(SortSystem.ASC);

        // Act
        await sortSystem.process(bookData);

        // Assert
        let items = sortSystem.getItems();
        expect(items.length).toBe(8);
        expect(items[0].title).toBe("Alice Adventures in Wonderland");
        expect(items[1].title).toBe("Bone of fire");
        expect(items[2].title).toBe("Emma Story");
        expect(items[3].title).toBe("Game of Thrones I");
        expect(items[4].title).toBe("Game of Thrones II");
        expect(items[5].title).toBe("One Thousand and One Nights");
        expect(items[6].title).toBe("The Lord of The Rings");
        expect(items[7].title).toBe("To Kill a Mockingbird");
    });

    test("process sort items in DESC", async () => {
        // Arrange
        sortSystem.setSortType(SortSystem.DESC);

        // Act
        await sortSystem.process(bookData);

        // Assert
        let items = sortSystem.getItems();
        expect(items.length).toBe(8);
        expect(items[0].title).toBe("To Kill a Mockingbird");
        expect(items[1].title).toBe("The Lord of The Rings");
        expect(items[2].title).toBe("One Thousand and One Nights");
        expect(items[3].title).toBe("Game of Thrones II");
        expect(items[4].title).toBe("Game of Thrones I");
        expect(items[5].title).toBe("Emma Story");
        expect(items[6].title).toBe("Bone of fire");
        expect(items[7].title).toBe("Alice Adventures in Wonderland");
    });
});
