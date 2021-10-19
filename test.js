const moment = require('moment')

// Current date time is
let now  = moment()

// Create from ISO 8601 string
now = moment("2019-05-19")

// Using a format
now = moment("14/06/2019 4:50PM", "DD/MM/YYYY h:mmA")

// epoch milliseconds
now = moment(600000)

// create with seconds from the epoch date ()
now = moment.unix(7200)

now = moment.utc()

console.log(`toString => ${now.toString()}`)
console.log(`toISOString => ${now.toISOString()}`)

