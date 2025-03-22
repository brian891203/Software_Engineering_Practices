import { TestBookInfo } from "../__test__/TestingData";
import { DisplayRangeSystem } from "./DisplayRangeSystem";
import { SortSystem } from "./SortSystem";

describe("DisplayRangeSystem Test", () => {
    let displayRangeSystem: DisplayRangeSystem;
    let sortSystem: SortSystem;
    let bookData: any[];
    let startRange: any;
    let endRange: any;

    beforeEach(() => {
        // Arrange
        displayRangeSystem = new DisplayRangeSystem();
        bookData = TestBookInfo;
    });

    test("Should set and get Range correctly", () => {
        // Arrange
        startRange = 1;
        endRange = 3;

        // Act
        displayRangeSystem.setRange(startRange, endRange);

        // Assert
        expect(displayRangeSystem.getStartRange()).toBe(1);
        expect(displayRangeSystem.getEndRange()).toBe(3);
    });

    test("Should throw Error when input number less than 0", () => {
        // Arrange
        startRange = -1;
        endRange = 3;

        // Act
        const fn = () => displayRangeSystem.setRange(startRange, endRange);

        // Assert
        expect(fn).toThrowError("Cannot be less than 0");
    });

    test("Should throw Error when input End Range less than Start Range", () => {
        // Arrange
        startRange = 3;
        endRange = 1;

        // Act
        const fn = () => displayRangeSystem.setRange(startRange, endRange);

        // Assert
        expect(fn).toThrowError("End Range cannot less than Start Range");
    });

    test("Should arrange Range correctly when input is valid string input", () => {
        // Arrange
        startRange = "1";
        endRange = "3";

        // Act
        displayRangeSystem.setRange(startRange, endRange);

        // Assert
        expect(displayRangeSystem.getStartRange()).toBe(1);
        expect(displayRangeSystem.getEndRange()).toBe(3);
    });

    test("Should throw Error when input is invalid string input", () => {
        // Arrange
        startRange = "a";
        endRange = "b";

        // Act
        const fn = () => displayRangeSystem.setRange(startRange, endRange);

        // Assert
        expect(fn).toThrowError("Invalid String Input");
    });

    test("Should throw Error when input is invalid float input", () => {
        // Arrange
        startRange = 3.5;
        endRange = 1.5;

        // Act
        const fn = () => displayRangeSystem.setRange(startRange, endRange);

        // Assert
        expect(fn).toThrowError("Invalid Float Input");
    });

    test("Should make the BookInfo slice array in range correctly", async () => {
        // Arrange
        sortSystem = new SortSystem();
        startRange = 2;
        endRange = 5;
        displayRangeSystem.setRange(startRange, endRange);

        // Act
        await sortSystem.process(bookData);
        await displayRangeSystem.process(bookData);

        // Assert
        let items = displayRangeSystem.getItems();
        expect(items.length).toBe(4);
        expect(items[0].title).toBe("Bone of fire");
        expect(items[1].title).toBe("Emma Story");
        expect(items[2].title).toBe("Game of Thrones I");
        expect(items[3].title).toBe("Game of Thrones II");
    });
});
