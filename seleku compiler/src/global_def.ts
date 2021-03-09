let fs = require("fs");

let token_analyze: Array<token_a> = [
	{
		token: "div",
		type: "multiElement",
		col: 0,
		is: null,
		element: []
	},
	{
		token: "h1",
		type: "multiElement",
		col: 0,
		is: null,
		element: []
	},
	{
		token: "p",
		type: "multiElement",
		col: 0,
		is: null,
		element: []
	},
	{
		token: "b-s",
		type: "multiElement",
		col: 0,
		is: null,
		element: []
	},
	{
		token: "input",
		type: "singleElement",
		col: 0,
		is: null,
		element: []
	},
];

//custom fungsi uuid 
exports.CREATE_UUID = (): string =>{
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


//fungsi imni untuk mengambil data dari file seleku
exports.getDataFile = (file_name: string): Promise<data> =>{

	return (new Promise((resolve,reject)=>{
		fs.open(file_name,"r",(err: any,data: any): void =>{

			fs.readFile(data,(err: any,_data: any)=>{
				let a: string[] = _data.toString("utf-8").split(/\n/);
				let numbers : number | undefined = 0;
				let data_of_html: Array<html> = [];
				let elements:string = "";

				a.forEach((element,index)=>{
					if(/\<.*?\>/igm.test(element) && /\<*\/.*?\>/igm.test(element)){
						if([...element.match(/\<.*?\>/igm) || [1]].length > 1){
							elements = element.replace(/\<.*?\>/igm," ");
							element = element.replace(elements.trim(),element.replace(/\<.*?\>/igm,"\n"));
							a[index] = element;
						}
					}

						
					if(/\<.*?\>/igm.test(element))
						data_of_html.push({
							element: element,
							col: index
						});
						
						
				});
				
				

				resolve({data: a.join("\n"),info_of_data: data_of_html});
			});

		});
	}));
}

//fungsi lexer yaitu fungsi yang mendata setiap query string
exports.lexer = (args: string): Array<html_string> =>{
	let data = args.split("\n").filter(token => token.length > 0 && token !== "\r");

	let data_all: Array<html_string> = [];

	data.forEach((token,index) => data_all.push({string: token.trim(),col: index}));

	return data_all;
}


// fungsi yang mengembalikan data yang telah di lexer dan memberikan informasi yang lebih mendetail

exports.data_to_ast = (data_from_lexers: string[][]): Promise<Array<token_a>>=>{


	return (new Promise((resolve,reject)=>{
		let data_from_lexer = data_from_lexers;
		const analyze_syntax: any = (()=>{
			let data: any = [];
			let g: Array<token_a> = [];
			data_from_lexer.forEach((i,col)=>{

				i.forEach((e,index)=>{
					 token_analyze.forEach(j =>{
					 	if(e.match(new RegExp(`\<${j.token}`)) || e.match(new RegExp(`\<*\/${j.token}`))){
							
					 		(new RegExp(`\<*\/${j.token}\>`).test(e))?
					 			(() =>{  
					 				g.push({
					 					token: j.token +"/",
										type: j.type,
										col: col,
										is: "closeTag",
										element: i
					 				});
					 			})() :
					 			(() =>{
					 			
					 				g.push({
					 					token: j.token,
										type: j.type,
										col: col,
										is: "openTag",
										element: i
					 				});
					 			})();

					 	}
					 });
				});
			});
			resolve(g);
		})();

	}));
}

// ini adalah fungsi yang memisahkan attribut html pada seleku 
exports.whitespaceLexer = (args: string): string[] =>{

	let all_attr: Array<string> = [];
	let position: Array<{id: string, data: string}> = [];
	
	args.split("\n").forEach((i,index)=>{
		if(i.match(/\w*\=".*?\"/)) 
			all_attr = [...all_attr,...i.match(/\w*\=".*?\"/igm) || []];
			all_attr.forEach((x,y) =>{ 
				args = args.replace(/\w*\=".*?\"/,` #${y} `);
				position.push({id: `#${y}`,data:x});
			});		 
	});

	let compire = args.split(" ").
	filter(token => token.length > 0);

	let result: Array<string> = [];

	compire.forEach((token,index)=>{
		position.forEach(x =>{
			if(new RegExp(x.id).test(token))
				compire[index] = token.replace(x.id,x.data);
		})
	});

	return compire;
}


interface final_data{
	el: string[],
	col: number | string,
	pos: number
}

exports.AST = (args: Array<final_data>)=>{

  for(let i = 0; i < args.length; i++){

    console.log(args[i].pos);

  }

}
