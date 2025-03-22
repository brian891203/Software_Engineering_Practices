import { TestBookInfo } from "../__test__/TestingData";
import { FilterSystem } from "./FilterSystem";

describe("FilterSystem Test", () => {
    let filterSystem: FilterSystem;
    let bookData: any[];

    beforeEach(() => {
        // Arrange
        filterSystem = new FilterSystem();
        bookData = TestBookInfo;
    });

    test("Todo", () => {
        // Arrange
        const filterSpy = jest.spyOn(bookData, 'filter');

        // console.log("bookData", bookData);

        // Act
        filterSystem.process(bookData);

        // Assert
        expect(TestBookInfo).toBeTruthy();
        expect(filterSpy).toBeCalledTimes(1);
    });

    test("should set and get filter word correctly", () => {
        filterSystem.setFilterWord("Js");
        expect(filterSystem.getFilterWord()).toEqual("Js");
    });

    test("should set and get ignoreCase correctly", () => {
        filterSystem.setIgnoreCase(true);
        expect(filterSystem.isIgnoreCase()).toBe(true);
    });

    test("should set and get update message correctly", () => {
        expect(filterSystem.getUpdateMessage()).toEqual("Filter Update");
    });

    test("process filters items in a case-insensitive", async () => {
        // Arrange
        filterSystem.setFilterWord("GAME OF");
        filterSystem.setIgnoreCase(true);
        
        // Act
        await filterSystem.process(bookData);

        // Assert
        let items = filterSystem.getItems();
        expect(items.length).toBe(2);
        items.forEach((item) => {
          expect(item.title).toContain("Game of Thrones");
        });
    });

    test("process filters items in a case-insensitive", async () => {
        // Arrange
        filterSystem.setFilterWord("Game of");
        filterSystem.setIgnoreCase(false);
        
        // Act
        await filterSystem.process(bookData);

        // Assert
        let items = filterSystem.getItems();
        expect(items.length).toBe(2);
        items.forEach((item) => {
          expect(item.title).toContain("Game of Thrones");
        });
    });
});
