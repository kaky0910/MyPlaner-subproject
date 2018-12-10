const oracledb = require('oracledb');
const moment = require('moment');
oracledb.autoCommit = true;

async function addDailyStatics(){
  getAllMembers(function(arr){
    for(i=0; i<arr.length;i++){
      getChallengeByMonth(arr[i],insertChallengeStatics); 
    }
  });
}

function getAllMembers(callback){
    oracledb.getConnection(dbconfig.config,function(err,connection){
      if(err){
        console.error(err.message);
        return;
      }
      connection.execute(`SELECT member_no FROM member`,
      [],
      function(err,result){
        if(err){
          console.error(err.message);
                doRelease(connection);
                return;
      }
      console.log(result.rows);
      callback(result.rows);
      console.log("123123");
    });
  });
}


function getChallengeByMonth (memberNo,callback) {
    var day = moment().subtract('days',1).format('YYYYMMDD');
    oracledb.getConnection(
        dbconfig.config,
        function(err, connection) {
          if (err) {
            console.error(err.message);
            return;
          }
          connection.execute(           //challenge_no, challenge_title, challenge_start_date
            `SELECT member_no, challenge.challenge_no, challenge_title, challenge_content, challenge_content_check, ceil((sysdate - challenge_start_date))
             FROM challenge, challenge_content
             WHERE member_no=${memberNo} 
             AND (to_date('${day}','YYYYMMDD') BETWEEN challenge_start_date AND challenge_end_date) 
             AND challenge.challenge_no = challenge_content.challenge_no`,
            [],  // bind value for :id
            function(err, result) {
              if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
              }
              console.log("1    "+result.rows);
              if(result.rows.length!=0){
                callback(convert(result.rows));
              }
              doRelease(connection);
              ///////////////////////////////////////
            });
        });
};
function insertChallengeStatics(r){
  oracledb.getConnection(
    dbconfig.config,
    function(err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      connection.execute(
        `INSERT INTO member_statics_per_day(member_no, day, rate_of_challenge_per_day,total_challenge_content) VALUES (${r[0]},TO_DATE(${r[1]},'YYYYMMDD'),${r[2]},${r[3]})`,
        [],
        function(err,result){
          if (err) {
            console.error(err.message);
            return;
          }
          console.log("성공~");
        })
      });
  };
function doRelease(connection) {
    connection.close(
      function(err) {
        if (err)
          console.error(err.message);
      });
  }
function convert(arr){
  var result = [];
  result.push(arr[0][0]);
  result.push(moment().subtract('days',-1).format('YYYYMMDD'));
  var length = arr.length;
  var count = 0;
  var dayCount;
  for(i=0; i<length;i++){
    dayCount = arr[i][5];
    if(arr[i][dayCount]==1) count++;
  }
  result.push(count*100/length);
  result.push(length);
  return result;
}


module.exports = {
    getChallengeByMonth,
    getAllMembers,
    addDailyStatics
}