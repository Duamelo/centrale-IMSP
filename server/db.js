const Pool = require('pg').Pool;
require('dotenv/config');


const pool = new Pool({

   connectionString: process.env.connectionString
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

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
