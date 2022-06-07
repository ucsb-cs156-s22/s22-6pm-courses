import { onSomeSuccess, cellToAxiosParamsAdd, cellToAxiosParamsDelete } from "main/utils/CoursesWithSectionsMoreUtils";
import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("CoursesWithSectionsMoreUtils tests", () => {

    describe("onSomeSuccess", () => {

        test("It puts the message on console.log and in a toast", () => {
            // arrange
            const restoreConsole = mockConsole();

            // act
            onSomeSuccess("abc");

            // assert
            expect(mockToast).toHaveBeenCalledWith("abc");
            expect(console.log).toHaveBeenCalled();
            const message = console.log.mock.calls[0][0];
            expect(message).toMatch("abc");

            restoreConsole();
        });

    });
    describe("cellToAxiosParamsDelete", () => {

        test("It returns the correct params", () => {
            // arrange
            const cell = { row: { values: { id: 17 } } };

            // act
            const result = cellToAxiosParamsDelete(cell);

            // assert
            expect(result).toEqual({
                url: "/api/sectionscart",
                method: "DELETE",
                params: { id: 17 }
            });
        });

    });
    describe("cellToAxiosParamsAdd", () => {

        test("It returns the correct params", () => {
            // arrange
            const cell = { row: { values: { courseId: [{props:{children:"abc"}}], title: [{props:{children:"def"}}], section: [{props:{children:"ghi"}}], location: [{props:{children:"jkl"}}], enrollment: [{props:{children:"mno"}}], time: [{props:{children:"pqr"}}], instructor: [{props:{children:"stu"}}] } } };

            // act
            const result = cellToAxiosParamsAdd(cell);

            // assert
            expect(result).toEqual({
                url: "/api/sectionscart/post",
                method: "POST",
                params: { 
                    courseId: "abc",
                    title: "def",
                    section: "ghi",
                    location: "jkl",
                    enrollment: "mno",
                    time: "pqr",
                    instructor: "stu"
                }
            });
        });

    });
});


