Util = {};

Util.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

Util.xlsxError = function(row, text) {
    throw new Meteor.Error("xlsx-error", "Row " + row + ": " + text);
}

Util.getCell = function(worksheet, cell) {

    cell = worksheet[cell];
    if (!cell) return false;
    if (!cell.v) return false;
    if (!cell.v.toString().length) return false;
    return cell.v.toString().trim();

}

Util.validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
