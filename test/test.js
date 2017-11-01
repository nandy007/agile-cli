var questions = require('../source/template-agileui/questions');

var util = require('../libs/util');

util.initRepl(questions, 'package', function(err, result){
    console.log(err, result);
});