let {grammar,all_file_context} = require("./grammar.js");


let a = new grammar({
	path: __dirname,
	file_name: "/index.seleku",
	config: "",
	content: ""
});


console.log(a.read())

console.log(all_file_context)