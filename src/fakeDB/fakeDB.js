export const DataBase = (function () {
    //private
    const data = [
        {
            ssn: '444-4444-656',
            firstname: 'Alex',
            lastname: 'Jhg',
            address: {street: "AV Mr. Lee", country: "USA"}
        },
        {
            ssn: '6785-66-656',
            firstname: 'Mark',
            lastname: 'Liker',
            address: {street: "AV Mr. Leon", country: "UK"},
        },
        {
            ssn: '444-44-4444',
            firstname: 'Time',
            lastname: 'Buson',
            address: {street: "AV Mr. Simpson", country: "DE"}
        },
        {
            ssn: '657-432-89',
            firstname: 'Ricky',
            lastname: 'Martin',
            address: {street: "AV Mr. Merton", country: "PL"}
        }
    ]

    function DataBaseEncapsulated() {
        //constructor
    }

    DataBaseEncapsulated.prototype.print = function () {
        console.log(data)
    }
    DataBaseEncapsulated.prototype.get = function (ssn) {
        return data.find(person => person.ssn === ssn) || null
    }

    return DataBaseEncapsulated
})()

let db = new DataBase()
export default db
