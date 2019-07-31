// model/user   --schema

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
  firstname: String,
  lastname: String,
	sex: String,
  age: Number,
  password: String
});

module.exports = mongoose.model('User', userSchema);
