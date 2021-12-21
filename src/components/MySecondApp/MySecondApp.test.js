import {cleanInput} from "./MySecondApp";


describe("showMyStudent", () => {
    it("returns clean input", () => {
        expect(1 + 5).toBe(6)
        expect(cleanInput(' 444-44-4444 ')).toBe('444-44-4444')
    })
})