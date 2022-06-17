// import ejs from "ejs"

// var fs = require("fs");

// // 异步读取
// fs.readFile('input.txt', function (err, data) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("异步读取: " + data.toString());
// });

// // 同步读取
// var data = fs.readFileSync('input.txt');
// console.log("同步读取: " + data.toString());

// console.log("程序执行完毕。");
// var fs = require("fs");

// // 异步打开文件
// console.log("准备打开文件！");
// fs.open('input.txt', 'r+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//   console.log("文件打开成功！");     
// });
// var fs = require("fs");
// let ejs = require('ejs');
// let keyList = require("./keyList.js");
// var fs = require("fs");
// let ejs = require('ejs');
// let keyList = require("./keyList.js");
// var xlsx = require('node-xlsx');
import fs from "fs"
import ejs from "ejs"
import xlsx from "node-xlsx"
import {keyList} from "./keyList.js"
//    var template=
// `<template>
//   <div class="app-container">
// 	<div class="panel">
// 	  <div class="title">{{ $route.meta.title }}</div>
// 	  <%= people[0].label %>
// 	  <GeneralForm
// 		ref="GeneralForm"
// 		:readonly="readonly"
// 		:formdata-creator="formdataCreator"
// 		:img-list="imgList"
// 		:btn-text="btnText"
// 		:file-list="fileList"
// 		@submitForm="submitForm"
// 		@cancel="cancel"
// 	  />
// 	</div>
//   </div>
// </template>`
// // 读取并新建页面开始
// fs.readFile('create.vue',  function(err, data) {
//    if (err) {
//        return console.error(err);
//    }
   
//    var html = ejs.render(data.toString(), {keyList: keyList});
// 	console.log("准备写入文件");
// 	fs.writeFile('input.vue',html,  function(err) {
// 	   if (err) {
// 		   return console.error(err);
// 	   }
// 	});
// })
// // 读取并新建页面结束
// 读取目录readdir
// fs.readdir('./', function(err, data){
// 	if(err){
// 		return console.error(err);
// 	}
// 	console.log(data)
// })



// 读取excel
// 解析得到文档中的所有 sheet
var sheets = xlsx.parse('流程和表单数量.xlsx');
// sheets.forEach(function(v){
// 	console.log(v.name)
// 	v.data.forEach((v2)=>{
// 		console.log(v2)
// 	})
	
// })
var s={
	alignment:{
		horizontal:'center',
		vertical:'center,'
	}
};
var data=[]
sheets[3].data.forEach(function(v,i){
	// console.log(v[7])
	if(i==0){
		data.push(['序号',v[7]])
	}else{
		data.push([i,v[7]])
	}
})
// 生成excel
// const data = [
//   [1, 2, 3],
//   [true, false, null, 'sheetjs'],
//   ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
//   ['baz', null, 'qux'],
// ];
const sheetOptions = {'!cols': [{wch: 6}, {wch: 17}]};
var buffer = xlsx.build([{name: '东方红流程表', data: data}], {sheetOptions});
// const data = [
//   [1, 2, 3],
//   [true, false, null, 'sheetjs'],
//   ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
//   ['baz', null, 'qux'],
// ];
// const sheetOptions = {'!cols': [{wch: 6}, {wch: 7}, {wch: 10}, {wch: 20}]};
// var buffer = xlsx.build([{name: 'mySheetName', data: data}], {sheetOptions});
// const data = [
//   [1, 2, 3],
//   [true, false, null, 'sheetjs'],
//   ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
//   ['baz', null, 'qux'],
// ];
// const range = {s: {c: 1, r: 1}, e: {c: 1, r: 6}}; // A1:A4
// const sheetOptions = {'!merges': [range]};
// var buffer = xlsx.build([{name: 'mySheetName', data: data}], {sheetOptions}); 
// const rowAverage = [[{t: 'n', z: 10, f: '=AVERAGE(2:2)'}], [1, 2, 3]];
// var buffer = xlsx.build([{name: 'Average Formula', data: rowAverage}]);
fs.writeFile('a.xlsx', buffer, function(err) {
    if (err) {
        console.log("Write failed: " + err);
        return;
    }
    console.log("Write completed.");
});
   // console.log("数据写入成功！");
   // console.log("--------我是分割线-------------")
   // console.log("读取写入的数据！");
   // fs.readFile('input.txt', function (err, data) {
   //    if (err) {
   //       return console.error(err);
   //    }
   //    console.log("异步读取文件数据: " + data.toString());
   // });
// console.log("准备写入文件");
// fs.readFile('keyList.js',  function(err, data) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("读取写入的数据！");
//    console.log("--------我是分割线-------------")
//    console.log("数据写入成功！");
//    fs.writeFile('input2.txt', data, function (err) {
//       if (err) {
//          return console.error(err);
//       }
//       console.log("异步读取文件数据: " + data.toString());
//    });
// });
// import {keyList} from "./keyList.js"
// console.log(keyList[0].label)


// var fs = require("fs");
// 读取目录readdir
// fs.readdir('./', function(err, data){
// 	if(err){
// 		return console.error(err);
// 	}
// 	console.log(data)
// })