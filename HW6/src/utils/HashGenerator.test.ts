import { TestBookInfo } from "../__test__/TestingData";
import { HashGenerator } from "./HashGenerator";

describe("HashGenerator Test", () => {
    let hashGenerator: HashGenerator;
    let bookData: any[];

    beforeEach(() => {
        hashGenerator = new HashGenerator();
        bookData = TestBookInfo;
    });

    describe("g method", () => {
        it("should throw an error if charaterNum <= 0", () => {
            expect(() => hashGenerator.g(0)).toThrowError("Hash number can't less than 0");
        });

        it("should generate a random string of given length", () => {
            // 產生 "ABC"
            const mockRandom = jest.spyOn(Math, "random")
                .mockReturnValueOnce(0)
                .mockReturnValueOnce(1 / 26)
                .mockReturnValueOnce(2 / 26);

            const result = hashGenerator.g(3);
            expect(result).toBe("ABC");
            
            // 恢復 Math.random
            mockRandom.mockRestore();
        });
    });

    describe("simpleISBN method", () => {
        it("should convert pattern to ISBN format with digits replacing non-dash characters", () => {
            const mockRandom = jest.spyOn(Math, "random")
                .mockReturnValueOnce(0.1)  // '1'
                .mockReturnValueOnce(0.2)  // '2'
                .mockReturnValueOnce(0.3)  // '3'
                .mockReturnValueOnce(0.4); // '4'

            const result = hashGenerator.simpleISBN("00-00");
            expect(result).toBe("12-34");

            // 恢復 Math.random
            mockRandom.mockRestore();
        });
    });
});
