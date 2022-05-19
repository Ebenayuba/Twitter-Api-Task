const Pool =  require('pg').Pool

const details = new Pool({
    user: "postgres",
    host: "localhost",
    database: "twitter",
    password: "MypostSQL",
    port: 5432,
})

module.exports = details;
