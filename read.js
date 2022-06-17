var fs = require("fs");
// 读取目录readdir
var dirs=[]
var path='G:/zl20220311/SomethingILike/js'
// function findPathDir(path){
// 	fs.readdir(path, function(err, data){
// 		if(err){
// 			return console.error(err);
// 		}
// 		// console.log(data)
// 		data.forEach((v)=>{
// 			var newPath=path+'/'+v
// 			// console.log(newPath)
// 			fs.stat(newPath, function (err, stats) {
// 				if(err){
// 					return console.error(err);
// 				}
// 			    if(stats.isDirectory()){
// 					// console.log(newPath)
// 					dirs.push(newPath)
// 					findPathDir(newPath)
// 				}else{
// 					// console.log(v)
// 				}   
// 			})
// 		})
// 	})
// }
// findPathDir(path)
// 以下Sync方法
function findPathDirSync(path){
	var data=fs.readdirSync(path)
	data.forEach((v)=>{
		var newPath=path+'/'+v
		// console.log(newPath)
		var stats=fs.statSync(newPath)
		if(stats.isDirectory()){
			// console.log(newPath)
			dirs.push(newPath)
			findPathDirSync(newPath)
		}else{
			// console.log(v)
		}   
	})
	// console.log(dirs)
}

findPathDirSync(path)
	// console.log(dirs)
fs.writeFile('findPathDir.txt', dirs.join("\n"),  function(err) {
   if (err) {
	   return console.error(err);
   }
   console.log("目录写入成功！");
   console.log("--------我是分割线-------------")
});
// console.log(dirs)
// async function asyncFunc() {
//     await findPathDir(path);
// 	console.log(dirs)
// }
// asyncFunc();

// console.log(dirs)
// console.log(dirs.toString())
// fs.writeFile('findPathDir.txt', dirs.toString(),  function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("数据写入成功！");
//    console.log("--------我是分割线-------------")
// });
// console.log(data)
// fs.stat('./', function (err, stats) {
//     // console.log(stats.isFile());   
//     // console.log(stats.isDirectory());   
//     console.log(stats);   
		  
// })