let mysql = require('mysql');
let db = require('../configs/db');

let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');

let pool = mysql.createPool(db);

function formatData(rows) {
  if(rows){
    return rows.map(row => {
      let date = moment(row.create_time).format('YYYY-MM-DD');
      return Object.assign({}, row, {create_time: date});
    });
  }else {
    return rows
  }
}

module.exports = {
  getGoodsList (req, res) {
    func.connPool(sql.queryAll, 'goods', (err,rows) => {
      rows = formatData(rows);
      res.json({code: 200, msg: 'ok', goods: rows});
    });
  },
}