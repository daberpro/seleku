let fs = require("fs");
let all_file_context = [];

class grammar{

	constructor(args){
		this._path = args.path;
        this._file_name = args.file_name;
        this.config = args.config;
        if (args.content) this.content = args.content; 
	}

	read(){

		if(this.file_name instanceof Array)
			this.file_name.forEach((i)=>{

				fs.open(this._path+i,"r",(err,data)=>{
					if(err) throw err;

					 // baca file
                    fs.readFile(data, (err, _data) => {
                        if (err) throw err;
                        all_file_context.push(_data.toString('utf8'));
                    });
				});

			});
		else
			fs.open(this._path+this._file_name,"r",(err,data)=>{
				if(err) throw err;
				 // baca file
                fs.readFile(data, (err, _data) => {
                    if (err) throw err;
                    console.log(_data.toString('utf8'))
                });
			});
		return all_file_context;

	}


}

module.exports = {
	grammar,
	all_file_context
};

