"use strict";
let declaration = [
    "#html",
    "#css",
    "#js"
];
exports.declarate = (query) => {
    for (let decorator of declaration) {
        query = query.replace(decorator, "#sapartor");
    }
    return query.split("#sapartor");
};
