let Joss_utility_class = [];
let oneProps = {
    "dbs-":{
        "box-shadow": {
            value: "0px 2px 5px rgba(0,0,0,$)",
            type: ""
        }
    },
    "c-": {
        "color": {
            value: null,
            type: ""
        }
    },
    "ffs-": {
        "font-family": "sans-serif"
    },
    "bottom-": {
        "bottom": {
            value: null,
            type: ""
        }
    },
    "top-": {
        "top": {
            value: null,
            type: ""
        }
    },
    "left-": {
        "left": {
            value: null,
            type: ""
        }
    },
    "right-": {
        "right": {
            value: null,
            type: ""
        }
    },
    "cur-": {
        "cursor": {
            value: null,
            type: ""
        }
    },
    "br-": {
        "border": {
            value: null,
            type: ""
        }
    },
    "pos-": {
        "position": {
            value: null,
            type: ""
        }
    },
    "pad-": {
        "padding": {
            value: null,
            type: ""
        }
    },
    "m-": {
        "margin": {
            value: null,
            type: ""
        }
    },
    "t-": {
        "top": {
            value: null,
            type: ""
        }
    },
    "bg-": {
        "background": {
            value: null,
            type: ""
        }
    },
    "d-": {
        "display": {
            value: null,
            type: ""
        }
    },
    "w-": {
        "width": {
            value: null,
            type: ""
        }
    },
    "h-": {
        "height": {
            value: null,
            type: ""
        }
    },
    "o-": {
        "opacity": {
            value: null,
            type: ""
        }
    },
    "f-": {
        "filter": {
            value: null,
            type: ""
        }
    },

    "t-": {
        "transform": {
            value: null,
            type: ""
        }
    },
}

let twoProps = {
    "p-t-": {
        "padding-top": {
            value: null,
            type: ""
        },
    },
    "br-r-": {
        "border-radius": {
            value: null,
            type: ""
        },
    },
    "p-b-": {
        "padding-bottom": {
            value: null,
            type: ""
        },
    },
    "f-s-": {
        "font-size": {
            value: null,
            type: ""
        }
    },
    "bg-c-": {
        "background-color": {
            value: null,
            type: ""
        }
    },
    "bg-i-": {
        "background-image": {
            value: 'url("$")',
            type: ""
        }
    },
    "o-l-": {
        "outline": {
            value: null,
            type: ""
        }
    },
    "t-t-": {
        "text-transform": {
            value: null,
            type: ""
        }
    },
    "f-w-": {
        "font-weight": {
            value: null,
            type: ""
        }
    },
    "f-f-": {
        "font-family": {
            value: null,
            type: ""
        }
    },
    "l-s-": {
        "letter-spacing": {
            value: null,
            type: ""
        }
    },
    "b-s-": {
        "box-shadow": {
            value: null,
            type: ""
        }
    },
    "bg-g-": {
        "background": {
            value: "linear-gradient(to bottom, $)",
            type: ""
        }
    },
    "j-c-": {
        "justify-content": {
            value: null,
            type: ""
        }
    },
    "flex-d-": {
        "flex-direction": {
            value: null,
            type: ""
        }
    },
    "flex-w-": {
        "flex-wrap": {
            value: null,
            type: ""
        }
    },
    "align-i-": {
        "align-items": {
            value: null,
            type: ""
        }
    }
}

class joss_overload {

    my_class = "";
    my_element;

    constructor(obj) {
        if (obj.class) {
            this.my_class = obj.class;
            this.my_element = obj.element;
        }
    }

