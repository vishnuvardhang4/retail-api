const mysqldump = require('mysqldump');
const path = require("path");
const {db: {host, user, password, database}} = require('./index')

// or const mysqldump = require('mysqldump')
 
// dump the result straight to a file
mysqldump({
    connection: {
        host, user, password, database
    },
    dumpToFile: path.join(__dirname, `../backups/${database}.sql`),
});