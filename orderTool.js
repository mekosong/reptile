/**
 * Created by sr on 16/9/28.
 */
"use strict";
var xlsx = require('node-xlsx');
var expressCode = require('./config/express_code');
var _ = require('lodash');
var fs = require('fs');
var out = require('./o');

var run = function (file) {
  var obj = xlsx.parse(__dirname + '/order_files/'+file); // parses a file

  var check = obj[0].data[0];

  if (check[0] != '礼物ID' || check[1] != '邀请码' || check[2] != '快递单号') {
    out.error('请将"'+file+'"的第1.2.3列分别设置为“礼物ID”,“邀请码”,“快递单号”');
    return
  }
  var command =['#'+file];
  obj[0].data.map((i, n)=> {
    if (n === 0) return ;
    if(!i[0] || !i[1] || !i[2]){
      out.warn(file+'=>第'+(n+1)+'行=>数据不全！');
      return
    }

    var stringArr = i[2].split('#');
    if(stringArr.length!=2||!stringArr[0]||!stringArr[1]){
      out.error(file+'=>第'+(n+1)+'行=>订单格式有误！');
      return;
    }
    var oneExpress = stringArr[0];
    if(oneExpress==='百世快递'){
      oneExpress = '汇通快运';
      i[2]=oneExpress+'#'+stringArr[1]
    }
    var whether = _.has(expressCode,oneExpress);
    if (!whether){
      out.error(file+'=>'+oneExpress+' not in express_code');
      return
    }

    var giftID = i[0];
    var uid = i[1];
    var orderForm = i[2];
    command.push('./cli.js -u order --gift '+giftID+' --uid '+uid+' --post "'+ orderForm+'"');
  });

  return command;
};

var main = function(){
  var files = fs.readdirSync('./order_files').filter(f =>f[0] !== '.'&&f[0]!=='~');
  var allCommand =[];
  files.map(file=>{
    allCommand=allCommand.concat(run(file));
  });

  allCommand = allCommand.join(";\n");
  fs.writeFileSync('z_tool.sh', allCommand, { mode: 0o755});
};

main();