    oneClassDirection() {

        let Class = this.my_class;
        let Allclass = [];
        let index = -1;
        let g = "";
        let name = "";
        let property = [];


        for (let x in oneProps) {
            Allclass.push(x);
        }

        Allclass.forEach((i) => {
            if (Class.match(i)) {

                const class_name = Class;

                let result = Class.split(/-/igm).filter((j) => {
                    return i.split(/-/igm).indexOf(j) !== -1;
                });

                if (result.length !== 0 && result.length === 1) {
                    for (let x in oneProps[i]) {

                        index++;

                        property.push(x + ": ");

                        if (typeof oneProps[i][x] === "object") {
                            if (Class.split(/-/igm)[Class.split(/-/igm).length - 1].match(/\(.*?\)/) && oneProps[i][x].value === null) {
                                oneProps[i][x].value = Class.split(/-/igm)[Class.split(/-/igm).length - 1].replace(/\(/igm, "").replace(/\)/igm, "");
                                property[index] += oneProps[i][x].value + oneProps[i][x].type + ";";
                                Class = Class.replace(Class.split(/-/igm)[Class.split(/-/igm).length - 1], CREATE_UUID());
                            } else if (oneProps[i][x].value === null) {
                                oneProps[i][x].value = Class.split(/-/igm)[Class.split(/-/igm).length - 1];
                                property[index] += oneProps[i][x].value + oneProps[i][x].type + ";";
                                Class = Class.replace(Class.split(/-/igm)[Class.split(/-/igm).length - 1], CREATE_UUID());
                            } else if (oneProps[i][x].value.match(/\$/igm)) {
                                oneProps[i][x].value = oneProps[i][x].value.replace(/\$/igm, Class.split(/-/igm)[Class.split(/-/igm).length - 1]);
                                property[index] += oneProps[i][x].value + oneProps[i][x].type + ";";
                                Class = Class.replace(Class.split(/-/igm)[Class.split(/-/igm).length - 1], CREATE_UUID());
                            } else {
                                oneProps[i][x].value = oneProps[i][x].value.replace(/\$/igm, Class.split(/-/igm)[Class.split(/-/igm).length - 1]);
                                property[index] += oneProps[i][x].value + oneProps[i][x].type + ";";
                                Class = Class.replace(Class.split(/-/igm)[Class.split(/-/igm).length - 1], CREATE_UUID());
                            }

                            // di sini woi di benerin

                        } else {
                            property[index] += oneProps[i][x] + ";";
                        }
                        g = `.${Class}{${property.join(" ")}}`;
                        name = class_name;

                        this.my_element.className = this.my_element.className.replace(class_name, Class);
                        if(typeof oneProps[i][x] === "object"){
                            oneProps[i][x].value = null;
                        }
                    }
                }

            }
        });

        for (let x in Joss_utility_class) {
            if (name.length > 0) {
                if (Joss_utility_class[x].Name === name) {

                    // do something
                    this.my_element.className = this.my_element.className.replace(Class, Joss_utility_class[x].Class);
                    return "";

                }
            }
        }

        if (g.length > 0 && name.length > 0) {
            Joss_utility_class.push({
                Class: Class,
                Name: name,
                glob: g
            });
        }

        return g;

    }

    twoClassDirection() {

        let a = this.my_class;
        let Allclass = [];
        let index = -1;
        let property = [];
        let g = "";
        let name = "";

        for (let x in twoProps) {
            Allclass.push(x);
        }



        Allclass.forEach((i) => {

            if (a.match(i)) {

                const class_name = a;

                let result = a.split(/-/igm).filter((j) => {
                    return i.split(/-/igm).indexOf(j) !== -1;
                });

                if (result.length === 2) {
                    for (let x in twoProps[i]) {
                        if (twoProps[i].hasOwnProperty(x)) {
                            index++;

                            property.push(x + ": ");

                            if (typeof twoProps[i][x] === "object") {
                                if (a.split(/-/igm)[a.split(/-/igm).length - 1].match(/\(.*?\)/) && twoProps[i][x].value === null) {
                                    twoProps[i][x].value = a.split(/-/igm)[a.split(/-/igm).length - 1].replace(/^\(/igm, "").replace(/\)$/igm, "");
                                    property[index] += twoProps[i][x].value + twoProps[i][x].type + ";";
                                    a = a.replace(a.split(/-/igm)[a.split(/-/igm).length - 1], CREATE_UUID());
                                } else if (twoProps[i][x].value === null) {
                                    twoProps[i][x].value = a.split(/-/igm)[a.split(/-/igm).length - 1];
                                    property[index] += twoProps[i][x].value + twoProps[i][x].type + ";";
                                    a = a.replace(a.split(/-/igm)[a.split(/-/igm).length - 1], CREATE_UUID());
                                } else if (twoProps[i][x].value.match(/\$/igm)) {
                                    twoProps[i][x].value = twoProps[i][x].value.replace(/\$/igm, a.split(/-/igm)[a.split(/-/igm).length - 1]);
                                    property[index] += twoProps[i][x].value + twoProps[i][x].type + ";";
                                    a = a.replace(a.split(/-/igm)[a.split(/-/igm).length - 1], CREATE_UUID());
                                } else {
                                    twoProps[i][x].value = twoProps[i][x].value.replace(/\$/igm, a.split(/-/igm)[a.split(/-/igm).length - 1]);
                                    property[index] += twoProps[i][x].value + twoProps[i][x].type + ";";
                                    a = a.replace(a.split(/-/igm)[a.split(/-/igm).length - 1], CREATE_UUID());
                                }

                            } else {
                                property[index] += twoProps[i][x] + ";";
                            }
                            g = `.${a}{${property.join(" ")}}`;
                            name = class_name;
                            this.my_element.className = this.my_element.className.replace(class_name, a);
                            twoProps[i][x].value = null
                        }
                    }
                }
            }
        });

        for (let x in Joss_utility_class) {
            if (name.length > 0) {
                if (Joss_utility_class[x].Name === name) {

                    // do something
                    this.my_element.className = this.my_element.className.replace(a, Joss_utility_class[x].Class);
                    return "";

                }
            }
        }

        if (g.length > 0 && name.length > 0) {
            Joss_utility_class.push({
                Class: a,
                Name: name,
                glob: g
            });
        }

        return g;
    }

    update() {
        let style = document.createElement("style");
        let all = [];
        Joss_utility_class.forEach((i) => {
            all.push(i.glob);
        });
        style.textContent = all.join(" ")

        if (document.querySelector("style")) {
            document.querySelector("style").textContent += all.join(" ");
            return;
        } else {
            document.head.appendChild(style);
            return;
        }
    }
}