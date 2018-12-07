const user = "kaky0910";
const password = "oracle12";
const connectString = "oracledb.cve3prshwbnz.ap-northeast-2.rds.amazonaws.com/ORCL";

module.exports = {
    // user : process.env.NODE_ORACLEDB_USER || "kaky0910",

    // // Instead of hard coding the password, consider prompting for it,
    // // passing it in an environment variable via process.env, or using
    // // External Authentication.
    // password      : process.env.NODE_ORACLEDB_PASSWORD || "oracle12",
  
    // // For information on connection strings see:
    // // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#connectionstrings
    // connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "oracledb.cve3prshwbnz.ap-northeast-2.rds.amazonaws.com/ORCL",
  
  
    // // Setting externalAuth is optional.  It defaults to false.  See:
    // // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#extauth
    // externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,

    config : {
      user,
      password, 
      connectString
    }
  };