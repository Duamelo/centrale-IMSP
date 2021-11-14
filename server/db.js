const Pool = require('pg').Pool;
require('dotenv/config');





const pool = new Pool({
   connectionString: process.env.connectionString,
});


/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 * 
 * @see https://node-postgres.com/features/pooling#single-query
 */
async function query(query, params) {
    const {rows, fields} = await pool.query(query, params);

    return rows;
}



function emptyOrRows(rows) {
        if (!rows) {
          return [];
        }
        return rows;
      }
      
module.exports = {
  query,
  emptyOrRows
}
