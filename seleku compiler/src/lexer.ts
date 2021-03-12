
let {
	getDataFile,
	CREATE_UUID,
	lexer,
	data_to_ast,
	whitespaceLexer,
	AST
} = require("./global_def");
let {
	declarate,
	registerDecorator,
} = require("./config");

let {
	["log"]: c
} = console;


interface token_a{
	token: string,
	type: string,
	col: string | number,
	is: string | null,
	element: string[]
}

interface html{
	element: string,
	col: number
}

interface data{
	data: string,
	info_of_data: Array<html>
}


enum typeOfElement{
	multiElement,
	singleElement
}

enum is_tag{
	openTag,
	closeTag
}

interface html_string{
	string: string,
	col: number
}

interface final_data{
	el: string[],
	col: number | string,
	pos: number | string,
	token: string
}

let Compiler = async (): Promise<void> =>{
	let seleku_file: data = await (()=> getDataFile("../index.seleku"))();

	let tokens: Array<html_string> = lexer(seleku_file.data);
	let tokens_html: string[] = [];
	let final_data_to_ast: Array<final_data> = [];

	// ==========================================================
	// variabel di bawah ini merupakan variabel yang akan menerima 
	// hasil register oleh decorator
	// ==========================================================

		let Html : string[] = [];
		let Css : string[] = [];
		let Js : string[] = [];

	// ============================================================

	// =========================================================
	// fungsi di bawah merupakan fungsi yang berperan dalam meregister
	// decorator silahkan di modifikasi jika ingin menambahkan decorator
	// yang belum di daftarkan secara default decorator yang di daftarkan
	// adalah HTML,CSS,JS
	// ========================================================

		tokens.forEach((element)=> tokens_html.push(element.string));
		
		let all_tokens_of_web : string[] = declarate(tokens_html.join("\n"));
		all_tokens_of_web.forEach(tokens_of_seleku =>{
			if(/\#*\html/igm.test(tokens_of_seleku)){
				Html = [tokens_of_seleku];
			}
			if(/\#css*/igm.test(tokens_of_seleku)){
				Css = [tokens_of_seleku];
			}
			if(/\#*\js/igm.test(tokens_of_seleku)){
				Js = [tokens_of_seleku];
			}
		});

	// ============================================================


	const lexer_result: string[][] = Html.join("").split("\n").map(element => whitespaceLexer(element));

	let position: number = 0;

	let g = async (): Promise<void> =>{

		let a: Array<token_a> = await (():Promise<Array<token_a>>=> data_to_ast(lexer_result))();

		a.forEach((lexer,index) =>{
			if(lexer.type === typeOfElement[0] && lexer.is === is_tag[0]){
				position++
				final_data_to_ast.push({el: lexer.element,col: lexer.col, pos: position,token: lexer.token});

			}else if(lexer.type === typeOfElement[1]){
				// =========== before ==========
				final_data_to_ast.push({el: lexer.element,col: lexer.col, pos: position,token: lexer.token});
				// =========== after ============
				position++
				final_data_to_ast.push({el: lexer.element,col: lexer.col, pos: position,token: lexer.token});
			}
			else if(lexer.type === typeOfElement[0] && lexer.is === is_tag[1]){
				final_data_to_ast.push({el: lexer.element,col: lexer.col, pos: position,token: lexer.token});
			}

		});

		final_data_to_ast[-1] = {el: [],col: -1,pos: -1,token:""}
		AST(final_data_to_ast);


		// c(tokens);
	}

	g();
}

Compiler();


