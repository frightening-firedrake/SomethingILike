import XLSX from "xlsx"
import XLSX_Style from "xlsx-style"
// // Acquire Data (reference to the HTML table)
// var table_elt = document.getElementById("my-table-id");

// // Extract Data (create a workbook object from the table)
// var workbook = XLSX.utils.table_to_book(table_elt);

// // Process Data (add a new row)
// var ws = workbook.Sheets["Sheet1"];
// XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});
// Package and Release Data (`writeFile` tries to write and save an XLSB file)
// XLSX.writeFile(workbook, "Report.xlsb");
/* Initial row */
var ws = XLSX.utils.aoa_to_sheet([ "SheetJS".split("") ]);
// console.log(ws)
// var workbook = XLSX.read(ws);
/* Write data starting at A2 */
XLSX.utils.sheet_add_aoa(ws, [[1,2], [2,3], [3,4]], {origin: "A2"});

/* Write data starting at E2 */
XLSX.utils.sheet_add_aoa(ws, [[5,6,7], [6,7,8], [7,8,9]], {origin:{r:1, c:4}});

/* Append row */
XLSX.utils.sheet_add_aoa(ws, [[4,5,6,7,8,9,0]], {origin: -1});
XLSX.utils.sheet_add_aoa(ws, [
  [ 1 ], // A1
  [ 2 ], // A2
  [ {t: "n", v: 3, f: "A3*A2"} ] // A3
], {origin: -1});
ws['A1'].l = { Target:"https://sheetjs.com", Tooltip:"Find us @ SheetJS.com!" };
ws['!merges']=[
	XLSX.utils.decode_range("B2:C2"),
	XLSX.utils.decode_range("B3:D4")
];
ws['!cols']=[
	{ 'wch': 7 },
	{ 'wch': 9 },
	{ 'wch': 13 },
	{ 'wch': 66 },
	{ 'wch': 1 },
]
ws['!rows']=[//带有样式时候无效
	{ 'hpt': 30 },
	{ 'hpt': 18 },
	{ 'hpt': 13 },
	{ 'hpt': 66 },
	{ 'hpt': 99 },
]
// sheet['!merges']=[

// { s:{ r:0, c:0}, e:{ r:1, c:0}},

// { s:{ r:0, c:1}, e:{ r:0, c:3}},
// { s:{ r:0, c:4}, e:{ r:0, c:8}},
// { s:{ r:0, c:9}, e:{ r:0, c:10}},
// ];
// sheet[item].s ={
// 	alignment:{
// 		horizontal:'center',
// 		vertical:'center',
// 	}
// }


// console.log(ws['A1'])
for(let key in ws){
	if(key[0]!=='!'){
		ws[key].s={
			font: {
				name: "宋体",
				sz: 12,
				color: {
					auto: 1,
				},
			},
			alignment:{
				wrapText: 1,
				horizontal:'center',
				vertical:'center',
			}
		}
		if(key[1]==='1'){
			ws[key].s.fill={
				fgColor:{rgb:'FFA3F4B1'}
			}
		}
	}
}
	console.log(ws)

var workbook = XLSX.utils.book_new();
// console.log(ws)
// console.log(XLSX.utils.sheet_to_html(ws));
// var workbook = XLSX.read(data, opts);
var worksheet = XLSX.utils.aoa_to_sheet([
  [ 1 ], // A1
  [ 2 ], // A2
  [ {t: "n", v: 3, f: "A1+A2"} ] // A3
]);
// var worksheet=XLSX.utils.aoa_to_sheet( [
//   [1],                             // <-- Write 1 to cell B3
//   ,                                // <-- Do nothing in row 4
//   [/*B5*/, /*C5*/, /*D5*/, "abc"]  // <-- Write "abc" to cell E5
// ], { origin: "B3" });
console.log('ok')
XLSX.utils.book_append_sheet(workbook, ws, '瞎起个名字');
XLSX.utils.book_append_sheet(workbook, worksheet, '瞎起个名字2');
// XLSX.writeFile(workbook, "Report.xlsx");
XLSX_Style.writeFile(workbook, "Report.xlsx");