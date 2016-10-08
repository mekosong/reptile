/**
 * Created by Administrator on 2016/9/28.
 */

"use strict";
var xlsx = require('node-xlsx');
var expressCode = require('./config');
var _ = require('lodash');
var fs = require('fs');


var run = function (file) {
  var obj = xlsx.parse(__dirname + '/files/'+file); // parses a file
console.log(obj[0].data)

  var check = obj[0].data[0];
  console.log(check);
  //检查第一，二列是否为姓名和时间
  if (check[0] != '姓名' || check[1] != '时间') {
    console.log('请将"'+file+'"的第1.2列分别设置为“姓名”,“时间”');
    return
  }

  //检查日期填写是否正确
  for(var i=2;i<33;i++){
    if(check[i]!=i-1){
      console.log('工作日期请设置为1-31');
      return
    }
  }
  console.log(222);


  //var command =['#'+file];
  //obj[0].data.map((i, n)=> {
  //  if (n === 0) return ;
  //  if(!i[0] || !i[1] || !i[2]){
  //    out.warn(file+'=>第'+(n+1)+'行=>数据不全！');
  //    return
  //  }
  //
  //  var stringArr = i[2].split('#');
  //  if(stringArr.length!=2||!stringArr[0]||!stringArr[1]){
  //    out.error(file+'=>第'+(n+1)+'行=>订单格式有误！');
  //    return;
  //  }
  //  var oneExpress = stringArr[0];
  //  if(oneExpress==='百世快递'){
  //    oneExpress = '汇通快运';
  //    i[2]=oneExpress+'#'+stringArr[1]
  //  }
  //  var whether = _.has(expressCode,oneExpress);
  //  if (!whether){
  //    out.error(file+'=>'+oneExpress+' not in express_code');
  //    return
  //  }
  //
  //  var giftID = i[0];
  //  var uid = i[1];
  //  var orderForm = i[2];
  //  command.push('./cli.js -u order --gift '+giftID+' --uid '+uid+' --post "'+ orderForm+'"');
  //});
  //
  //return command;
};

var main = function(){
  var files = fs.readdirSync('./files').filter(f =>f[0] !== '.'&&f[0]!=='~');
  var allCommand =[];
  files.map(file=>{
    console.log(file)
    run(file)
  });

  //allCommand = allCommand.join(";\n");
  //fs.writeFileSync('z_tool.sh', allCommand, { mode: 0o755});
};

main();