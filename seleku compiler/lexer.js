var fs = require("fs");
var c = console["log"];
var tokens = "tambah 1 kali 2 kali 3";
var lexer = function (args) {
    return args.split("\n").filter(function (token) { return token.length > 0 && token !== "\r"; }).map(function (token) { return token.trim(); });
};
var position_of_attribute = 0;
var token_attribute = [
    "type",
    "value",
    "width",
    "height",
    "src",
];
var attribute_type = [
    [
        "=\"", "\""
    ],
    [
        "on:",
        null
    ]
];
var whitespaceLexer = function (args) {
    var attr_regex;
    var all_attr;
    var position = 0;
    for (var _i = 0, token_attribute_1 = token_attribute; _i < token_attribute_1.length; _i++) {
        var x = token_attribute_1[_i];
        position++;
        attr_regex = new RegExp("\\" + x + attribute_type[0][0] + "\\" + attribute_type[0][1]);
        all_attr.push(args.replace(args.match(attr_regex)[0], "#" + position));
    }
    c(all_attr);
    return args.split(" ").
        filter(function (token) { return token.length > 0; }).
        map(function (token) { return token.trim(); });
};
fs.open(__dirname + "/index.seleku", "r", function (err, data) {
    fs.readFile(data, function (err, _data) {
        var a = _data.toString("utf-8");
        var tokens = lexer(a);
        var html = tokens.filter(function (element) { return /\<.*?\>/.test(element); });
        var lexer_result = html.map(function (element) { return whitespaceLexer(element); });
        c(lexer_result);
    });
});
