'use strict';(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("dylan",function(f){function k(a,e,b){e.tokenize=b;return b(a,e)}function l(a,e){var b=a.peek();if("'"==b||'"'==b)return a.next(),k(a,e,m(b,"string"));if("/"==b){a.next();if(a.eat("*"))return k(a,e,q);if(a.eat("/"))return a.skipToEnd(),"comment";a.backUp(1)}else if(/[+\-\d\.]/.test(b)){if(a.match(/^[+-]?[0-9]*\.[0-9]*([esdx][+-]?[0-9]+)?/i)||
a.match(/^[+-]?[0-9]+([esdx][+-]?[0-9]+)/i)||a.match(/^[+-]?\d+/))return"number"}else{if("#"==b){a.next();b=a.peek();if('"'==b)return a.next(),k(a,e,m('"',"string"));if("b"==b)return a.next(),a.eatWhile(/[01]/),"number";if("x"==b)return a.next(),a.eatWhile(/[\da-f]/i),"number";if("o"==b)return a.next(),a.eatWhile(/[0-7]/),"number";if("#"==b)return a.next(),"punctuation";if("["==b||"("==b)return a.next(),"bracket";if(a.match(/f|t|all-keys|include|key|next|rest/i))return"atom";a.eatWhile(/[-a-zA-Z]/);
return"error"}if("~"==b)return a.next(),b=a.peek(),"="==b&&(a.next(),b=a.peek(),"="==b&&a.next()),"operator";if(":"==b){a.next();b=a.peek();if("="==b)return a.next(),"operator";if(":"==b)return a.next(),"punctuation"}else{if(-1!="[](){}".indexOf(b))return a.next(),"bracket";if(-1!=".,".indexOf(b))return a.next(),"punctuation";if(a.match("end"))return"keyword"}}for(var c in d)if(d.hasOwnProperty(c)&&(e=d[c],e instanceof Array&&e.some(function(b){return a.match(b)})||a.match(e)))return r[c];if(/[+\-*\/^=<>&|]/.test(b))return a.next(),
"operator";if(a.match("define"))return"def";a.eatWhile(/[\w\-]/);if(n[a.current()])return p[a.current()];if(a.current().match(t))return"variable";a.next();return"variable-2"}function q(a,c){for(var b=!1,e=!1,d=0,g;g=a.next();){if("/"==g&&b)if(0<d)d--;else{c.tokenize=l;break}else"*"==g&&e&&d++;b="*"==g;e="/"==g}return"comment"}function m(a,c){return function(b,e){for(var d=!1,g,f=!1;null!=(g=b.next());){if(g==a&&!d){f=!0;break}d=!d&&"\\"==g}if(f||!d)e.tokenize=l;return c}}var c={unnamedDefinition:["interface"],
namedDefinition:"module library macro C-struct C-union C-function C-callable-wrapper".split(" "),typeParameterizedDefinition:["class","C-subtype","C-mapped-subtype"],otherParameterizedDefinition:["method","function","C-variable","C-address"],constantSimpleDefinition:["constant"],variableSimpleDefinition:["variable"],otherSimpleDefinition:["generic","domain","C-pointer-type","table"],statement:"if block begin method case for select when unless until while iterate profiling dynamic-bind".split(" "),
separator:"finally exception cleanup else elseif afterwards".split(" "),other:"above below by from handler in instance let local otherwise slot subclass then to keyed-by virtual".split(" "),signalingCalls:"signal error cerror break check-type abort".split(" ")};c.otherDefinition=c.unnamedDefinition.concat(c.namedDefinition).concat(c.otherParameterizedDefinition);c.definition=c.typeParameterizedDefinition.concat(c.otherDefinition);c.parameterizedDefinition=c.typeParameterizedDefinition.concat(c.otherParameterizedDefinition);
c.simpleDefinition=c.constantSimpleDefinition.concat(c.variableSimpleDefinition).concat(c.otherSimpleDefinition);c.keyword=c.statement.concat(c.separator).concat(c.other);var t=/^[-_a-zA-Z?!*@<>$%]+/,d={symbolKeyword:"[-_a-zA-Z?!*@<>$%]+:",symbolClass:"<[-_a-zA-Z?!*@<>$%]+>",symbolGlobal:"\\*[-_a-zA-Z?!*@<>$%]+\\*",symbolConstant:"\\$[-_a-zA-Z?!*@<>$%]+"},r={symbolKeyword:"atom",symbolClass:"tag",symbolGlobal:"variable-2",symbolConstant:"variable-3"},h;for(h in d)d.hasOwnProperty(h)&&(d[h]=new RegExp("^"+
d[h]));d.keyword=[/^with(?:out)?-[-_a-zA-Z?!*@<>$%]+/];var u={keyword:"keyword",definition:"def",simpleDefinition:"def",signalingCalls:"builtin"},n={},p={};["keyword","definition","simpleDefinition","signalingCalls"].forEach(function(a){c[a].forEach(function(c){n[c]=a;p[c]=u[a]})});return{startState:function(){return{tokenize:l,currentIndent:0}},token:function(a,c){return a.eatSpace()?null:c.tokenize(a,c)},blockCommentStart:"/*",blockCommentEnd:"*/"}});f.defineMIME("text/x-dylan","dylan")});