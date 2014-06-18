var Player = function(name, color) {
    this.name = name;
    this.color = color;
}

Player.prototype.getName = function() {
    return this.name;
}

Player.prototype.getColor = function() {
    return this.color;
}