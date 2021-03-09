"use strict";
let { getDataFile, CREATE_UUID, lexer, data_to_ast, whitespaceLexer, AST } = require("./global_def");
let { declarate, registerDecorator, } = require("./config");
let { ["log"]: c } = console;
var typeOfElement;
(function (typeOfElement) {
    typeOfElement[typeOfElement["multiElement"] = 0] = "multiElement";
    typeOfElement[typeOfElement["singleElement"] = 1] = "singleElement";
})(typeOfElement || (typeOfElement = {}));
var is_tag;
(function (is_tag) {
    is_tag[is_tag["openTag"] = 0] = "openTag";
    is_tag[is_tag["closeTag"] = 1] = "closeTag";
})(is_tag || (is_tag = {}));
let Compiler = async () => {
    let seleku_file = await (() => getDataFile("../index.seleku"))();
    let tokens = lexer(seleku_file.data);
    let tokens_html = [];
    let final_data_to_ast = [];
    // ==========================================================
    // variabel di bawah ini merupakan variabel yang akan menerima 
    // hasilregister oleh decorator
    // ==========================================================
    let Html = [];
    let Css = [];
    let Js = [];
    // ============================================================
    // =========================================================
    // fungsi di bawah merupakan fungsi yang berperan dalam meregister
    // decorator silahkan di modifikasi jika ingin menambahkan decorator
    // yang belum di daftarkan secara default decorator yang di daftarkan
    // adalah HTML,CSS,JS
    // ========================================================
    tokens.forEach((element) => tokens_html.push(element.string));
    let all_tokens_of_web = declarate(tokens_html.join("\n"));
    all_tokens_of_web.forEach(tokens_of_seleku => {
        if (/\#*\html/igm.test(tokens_of_seleku)) {
            Html = [tokens_of_seleku];
        }
        if (/\#css*/igm.test(tokens_of_seleku)) {
            Css = [tokens_of_seleku];
        }
        if (/\#*\js/igm.test(tokens_of_seleku)) {
            Js = [tokens_of_seleku];
        }
    });
    // ============================================================
    const lexer_result = Html.join("").split("\n").map(element => whitespaceLexer(element));
    let position = 0;
    let g = async () => {
        let a = await (() => data_to_ast(lexer_result))();
        a.forEach((lexer, index) => {
            if (lexer.type === typeOfElement[0] && lexer.is === is_tag[0] || lexer.type === typeOfElement[1]) {
                position++;
                final_data_to_ast.push({ el: lexer.element, col: lexer.col, pos: position });
            }
            else if (lexer.type === typeOfElement[0] && lexer.is === is_tag[1]) {
                final_data_to_ast.push({ el: lexer.element, col: lexer.col, pos: position });
            }
        });
        AST(final_data_to_ast);
        // c(tokens);
    };
    g();
};
Compiler();
