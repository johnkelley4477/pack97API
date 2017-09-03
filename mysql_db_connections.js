'use strict'

const mysql = require('mysql');

const con = mysql.createConnection({
  host: '74.220.215.71',
  user: 'cubscou3_john',
  password: 'Naihanchi3!',
  port: '3306',
  database: 'cubscou3_hikers',
  connectTimeout: 2000
});

const sqlScoutTotals =  'SELECT tbl_SCOUT.SCOUT_FIRST_NAME, tbl_SCOUT.SCOUT_LAST_NAME, Sum( tbl_HIKE.MILES ) AS TOTAL_MILES ' +
                        'FROM tbl_SCOUT ' +
    									  'LEFT JOIN tbl_SCOUT_HIKE ON tbl_SCOUT.SCOUT_ID = tbl_SCOUT_HIKE.SCOUT_ID ' +
    									  'LEFT JOIN tbl_HIKE ON tbl_SCOUT_HIKE.HIKE_ID = tbl_HIKE.HIKE_ID ' +
    									  'WHERE tbl_SCOUT.NON_ACTIVE_SCOUT = 0 ' +
    									  'GROUP BY tbl_SCOUT.SCOUT_FIRST_NAME ' +
    									  'ORDER BY tbl_SCOUT.SCOUT_FIRST_NAME';
const sqlTest = 'SELECT COUNT(tbl_SCOUT.SCOUT_FIRST_NAME) FROM tbl_SCOUT';

//Create a connection
con.connect(function(err){
  //Throw an error if server connection fails
  if(err){
    throw err;
  }

  //End DB connection function
  const end = () => {
    con.end(function(err) {
      if (err){
        throw err;
      }
    });
  }

  con.query(sqlTest, (err, result) => {
    if (err) throw err;
    console.log("Result: " + result.values);
    end();
  });

  //Get the Scouts' Totals for miles hiked.
  // const getScoutTotals = () => con.query(sqlTest,(err, result) => {
  //
  //   console.log('before err');
  //   if(err){
  //     console.log('throw err');
  //     throw err;
  //   }
  //   console.log('before end');
  //   end();
  //   console.log('before return');
  //   return result.values;
  // });
  //
  // console.log(getScoutTotals());
})
