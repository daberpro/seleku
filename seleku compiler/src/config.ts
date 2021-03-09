let declaration: string[] = [
    "#html",
    "#css",
    "#js"
];

exports.declarate = (query: string): string[]=>{
    for(let decorator of declaration){
        query = query.replace(decorator,"#sapartor");
    }
    return query.split("#sapartor");
}

