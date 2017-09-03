'use strict'

const mysql = require('mysql');
const props = require('./properties.json');

const con = mysql.createConnection({
  host: props.host,
  user: props.user,
  password: props.password,
  port: props.port,
  database: props.database,
  connectTimeout: props.connectTimeout
});

const sqlScoutTotals =  'SELECT tbl_SCOUT.SCOUT_FIRST_NAME, tbl_SCOUT.SCOUT_LAST_NAME, Sum( tbl_HIKE.MILES ) AS TOTAL_MILES ' +
                        'FROM tbl_SCOUT ' +
    									  'LEFT JOIN tbl_SCOUT_HIKE ON tbl_SCOUT.SCOUT_ID = tbl_SCOUT_HIKE.SCOUT_ID ' +
    									  'LEFT JOIN tbl_HIKE ON tbl_SCOUT_HIKE.HIKE_ID = tbl_HIKE.HIKE_ID ' +
    									  'WHERE tbl_SCOUT.NON_ACTIVE_SCOUT = 0 ' +
    									  'GROUP BY tbl_SCOUT.SCOUT_FIRST_NAME ' +
    									  'ORDER BY tbl_SCOUT.SCOUT_FIRST_NAME';
const sqlTest = 'SELECT COUNT(tbl_SCOUT.SCOUT_FIRST_NAME) FROM tbl_SCOUT';

let results = {
  'hikeTotals':''
};

//Create a connection
const getScoutTotals = () => {
  con.connect(function(err){
  //Throw an error if server connection fails
    if(err){
      throw err;
    }

    //Get the Scouts' Totals for miles hiked.
    con.query(sqlScoutTotals,(err, result) => {
        if(err){
          throw err;
        }

        results.hikeTotals = result;
        console.log(results.hikeTotals);
    });

    //End DB connection function
    con.end(function(err) {
      if (err){
        throw err;
      }
    });
  });
};

getScoutTotals();
console.log(results.hikeTotals);
