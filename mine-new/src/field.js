
var Field = function(row,col,rows,cols){
	this.row = row;
	this.col = col;
	this.mine = false;
	this.status = "closed"; //closed,open, flag, question
	this.id = getIdFromRowCol(row,col,rows);
	this.symbol = '';
	this.mineCount = 0;
};


Field.prototype.isMine = function(){
	return this.mine;
};

Field.prototype.isOpen = function(){
	return (this.status == "open");
};

Field.prototype.isFlag = function(){
	return(this.status =="flag");
};

Field.prototype.updateFieldView = function(type){
	var classType;
	var symbol = getSymbol(type);

	var field = document.getElementById(this.id);
	field.innerHTML = symbol;
	console.log("type of type is "+ typeof type +"and type value is " +type);
	if(type == 0){
		classType ="hollow";
		field.innerHTML = '';
	}
	else if(type ==1 ){
		classType = "one";
	}
	else if(type ==2 ){
		classType = "two";
	}
	else if(typeof type == "number"){
		classType = "number"
	}
	else{
		classType = type;
	}
	field.className = classType;
};


Field.prototype.getNextState = function(){
	switch(this.status){

		case "closed":
			return "flag";
		break;
		case "flag":
			return "question";
		break;
		case "question":
			return "closed";
		break;

	}

};


function getSymbol(type){

	switch(type){

		case "mine":
			return '✹';
		break;

		case "flag":
			return '⚑';
		break;

		case "blast":
			return '✹';
		break;

		case "question":
			return "?";
		break;
		case "cross":
			return "✕";
		break;
			case "closed":
		return '';
		break;
		case "open":
			return '';
		break;

		default:
		return  type;



	}

};

