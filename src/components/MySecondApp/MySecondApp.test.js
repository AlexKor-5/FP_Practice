import {cleanInput, findStudent, csv} from "./MySecondApp";
import Either from "../../monads/Either/Either";


describe("showMyStudent", () => {
    it("returns clean input", () => {
        expect(1 + 5).toBe(6)
        expect(cleanInput(' 444-44-4444 ')).toBe('444-44-4444')
    })

    it("returns founded student in a right manner", () => {
        const mockFindStudent = jest.fn(findStudent) // mock function

        const rightId = '444-44-4444';
        const wrongId = '444-44-4444KL';

        const ifRight = id => Either.right({
            ssn: id,
            firstname: 'Time',
            lastname: 'Buson',
            address: {street: 'AV Mr. Simpson', country: 'DE'}
        })
        const ifLeft = id => Either.left(`Object not found with id: ${id}`)

        expect(mockFindStudent(rightId)).toEqual(ifRight(rightId))              // if the id is right
        expect(mockFindStudent(wrongId)).toEqual(ifLeft(wrongId))               // if the id is wrong
        expect(mockFindStudent.mock.calls.length).toBe(2)                       // the number of function calls
        expect(mockFindStudent.mock.calls[0][0]).toBe(rightId)                  // the first argument is right id
        expect(mockFindStudent.mock.calls[1][0]).toBe(wrongId)                  // the second arg is wrong id
        expect(mockFindStudent.mock.results[0].value).toEqual(ifRight(rightId))
        expect(mockFindStudent.mock.results[1].value).toEqual(ifLeft(wrongId))
        // console.log(mockFindStudent.mock)
    })

    it("returns joined value", () => {
        expect(csv(["a", "b", "c"])).toBe("a,b,c")
        console.log(document.querySelector('#student-name'));
    })
})