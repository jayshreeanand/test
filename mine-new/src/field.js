var Field = function() {
	this.currStatus = 'closed';
	this.value = 0;
};


Field.prototype.getStatus = function(){

	return this.currStatus;
};

Field.prototype.getValue = function(){
	return this.value;
};

Field.prototype.isMine = function(row, col) {
	return( 'm' == this.value );
};

Field.prototype.isHole = function(row, col)
{
	return( 0 == this.value );
};

Field.prototype.isFlag = function(row, col) {
	return( 'flag' == this.currStatus );
};
Field.prototype.isOpen = function(row, col) {
	return( 'down' == this.currStatus );
};

