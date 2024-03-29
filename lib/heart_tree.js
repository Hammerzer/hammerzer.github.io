// jscex.min.js
(function(){var b={DEBUG:1,INFO:2,WARN:3,ERROR:4},d=function(){this.level=b.WARN};d.prototype={log:function(a){try{console.log(a)}catch(b){}},debug:function(a){this.level<=b.DEBUG&&this.log(a)},info:function(a){this.level<=b.INFO&&this.log(a)},warn:function(a){this.level<=b.WARN&&this.log(a)},error:function(a){this.level<=b.ERROR&&this.log(a)}};var e=function(a){var b=[],c;for(c in a)b.push(c);return b},c=function(a){a._forInKeys=e;a.Logging={Logger:d,Level:b};a.logger=new d;a.modules={};a.binders=
{};a.builders={}},f=typeof define==="function"&&!define.amd,g=typeof require==="function"&&typeof define==="function"&&define.amd;typeof require==="function"&&typeof module!=="undefined"&&module.exports?c(module.exports):f?define("jscex",function(a,b,d){c(d.exports)}):g?define("jscex",function(){var a={};c(a);return a}):(typeof Jscex=="undefined"&&(Jscex={}),c(Jscex))})();

//jscex-parser.js
/***********************************************************************

  A JavaScript tokenizer / parser / beautifier / compressor.

  This version is suitable for Node.js.  With minimal changes (the
  exports stuff) it should work on any JS platform.

  This file contains the tokenizer/parser.  It is a port to JavaScript
  of parse-js [1], a JavaScript parser library written in Common Lisp
  by Marijn Haverbeke.  Thank you Marijn!

  [1] http://marijn.haverbeke.nl/parse-js/

  Exported functions:

    - tokenizer(code) -- returns a function.  Call the returned
      function to fetch the next token.

    - parse(code) -- returns an AST of the given JavaScript code.

  -------------------------------- (C) ---------------------------------

                           Author: Mihai Bazon
                         <mihai.bazon@gmail.com>
                       http://mihai.bazon.net/blog

  Distributed under the BSD license:

    Copyright 2010 (c) Mihai Bazon <mihai.bazon@gmail.com>
    Based on parse-js (http://marijn.haverbeke.nl/parse-js/).

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/

    (function () {

        /* -----[ Tokenizer (constants) ]----- */
        
        var KEYWORDS = array_to_hash([
                "break",
                "case",
                "catch",
                "const",
                "continue",
                "default",
                "delete",
                "do",
                "else",
                "finally",
                "for",
                "function",
                "if",
                "in",
                "instanceof",
                "new",
                "return",
                "switch",
                "throw",
                "try",
                "typeof",
                "var",
                "void",
                "while",
                "with"
        ]);
        
        var RESERVED_WORDS = array_to_hash([
                "abstract",
                "boolean",
                "byte",
                "char",
                "class",
                "debugger",
                "double",
                "enum",
                "export",
                "extends",
                "final",
                "float",
                "goto",
                "implements",
                "import",
                "int",
                "interface",
                "long",
                "native",
                "package",
                "private",
                "protected",
                "public",
                "short",
                "static",
                "super",
                "synchronized",
                "throws",
                "transient",
                "volatile"
        ]);
        
        var KEYWORDS_BEFORE_EXPRESSION = array_to_hash([
                "return",
                "new",
                "delete",
                "throw",
                "else",
                "case"
        ]);
        
        var KEYWORDS_ATOM = array_to_hash([
                "false",
                "null",
                "true",
                "undefined"
        ]);
        
        var OPERATOR_CHARS = array_to_hash(characters("+-*&%=<>!?|~^"));
        
        var RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
        var RE_OCT_NUMBER = /^0[0-7]+$/;
        var RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
        
        var OPERATORS = array_to_hash([
                "in",
                "instanceof",
                "typeof",
                "new",
                "void",
                "delete",
                "++",
                "--",
                "+",
                "-",
                "!",
                "~",
                "&",
                "|",
                "^",
                "*",
                "/",
                "%",
                ">>",
                "<<",
                ">>>",
                "<",
                ">",
                "<=",
                ">=",
                "==",
                "===",
                "!=",
                "!==",
                "?",
                "=",
                "+=",
                "-=",
                "/=",
                "*=",
                "%=",
                ">>=",
                "<<=",
                ">>>=",
                "|=",
                "^=",
                "&=",
                "&&",
                "||"
        ]);
        
        var WHITESPACE_CHARS = array_to_hash(characters(" \n\r\t\u200b"));
        
        var PUNC_BEFORE_EXPRESSION = array_to_hash(characters("[{}(,.;:"));
        
        var PUNC_CHARS = array_to_hash(characters("[]{}(),;:"));
        
        var REGEXP_MODIFIERS = array_to_hash(characters("gmsiy"));
        
        /* -----[ Tokenizer ]----- */
        
        // regexps adapted from http://xregexp.com/plugins/#unicode
        var UNICODE = {
                letter: new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
                non_spacing_mark: new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),
                space_combining_mark: new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),
                connector_punctuation: new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")
        };
        
        function is_letter(ch) {
                return UNICODE.letter.test(ch);
        };
        
        function is_digit(ch) {
                ch = ch.charCodeAt(0);
                return ch >= 48 && ch <= 57; //XXX: find out if "UnicodeDigit" means something else than 0..9
        };
        
        function is_alphanumeric_char(ch) {
                return is_digit(ch) || is_letter(ch);
        };
        
        function is_unicode_combining_mark(ch) {
                return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
        };
        
        function is_unicode_connector_punctuation(ch) {
                return UNICODE.connector_punctuation.test(ch);
        };
        
        function is_identifier_start(ch) {
                return ch == "$" || ch == "_" || is_letter(ch);
        };
        
        function is_identifier_char(ch) {
                return is_identifier_start(ch)
                        || is_unicode_combining_mark(ch)
                        || is_digit(ch)
                        || is_unicode_connector_punctuation(ch)
                        || ch == "\u200c" // zero-width non-joiner <ZWNJ>
                        || ch == "\u200d" // zero-width joiner <ZWJ> (in my ECMA-262 PDF, this is also 200c)
                ;
        };
        
        function parse_js_number(num) {
                if (RE_HEX_NUMBER.test(num)) {
                        return parseInt(num.substr(2), 16);
                } else if (RE_OCT_NUMBER.test(num)) {
                        return parseInt(num.substr(1), 8);
                } else if (RE_DEC_NUMBER.test(num)) {
                        return parseFloat(num);
                }
        };
        
        function JS_Parse_Error(message, line, col, pos) {
                this.message = message;
                this.line = line;
                this.col = col;
                this.pos = pos;
                try {
                        ({})();
                } catch(ex) {
                        this.stack = ex.stack;
                };
        };
        
        JS_Parse_Error.prototype.toString = function() {
                return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")" + "\n\n" + this.stack;
        };
        
        function js_error(message, line, col, pos) {
                throw new JS_Parse_Error(message, line, col, pos);
        };
        
        function is_token(token, type, val) {
                return token.type == type && (val == null || token.value == val);
        };
        
        var EX_EOF = {};
        
        function tokenizer($TEXT) {
        
                var S = {
                        text            : $TEXT.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, ''),
                        pos             : 0,
                        tokpos          : 0,
                        line            : 0,
                        tokline         : 0,
                        col             : 0,
                        tokcol          : 0,
                        newline_before  : false,
                        regex_allowed   : false,
                        comments_before : []
                };
        
                function peek() { return S.text.charAt(S.pos); };
        
                function next(signal_eof) {
                        var ch = S.text.charAt(S.pos++);
                        if (signal_eof && !ch)
                                throw EX_EOF;
                        if (ch == "\n") {
                                S.newline_before = true;
                                ++S.line;
                                S.col = 0;
                        } else {
                                ++S.col;
                        }
                        return ch;
                };
        
                function eof() {
                        return !S.peek();
                };
        
                function find(what, signal_eof) {
                        var pos = S.text.indexOf(what, S.pos);
                        if (signal_eof && pos == -1) throw EX_EOF;
                        return pos;
                };
        
                function start_token() {
                        S.tokline = S.line;
                        S.tokcol = S.col;
                        S.tokpos = S.pos;
                };
        
                function token(type, value, is_comment) {
                        S.regex_allowed = ((type == "operator" && !HOP(UNARY_POSTFIX, value)) ||
                                           (type == "keyword" && HOP(KEYWORDS_BEFORE_EXPRESSION, value)) ||
                                           (type == "punc" && HOP(PUNC_BEFORE_EXPRESSION, value)));
                        var ret = {
                                type  : type,
                                value : value,
                                line  : S.tokline,
                                col   : S.tokcol,
                                pos   : S.tokpos,
                                nlb   : S.newline_before
                        };
                        if (!is_comment) {
                                ret.comments_before = S.comments_before;
                                S.comments_before = [];
                        }
                        S.newline_before = false;
                        return ret;
                };
        
                function skip_whitespace() {
                        while (HOP(WHITESPACE_CHARS, peek()))
                                next();
                };
        
                function read_while(pred) {
                        var ret = "", ch = peek(), i = 0;
                        while (ch && pred(ch, i++)) {
                                ret += next();
                                ch = peek();
                        }
                        return ret;
                };
        
                function parse_error(err) {
                        js_error(err, S.tokline, S.tokcol, S.tokpos);
                };
        
                function read_num(prefix) {
                        var has_e = false, after_e = false, has_x = false, has_dot = prefix == ".";
                        var num = read_while(function(ch, i){
                                if (ch == "x" || ch == "X") {
                                        if (has_x) return false;
                                        return has_x = true;
                                }
                                if (!has_x && (ch == "E" || ch == "e")) {
                                        if (has_e) return false;
                                        return has_e = after_e = true;
                                }
                                if (ch == "-") {
                                        if (after_e || (i == 0 && !prefix)) return true;
                                        return false;
                                }
                                if (ch == "+") return after_e;
                                after_e = false;
                                if (ch == ".") {
                                        if (!has_dot && !has_x)
                                                return has_dot = true;
                                        return false;
                                }
                                return is_alphanumeric_char(ch);
                        });
                        if (prefix)
                                num = prefix + num;
                        var valid = parse_js_number(num);
                        if (!isNaN(valid)) {
                                return token("num", valid);
                        } else {
                                parse_error("Invalid syntax: " + num);
                        }
                };
        
                function read_escaped_char() {
                        var ch = next(true);
                        switch (ch) {
                            case "n" : return "\n";
                            case "r" : return "\r";
                            case "t" : return "\t";
                            case "b" : return "\b";
                            case "v" : return "\v";
                            case "f" : return "\f";
                            case "0" : return "\0";
                            case "x" : return String.fromCharCode(hex_bytes(2));
                            case "u" : return String.fromCharCode(hex_bytes(4));
                            default  : return ch;
                        }
                };
        
                function hex_bytes(n) {
                        var num = 0;
                        for (; n > 0; --n) {
                                var digit = parseInt(next(true), 16);
                                if (isNaN(digit))
                                        parse_error("Invalid hex-character pattern in string");
                                num = (num << 4) | digit;
                        }
                        return num;
                };
        
                function read_string() {
                        return with_eof_error("Unterminated string constant", function(){
                                var quote = next(), ret = "";
                                for (;;) {
                                        var ch = next(true);
                                        if (ch == "\\") ch = read_escaped_char();
                                        else if (ch == quote) break;
                                        ret += ch;
                                }
                                return token("string", ret);
                        });
                };
        
                function read_line_comment() {
                        next();
                        var i = find("\n"), ret;
                        if (i == -1) {
                                ret = S.text.substr(S.pos);
                                S.pos = S.text.length;
                        } else {
                                ret = S.text.substring(S.pos, i);
                                S.pos = i;
                        }
                        return token("comment1", ret, true);
                };
        
                function read_multiline_comment() {
                        next();
                        return with_eof_error("Unterminated multiline comment", function(){
                                var i = find("*/", true),
                                    text = S.text.substring(S.pos, i),
                                    tok = token("comment2", text, true);
                                S.pos = i + 2;
                                S.line += text.split("\n").length - 1;
                                S.newline_before = text.indexOf("\n") >= 0;
        
                                // https://github.com/mishoo/UglifyJS/issues/#issue/100
                                if (/^@cc_on/i.test(text)) {
                                        warn("WARNING: at line " + S.line);
                                        warn("*** Found \"conditional comment\": " + text);
                                        warn("*** UglifyJS DISCARDS ALL COMMENTS.  This means your code might no longer work properly in Internet Explorer.");
                                }
        
                                return tok;
                        });
                };
        
                function read_name() {
                        var backslash = false, name = "", ch;
                        while ((ch = peek()) != null) {
                                if (!backslash) {
                                        if (ch == "\\") backslash = true, next();
                                        else if (is_identifier_char(ch)) name += next();
                                        else break;
                                }
                                else {
                                        if (ch != "u") parse_error("Expecting UnicodeEscapeSequence -- uXXXX");
                                        ch = read_escaped_char();
                                        if (!is_identifier_char(ch)) parse_error("Unicode char: " + ch.charCodeAt(0) + " is not valid in identifier");
                                        name += ch;
                                        backslash = false;
                                }
                        }
                        return name;
                };
        
                function read_regexp() {
                        return with_eof_error("Unterminated regular expression", function(){
                                var prev_backslash = false, regexp = "", ch, in_class = false;
                                while ((ch = next(true))) if (prev_backslash) {
                                        regexp += "\\" + ch;
                                        prev_backslash = false;
                                } else if (ch == "[") {
                                        in_class = true;
                                        regexp += ch;
                                } else if (ch == "]" && in_class) {
                                        in_class = false;
                                        regexp += ch;
                                } else if (ch == "/" && !in_class) {
                                        break;
                                } else if (ch == "\\") {
                                        prev_backslash = true;
                                } else {
                                        regexp += ch;
                                }
                                var mods = read_name();
                                return token("regexp", [ regexp, mods ]);
                        });
                };
        
                function read_operator(prefix) {
                        function grow(op) {
                                if (!peek()) return op;
                                var bigger = op + peek();
                                if (HOP(OPERATORS, bigger)) {
                                        next();
                                        return grow(bigger);
                                } else {
                                        return op;
                                }
                        };
                        return token("operator", grow(prefix || next()));
                };
        
                function handle_slash() {
                        next();
                        var regex_allowed = S.regex_allowed;
                        switch (peek()) {
                            case "/":
                                S.comments_before.push(read_line_comment());
                                S.regex_allowed = regex_allowed;
                                return next_token();
                            case "*":
                                S.comments_before.push(read_multiline_comment());
                                S.regex_allowed = regex_allowed;
                                return next_token();
                        }
                        return S.regex_allowed ? read_regexp() : read_operator("/");
                };
        
                function handle_dot() {
                        next();
                        return is_digit(peek())
                                ? read_num(".")
                                : token("punc", ".");
                };
        
                function read_word() {
                        var word = read_name();
                        return !HOP(KEYWORDS, word)
                                ? token("name", word)
                                : HOP(OPERATORS, word)
                                ? token("operator", word)
                                : HOP(KEYWORDS_ATOM, word)
                                ? token("atom", word)
                                : token("keyword", word);
                };
        
                function with_eof_error(eof_error, cont) {
                        try {
                                return cont();
                        } catch(ex) {
                                if (ex === EX_EOF) parse_error(eof_error);
                                else throw ex;
                        }
                };
        
                function next_token(force_regexp) {
                        if (force_regexp)
                                return read_regexp();
                        skip_whitespace();
                        start_token();
                        var ch = peek();
                        if (!ch) return token("eof");
                        if (is_digit(ch)) return read_num();
                        if (ch == '"' || ch == "'") return read_string();
                        if (HOP(PUNC_CHARS, ch)) return token("punc", next());
                        if (ch == ".") return handle_dot();
                        if (ch == "/") return handle_slash();
                        if (HOP(OPERATOR_CHARS, ch)) return read_operator();
                        if (ch == "\\" || is_identifier_start(ch)) return read_word();
                        parse_error("Unexpected character '" + ch + "'");
                };
        
                next_token.context = function(nc) {
                        if (nc) S = nc;
                        return S;
                };
        
                return next_token;
        
        };
        
        /* -----[ Parser (constants) ]----- */
        
        var UNARY_PREFIX = array_to_hash([
                "typeof",
                "void",
                "delete",
                "--",
                "++",
                "!",
                "~",
                "-",
                "+"
        ]);
        
        var UNARY_POSTFIX = array_to_hash([ "--", "++" ]);
        
        var ASSIGNMENT = (function(a, ret, i){
                while (i < a.length) {
                        ret[a[i]] = a[i].substr(0, a[i].length - 1);
                        i++;
                }
                return ret;
        })(
                ["+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&="],
                { "=": true },
                0
        );
        
        var PRECEDENCE = (function(a, ret){
                for (var i = 0, n = 1; i < a.length; ++i, ++n) {
                        var b = a[i];
                        for (var j = 0; j < b.length; ++j) {
                                ret[b[j]] = n;
                        }
                }
                return ret;
        })(
                [
                        ["||"],
                        ["&&"],
                        ["|"],
                        ["^"],
                        ["&"],
                        ["==", "===", "!=", "!=="],
                        ["<", ">", "<=", ">=", "in", "instanceof"],
                        [">>", "<<", ">>>"],
                        ["+", "-"],
                        ["*", "/", "%"]
                ],
                {}
        );
        
        var STATEMENTS_WITH_LABELS = array_to_hash([ "for", "do", "while", "switch" ]);
        
        var ATOMIC_START_TOKEN = array_to_hash([ "atom", "num", "string", "regexp", "name" ]);
        
        /* -----[ Parser ]----- */
        
        function NodeWithToken(str, start, end) {
                this.name = str;
                this.start = start;
                this.end = end;
        };
        
        NodeWithToken.prototype.toString = function() { return this.name; };
        
        function parse($TEXT, exigent_mode, embed_tokens) {
        
                var S = {
                        input       : typeof $TEXT == "string" ? tokenizer($TEXT, true) : $TEXT,
                        token       : null,
                        prev        : null,
                        peeked      : null,
                        in_function : 0,
                        in_loop     : 0,
                        labels      : []
                };
        
                S.token = next();
        
                function is(type, value) {
                        return is_token(S.token, type, value);
                };
        
                function peek() { return S.peeked || (S.peeked = S.input()); };
        
                function next() {
                        S.prev = S.token;
                        if (S.peeked) {
                                S.token = S.peeked;
                                S.peeked = null;
                        } else {
                                S.token = S.input();
                        }
                        return S.token;
                };
        
                function prev() {
                        return S.prev;
                };
        
                function croak(msg, line, col, pos) {
                        var ctx = S.input.context();
                        js_error(msg,
                                 line != null ? line : ctx.tokline,
                                 col != null ? col : ctx.tokcol,
                                 pos != null ? pos : ctx.tokpos);
                };
        
                function token_error(token, msg) {
                        croak(msg, token.line, token.col);
                };
        
                function unexpected(token) {
                        if (token == null)
                                token = S.token;
                        token_error(token, "Unexpected token: " + token.type + " (" + token.value + ")");
                };
        
                function expect_token(type, val) {
                        if (is(type, val)) {
                                return next();
                        }
                        token_error(S.token, "Unexpected token " + S.token.type + ", expected " + type);
                };
        
                function expect(punc) { return expect_token("punc", punc); };
        
                function can_insert_semicolon() {
                        return !exigent_mode && (
                                S.token.nlb || is("eof") || is("punc", "}")
                        );
                };
        
                function semicolon() {
                        if (is("punc", ";")) next();
                        else if (!can_insert_semicolon()) unexpected();
                };
        
                function as() {
                        return slice(arguments);
                };
        
                function parenthesised() {
                        expect("(");
                        var ex = expression();
                        expect(")");
                        return ex;
                };
        
                function add_tokens(str, start, end) {
                        return str instanceof NodeWithToken ? str : new NodeWithToken(str, start, end);
                };
        
                var statement = embed_tokens ? function() {
                        var start = S.token;
                        var ast = $statement.apply(this, arguments);
                        ast[0] = add_tokens(ast[0], start, prev());
                        return ast;
                } : $statement;
        
                function $statement() {
                        if (is("operator", "/")) {
                                S.peeked = null;
                                S.token = S.input(true); // force regexp
                        }
                        switch (S.token.type) {
                            case "num":
                            case "string":
                            case "regexp":
                            case "operator":
                            case "atom":
                                return simple_statement();
        
                            case "name":
                                return is_token(peek(), "punc", ":")
                                        ? labeled_statement(prog1(S.token.value, next, next))
                                        : simple_statement();
        
                            case "punc":
                                switch (S.token.value) {
                                    case "{":
                                        return as("block", block_());
                                    case "[":
                                    case "(":
                                        return simple_statement();
                                    case ";":
                                        next();
                                        return as("block");
                                    default:
                                        unexpected();
                                }
        
                            case "keyword":
                                switch (prog1(S.token.value, next)) {
                                    case "break":
                                        return break_cont("break");
        
                                    case "continue":
                                        return break_cont("continue");
        
                                    case "debugger":
                                        semicolon();
                                        return as("debugger");
        
                                    case "do":
                                        return (function(body){
                                                expect_token("keyword", "while");
                                                return as("do", prog1(parenthesised, semicolon), body);
                                        })(in_loop(statement));
        
                                    case "for":
                                        return for_();
        
                                    case "function":
                                        return function_(true);
        
                                    case "if":
                                        return if_();
        
                                    case "return":
                                        if (S.in_function == 0)
                                                croak("'return' outside of function");
                                        return as("return",
                                                  is("punc", ";")
                                                  ? (next(), null)
                                                  : can_insert_semicolon()
                                                  ? null
                                                  : prog1(expression, semicolon));
        
                                    case "switch":
                                        return as("switch", parenthesised(), switch_block_());
        
                                    case "throw":
                                        return as("throw", prog1(expression, semicolon));
        
                                    case "try":
                                        return try_();
        
                                    case "var":
                                        return prog1(var_, semicolon);
        
                                    case "const":
                                        return prog1(const_, semicolon);
        
                                    case "while":
                                        return as("while", parenthesised(), in_loop(statement));
        
                                    case "with":
                                        return as("with", parenthesised(), statement());
        
                                    default:
                                        unexpected();
                                }
                        }
                };
        
                function labeled_statement(label) {
                        S.labels.push(label);
                        var start = S.token, stat = statement();
                        if (exigent_mode && !HOP(STATEMENTS_WITH_LABELS, stat[0]))
                                unexpected(start);
                        S.labels.pop();
                        return as("label", label, stat);
                };
        
                function simple_statement() {
                        return as("stat", prog1(expression, semicolon));
                };
        
                function break_cont(type) {
                        var name = is("name") ? S.token.value : null;
                        if (name != null) {
                                next();
                                if (!member(name, S.labels))
                                        croak("Label " + name + " without matching loop or statement");
                        }
                        else if (S.in_loop == 0)
                                croak(type + " not inside a loop or switch");
                        semicolon();
                        return as(type, name);
                };
        
                function for_() {
                        expect("(");
                        var init = null;
                        if (!is("punc", ";")) {
                                init = is("keyword", "var")
                                        ? (next(), var_(true))
                                        : expression(true, true);
                                if (is("operator", "in"))
                                        return for_in(init);
                        }
                        return regular_for(init);
                };
        
                function regular_for(init) {
                        expect(";");
                        var test = is("punc", ";") ? null : expression();
                        expect(";");
                        var step = is("punc", ")") ? null : expression();
                        expect(")");
                        return as("for", init, test, step, in_loop(statement));
                };
        
                function for_in(init) {
                        var lhs = init[0] == "var" ? as("name", init[1][0]) : init;
                        next();
                        var obj = expression();
                        expect(")");
                        return as("for-in", init, lhs, obj, in_loop(statement));
                };
        
                var function_ = embed_tokens ? function() {
                        var start = prev();
                        var ast = $function_.apply(this, arguments);
                        ast[0] = add_tokens(ast[0], start, prev());
                        return ast;
                } : $function_;
        
                function $function_(in_statement) {
                        var name = is("name") ? prog1(S.token.value, next) : null;
                        if (in_statement && !name)
                                unexpected();
                        expect("(");
                        return as(in_statement ? "defun" : "function",
                                  name,
                                  // arguments
                                  (function(first, a){
                                          while (!is("punc", ")")) {
                                                  if (first) first = false; else expect(",");
                                                  if (!is("name")) unexpected();
                                                  a.push(S.token.value);
                                                  next();
                                          }
                                          next();
                                          return a;
                                  })(true, []),
                                  // body
                                  (function(){
                                          ++S.in_function;
                                          var loop = S.in_loop;
                                          S.in_loop = 0;
                                          var a = block_();
                                          --S.in_function;
                                          S.in_loop = loop;
                                          return a;
                                  })());
                };
        
                function if_() {
                        var cond = parenthesised(), body = statement(), belse;
                        if (is("keyword", "else")) {
                                next();
                                belse = statement();
                        }
                        return as("if", cond, body, belse);
                };
        
                function block_() {
                        expect("{");
                        var a = [];
                        while (!is("punc", "}")) {
                                if (is("eof")) unexpected();
                                a.push(statement());
                        }
                        next();
                        return a;
                };
        
                var switch_block_ = curry(in_loop, function(){
                        expect("{");
                        var a = [], cur = null;
                        while (!is("punc", "}")) {
                                if (is("eof")) unexpected();
                                if (is("keyword", "case")) {
                                        next();
                                        cur = [];
                                        a.push([ expression(), cur ]);
                                        expect(":");
                                }
                                else if (is("keyword", "default")) {
                                        next();
                                        expect(":");
                                        cur = [];
                                        a.push([ null, cur ]);
                                }
                                else {
                                        if (!cur) unexpected();
                                        cur.push(statement());
                                }
                        }
                        next();
                        return a;
                });
        
                function try_() {
                        var body = block_(), bcatch, bfinally;
                        if (is("keyword", "catch")) {
                                next();
                                expect("(");
                                if (!is("name"))
                                        croak("Name expected");
                                var name = S.token.value;
                                next();
                                expect(")");
                                bcatch = [ name, block_() ];
                        }
                        if (is("keyword", "finally")) {
                                next();
                                bfinally = block_();
                        }
                        if (!bcatch && !bfinally)
                                croak("Missing catch/finally blocks");
                        return as("try", body, bcatch, bfinally);
                };
        
                function vardefs(no_in) {
                        var a = [];
                        for (;;) {
                                if (!is("name"))
                                        unexpected();
                                var name = S.token.value;
                                next();
                                if (is("operator", "=")) {
                                        next();
                                        a.push([ name, expression(false, no_in) ]);
                                } else {
                                        a.push([ name ]);
                                }
                                if (!is("punc", ","))
                                        break;
                                next();
                        }
                        return a;
                };
        
                function var_(no_in) {
                        return as("var", vardefs(no_in));
                };
        
                function const_() {
                        return as("const", vardefs());
                };
        
                function new_() {
                        var newexp = expr_atom(false), args;
                        if (is("punc", "(")) {
                                next();
                                args = expr_list(")");
                        } else {
                                args = [];
                        }
                        return subscripts(as("new", newexp, args), true);
                };
        
                function expr_atom(allow_calls) {
                        if (is("operator", "new")) {
                                next();
                                return new_();
                        }
                        if (is("operator") && HOP(UNARY_PREFIX, S.token.value)) {
                                return make_unary("unary-prefix",
                                                  prog1(S.token.value, next),
                                                  expr_atom(allow_calls));
                        }
                        if (is("punc")) {
                                switch (S.token.value) {
                                    case "(":
                                        next();
                                        return subscripts(prog1(expression, curry(expect, ")")), allow_calls);
                                    case "[":
                                        next();
                                        return subscripts(array_(), allow_calls);
                                    case "{":
                                        next();
                                        return subscripts(object_(), allow_calls);
                                }
                                unexpected();
                        }
                        if (is("keyword", "function")) {
                                next();
                                return subscripts(function_(false), allow_calls);
                        }
                        if (HOP(ATOMIC_START_TOKEN, S.token.type)) {
                                var atom = S.token.type == "regexp"
                                        ? as("regexp", S.token.value[0], S.token.value[1])
                                        : as(S.token.type, S.token.value);
                                return subscripts(prog1(atom, next), allow_calls);
                        }
                        unexpected();
                };
        
                function expr_list(closing, allow_trailing_comma, allow_empty) {
                        var first = true, a = [];
                        while (!is("punc", closing)) {
                                if (first) first = false; else expect(",");
                                if (allow_trailing_comma && is("punc", closing)) break;
                                if (is("punc", ",") && allow_empty) {
                                        a.push([ "atom", "undefined" ]);
                                } else {
                                        a.push(expression(false));
                                }
                        }
                        next();
                        return a;
                };
        
                function array_() {
                        return as("array", expr_list("]", !exigent_mode, true));
                };
        
                function object_() {
                        var first = true, a = [];
                        while (!is("punc", "}")) {
                                if (first) first = false; else expect(",");
                                if (!exigent_mode && is("punc", "}"))
                                        // allow trailing comma
                                        break;
                                var type = S.token.type;
                                var name = as_property_name();
                                if (type == "name" && (name == "get" || name == "set") && !is("punc", ":")) {
                                        a.push([ as_name(), function_(false), name ]);
                                } else {
                                        expect(":");
                                        a.push([ name, expression(false) ]);
                                }
                        }
                        next();
                        return as("object", a);
                };
        
                function as_property_name() {
                        switch (S.token.type) {
                            case "num":
                            case "string":
                                return prog1(S.token.value, next);
                        }
                        return as_name();
                };
        
                function as_name() {
                        switch (S.token.type) {
                            case "name":
                            case "operator":
                            case "keyword":
                            case "atom":
                                return prog1(S.token.value, next);
                            default:
                                unexpected();
                        }
                };
        
                function subscripts(expr, allow_calls) {
                        if (is("punc", ".")) {
                                next();
                                return subscripts(as("dot", expr, as_name()), allow_calls);
                        }
                        if (is("punc", "[")) {
                                next();
                                return subscripts(as("sub", expr, prog1(expression, curry(expect, "]"))), allow_calls);
                        }
                        if (allow_calls && is("punc", "(")) {
                                next();
                                return subscripts(as("call", expr, expr_list(")")), true);
                        }
                        if (allow_calls && is("operator") && HOP(UNARY_POSTFIX, S.token.value)) {
                                return prog1(curry(make_unary, "unary-postfix", S.token.value, expr),
                                             next);
                        }
                        return expr;
                };
        
                function make_unary(tag, op, expr) {
                        if ((op == "++" || op == "--") && !is_assignable(expr))
                                croak("Invalid use of " + op + " operator");
                        return as(tag, op, expr);
                };
        
                function expr_op(left, min_prec, no_in) {
                        var op = is("operator") ? S.token.value : null;
                        if (op && op == "in" && no_in) op = null;
                        var prec = op != null ? PRECEDENCE[op] : null;
                        if (prec != null && prec > min_prec) {
                                next();
                                var right = expr_op(expr_atom(true), prec, no_in);
                                return expr_op(as("binary", op, left, right), min_prec, no_in);
                        }
                        return left;
                };
        
                function expr_ops(no_in) {
                        return expr_op(expr_atom(true), 0, no_in);
                };
        
                function maybe_conditional(no_in) {
                        var expr = expr_ops(no_in);
                        if (is("operator", "?")) {
                                next();
                                var yes = expression(false);
                                expect(":");
                                return as("conditional", expr, yes, expression(false, no_in));
                        }
                        return expr;
                };
        
                function is_assignable(expr) {
                        if (!exigent_mode) return true;
                        switch (expr[0]) {
                            case "dot":
                            case "sub":
                            case "new":
                            case "call":
                                return true;
                            case "name":
                                return expr[1] != "this";
                        }
                };
        
                function maybe_assign(no_in) {
                        var left = maybe_conditional(no_in), val = S.token.value;
                        if (is("operator") && HOP(ASSIGNMENT, val)) {
                                if (is_assignable(left)) {
                                        next();
                                        return as("assign", ASSIGNMENT[val], left, maybe_assign(no_in));
                                }
                                croak("Invalid assignment");
                        }
                        return left;
                };
        
                function expression(commas, no_in) {
                        if (arguments.length == 0)
                                commas = true;
                        var expr = maybe_assign(no_in);
                        if (commas && is("punc", ",")) {
                                next();
                                return as("seq", expr, expression(true, no_in));
                        }
                        return expr;
                };
        
                function in_loop(cont) {
                        try {
                                ++S.in_loop;
                                return cont();
                        } finally {
                                --S.in_loop;
                        }
                };
        
                return as("toplevel", (function(a){
                        while (!is("eof"))
                                a.push(statement());
                        return a;
                })([]));
        
        };
        
        /* -----[ Utilities ]----- */
        
        function curry(f) {
                var args = slice(arguments, 1);
                return function() { return f.apply(this, args.concat(slice(arguments))); };
        };
        
        function prog1(ret) {
                if (ret instanceof Function)
                        ret = ret();
                for (var i = 1, n = arguments.length; --n > 0; ++i)
                        arguments[i]();
                return ret;
        };
        
        function array_to_hash(a) {
                var ret = {};
                for (var i = 0; i < a.length; ++i)
                        ret[a[i]] = true;
                return ret;
        };
        
        function slice(a, start) {
                return Array.prototype.slice.call(a, start == null ? 0 : start);
        };
        
        function characters(str) {
                return str.split("");
        };
        
        function member(name, array) {
                for (var i = array.length; --i >= 0;)
                        if (array[i] === name)
                                return true;
                return false;
        };
        
        function HOP(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
        };
        
        var warn = function() {};
        
        /* -----[ Exports ]----- */
        
        var init = function (root) {
            if (root.modules["parser"]) {
                return;
            }
            
            root.parse = parse;
            
            root.modules["parser"] = true;
        }
        
        var isCommonJS = (typeof require !== "undefined" && typeof module !== "undefined" && module.exports);
        var isAmd = (typeof define !== "undefined" && define.amd);
        
        if (isCommonJS) {
            module.exports.init = init;
        } else if (isAmd) {
            define("jscex-parser", function () {
                return { init: init };
            });
        } else {
            if (typeof Jscex === "undefined") {
                throw new Error('Missing root object, please load "jscex" module first.');
            }
            
            init(Jscex);
        }
        
        /*
        scope.tokenizer = tokenizer;
        scope.parse = parse;
        scope.slice = slice;
        scope.curry = curry;
        scope.member = member;
        scope.array_to_hash = array_to_hash;
        scope.PRECEDENCE = PRECEDENCE;
        scope.KEYWORDS_ATOM = KEYWORDS_ATOM;
        scope.RESERVED_WORDS = RESERVED_WORDS;
        scope.KEYWORDS = KEYWORDS;
        scope.ATOMIC_START_TOKEN = ATOMIC_START_TOKEN;
        scope.OPERATORS = OPERATORS;
        scope.is_alphanumeric_char = is_alphanumeric_char;
        scope.set_logger = function (logger) {
            warn = logger;
        };
        */
        
        })();

// jscex-jit.js
(function () {
    
    var codeGenerator = (typeof eval("(function () {})") == "function") ?
        function (code) { return code; } :
        function (code) { return "false || " + code; };
        
    // support string type only.
    var stringify = (typeof JSON !== "undefined" && JSON.stringify) ?
        function (s) { return JSON.stringify(s); } :
        (function () {
            // Implementation comes from JSON2 (http://www.json.org/js.html)
        
            var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            
            var meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            }
            
            return function (s) {
                // If the string contains no control characters, no quote characters, and no
                // backslash characters, then we can safely slap some quotes around it.
                // Otherwise we must also replace the offending characters with safe escape
                // sequences.

                escapable.lastIndex = 0;
                return escapable.test(s) ? '"' + s.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 's' ? c :
                        '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' : '"' + s + '"';
            };
        })();
    
    // seed defined in global
    if (typeof __jscex__tempVarSeed === "undefined") {
        __jscex__tempVarSeed = 0;
    }

    var init = function (root) {
    
        if (root.modules["jit"]) {
            return;
        }
    
        function JscexTreeGenerator(binder) {
            this._binder = binder;
            this._root = null;
        }
        JscexTreeGenerator.prototype = {

            generate: function (ast) {

                var params = ast[2], statements = ast[3];

                this._root = { type: "delay", stmts: [] };

                this._visitStatements(statements, this._root.stmts);

                return this._root;
            },

            _getBindInfo: function (stmt) {

                var type = stmt[0];
                if (type == "stat") {
                    var expr = stmt[1];
                    if (expr[0] == "call") {
                        var callee = expr[1];
                        if (callee[0] == "name" && callee[1] == this._binder && expr[2].length == 1) {
                            return {
                                expression: expr[2][0],
                                argName: "",
                                assignee: null
                            };
                        }
                    } else if (expr[0] == "assign") {
                        var assignee = expr[2];
                        expr = expr[3];
                        if (expr[0] == "call") {
                            var callee = expr[1];
                            if (callee[0] == "name" && callee[1] == this._binder && expr[2].length == 1) {
                                return {
                                    expression: expr[2][0],
                                    argName: "$$_result_$$",
                                    assignee: assignee
                                };
                            }
                        }
                    }
                } else if (type == "var") {
                    var defs = stmt[1];
                    if (defs.length == 1) {
                        var item = defs[0];
                        var name = item[0];
                        var expr = item[1];
                        if (expr && expr[0] == "call") {
                            var callee = expr[1];
                            if (callee[0] == "name" && callee[1] == this._binder && expr[2].length == 1) {
                                return {
                                    expression: expr[2][0],
                                    argName: name,
                                    assignee: null
                                };                            
                            }
                        }
                    }
                } else if (type == "return") {
                    var expr = stmt[1];
                    if (expr && expr[0] == "call") {
                        var callee = expr[1];
                        if (callee[0] == "name" && callee[1] == this._binder && expr[2].length == 1) {
                            return {
                                expression: expr[2][0],
                                argName: "$$_result_$$",
                                assignee: "return"
                            };
                        }
                    }
                }

                return null;
            },

            _visitStatements: function (statements, stmts, index) {
                if (arguments.length <= 2) index = 0;

                if (index >= statements.length) {
                    stmts.push({ type: "normal" });
                    return this;
                }

                var currStmt = statements[index];
                var bindInfo = this._getBindInfo(currStmt);

                if (bindInfo) {
                    var bindStmt = { type: "bind", info: bindInfo };
                    stmts.push(bindStmt);

                    if (bindInfo.assignee != "return") {
                        bindStmt.stmts = [];
                        this._visitStatements(statements, bindStmt.stmts, index + 1);
                    }

                } else {
                    var type = currStmt[0];
                    if (type == "return" || type == "break" || type == "continue" || type == "throw") {

                        stmts.push({ type: type, stmt: currStmt });

                    } else if (type == "if" || type == "try" || type == "for" || type == "do"
                               || type == "while" || type == "switch" || type == "for-in") {

                        var newStmt = this._visit(currStmt);

                        if (newStmt.type == "raw") {
                            stmts.push(newStmt);
                            this._visitStatements(statements, stmts, index + 1);
                        } else {
                            var isLast = (index == statements.length - 1);
                            if (isLast) {
                                stmts.push(newStmt);
                            } else {

                                var combineStmt = {
                                    type: "combine",
                                    first: { type: "delay", stmts: [newStmt] },
                                    second: { type: "delay", stmts: [] }
                                };
                                stmts.push(combineStmt);

                                this._visitStatements(statements, combineStmt.second.stmts, index + 1);
                            }
                        }

                    } else {

                        stmts.push({ type: "raw", stmt: currStmt });

                        this._visitStatements(statements, stmts, index + 1);
                    }
                }

                return this;
            },

            _visit: function (ast) {

                var type = ast[0];

                function throwUnsupportedError() {
                    throw new Error('"' + type + '" is not currently supported.');
                }

                var visitor = this._visitors[type];

                if (visitor) {
                    return visitor.call(this, ast);
                } else {
                    throwUnsupportedError();
                }
            },

            _visitBody: function (ast, stmts) {
                if (ast[0] == "block") {
                    this._visitStatements(ast[1], stmts);
                } else {
                    this._visitStatements([ast], stmts);
                }
            },

            _noBinding: function (stmts) {
                switch (stmts[stmts.length - 1].type) {
                    case "normal":
                    case "return":
                    case "break":
                    case "throw":
                    case "continue":
                        return true;
                }

                return false;
            },

            _collectCaseStatements: function (cases, index) {
                var res = [];

                for (var i = index; i < cases.length; i++) {
                    var rawStmts = cases[i][1];
                    for (var j = 0; j < rawStmts.length; j++) {
                        if (rawStmts[j][0] == "break") {
                            return res
                        }

                        res.push(rawStmts[j]);
                    }
                }

                return res;
            },

            _visitors: {

                "for": function (ast) {

                    var bodyStmts = [];
                    var body = ast[4];
                    this._visitBody(body, bodyStmts);

                    if (this._noBinding(bodyStmts)) {
                        return { type: "raw", stmt: ast };
                    }

                    var delayStmt = { type: "delay", stmts: [] };
            
                    var setup = ast[1];
                    if (setup) {
                        delayStmt.stmts.push({ type: "raw", stmt: setup });
                    }

                    var loopStmt = { type: "loop", bodyFirst: false, bodyStmt: { type: "delay", stmts: bodyStmts } };
                    delayStmt.stmts.push(loopStmt);
                    
                    var condition = ast[2];
                    if (condition) {
                        loopStmt.condition = condition;
                    }
                    
                    var update = ast[3];
                    if (update) {
                        loopStmt.update = update;
                    }

                    return delayStmt;
                },

                "for-in": function (ast) {

                    var body = ast[4];
                    
                    var bodyStmts = [];
                    this._visitBody(body, bodyStmts);

                    if (this._noBinding(bodyStmts)) {
                        return { type: "raw", stmt: ast };
                    }
                
                    var id = (__jscex__tempVarSeed++);
                    var keysVar = "$$_keys_$$_" + id;
                    var indexVar = "$$_index_$$_" + id;
                    // var memVar = "$$_mem_$$_" + id;

                    var delayStmt = { type: "delay", stmts: [] };

                    // var members = Jscex._forInKeys(obj);
                    var keysAst = root.parse("var " + keysVar + " = Jscex._forInKeys(obj);")[1][0];
                    keysAst[1][0][1][2][0] = ast[3]; // replace obj with real AST;
                    delayStmt.stmts.push({ type: "raw", stmt: keysAst });

                    /*
                    // var members = [];
                    delayStmt.stmts.push({
                        type: "raw",
                        stmt: uglifyJS.parse("var " + membersVar + " = [];")[1][0]
                    });
                    
                    // for (var mem in obj) members.push(mem);
                    var keysAst = uglifyJS.parse("for (var " + memVar +" in obj) " + membersVar + ".push(" + memVar + ");")[1][0];
                    keysAst[3] = ast[3]; // replace the "obj" with real AST.
                    delayStmt.stmts.push({ type : "raw", stmt: keysAst});
                    */
                    
                    // var index = 0;
                    delayStmt.stmts.push({
                        type: "raw",
                        stmt: root.parse("var " + indexVar + " = 0;")[1][0]
                    });

                    // index < members.length
                    var condition = root.parse(indexVar + " < " + keysVar + ".length")[1][0][1];

                    // index++
                    var update = root.parse(indexVar + "++")[1][0][1];

                    var loopStmt = {
                        type: "loop",
                        bodyFirst: false,
                        update: update,
                        condition: condition,
                        bodyStmt: { type: "delay", stmts: [] }
                    };
                    delayStmt.stmts.push(loopStmt);

                    var varName = ast[2][1]; // ast[2] == ["name", m]
                    if (ast[1][0] == "var") {
                        loopStmt.bodyStmt.stmts.push({
                            type: "raw",
                            stmt: root.parse("var " + varName + " = " + keysVar + "[" + indexVar + "];")[1][0]
                        });
                    } else {
                        loopStmt.bodyStmt.stmts.push({
                            type: "raw",
                            stmt: root.parse(varName + " = " + keysVar + "[" + indexVar + "];")[1][0]
                        });
                    }

                    this._visitBody(body, loopStmt.bodyStmt.stmts);

                    return delayStmt;
                },

                "while": function (ast) {

                    var bodyStmts = [];
                    var body = ast[2];
                    this._visitBody(body, bodyStmts);

                    if (this._noBinding(bodyStmts)) {
                        return { type: "raw", stmt: ast }
                    }

                    var loopStmt = { type: "loop", bodyFirst: false, bodyStmt: { type: "delay", stmts: bodyStmts } };

                    var condition = ast[1];
                    loopStmt.condition = condition;

                    return loopStmt;
                },

                "do": function (ast) {

                    var bodyStmts = [];
                    var body = ast[2];
                    this._visitBody(body, bodyStmts);

                    if (this._noBinding(bodyStmts)) {
                        return { type: "raw", stmt: ast };
                    }

                    var loopStmt = { type: "loop", bodyFirst: true, bodyStmt: { type: "delay", stmts: bodyStmts } };

                    var condition = ast[1];
                    loopStmt.condition = condition;

                    return loopStmt;
                },

                "switch": function (ast) {
                    var noBinding = true;

                    var switchStmt = { type: "switch", item: ast[1], caseStmts: [] };

                    var cases = ast[2];
                    for (var i = 0; i < cases.length; i++) {                    
                        var caseStmt = { item: cases[i][0], stmts: [] };
                        switchStmt.caseStmts.push(caseStmt);

                        var statements = this._collectCaseStatements(cases, i);
                        this._visitStatements(statements, caseStmt.stmts);
                        noBinding = noBinding && this._noBinding(caseStmt.stmts);
                    }

                    if (noBinding) {
                        return { type: "raw", stmt: ast };
                    } else {
                        return switchStmt;
                    }
                },

                "if": function (ast) {

                    var noBinding = true;

                    var ifStmt = { type: "if", conditionStmts: [] };

                    var currAst = ast;
                    while (true) {
                        var condition = currAst[1];
                        var condStmt = { cond: condition, stmts: [] };
                        ifStmt.conditionStmts.push(condStmt);

                        var thenPart = currAst[2];
                        this._visitBody(thenPart, condStmt.stmts);

                        noBinding = noBinding && this._noBinding(condStmt.stmts);

                        var elsePart = currAst[3];
                        if (elsePart && elsePart[0] == "if") {
                            currAst = elsePart;
                        } else {
                            break;
                        }
                    }
        
                    var elsePart = currAst[3];
                    if (elsePart) {
                        ifStmt.elseStmts = [];

                        this._visitBody(elsePart, ifStmt.elseStmts);
                        
                        noBinding = noBinding && this._noBinding(ifStmt.elseStmts);
                    }

                    if (noBinding) {
                        return { type: "raw", stmt: ast };
                    } else {
                        return ifStmt;
                    }
                },

                "try": function (ast, stmts) {

                    var bodyStmts = [];
                    var bodyStatements = ast[1];
                    this._visitStatements(bodyStatements, bodyStmts);

                    var noBinding = this._noBinding(bodyStmts)

                    var tryStmt = { type: "try", bodyStmt: { type: "delay", stmts: bodyStmts } };
                    
                    var catchClause = ast[2];
                    if (catchClause) {
                        var exVar = catchClause[0];
                        tryStmt.exVar = exVar;
                        tryStmt.catchStmts = [];

                        this._visitStatements(catchClause[1], tryStmt.catchStmts);

                        noBinding = noBinding && this._noBinding(tryStmt.catchStmts);
                    }

                    var finallyStatements = ast[3];
                    if (finallyStatements) {
                        tryStmt.finallyStmt = { type: "delay", stmts: [] };

                        this._visitStatements(finallyStatements, tryStmt.finallyStmt.stmts);

                        noBinding = noBinding && this._noBinding(tryStmt.finallyStmt.stmts);
                    }

                    if (noBinding) {
                        return { type: "raw", stmt: ast };
                    } else {
                        return tryStmt;
                    }
                }
            }
        }

        function CodeGenerator(builderName, binder, indent) {
            this._builderName = builderName;
            this._binder = binder;
            this._normalMode = false;
            this._indent = indent;
            this._indentLevel = 0;
            this._builderVar = "$$_builder_$$_" + (__jscex__tempVarSeed++);
        }
        CodeGenerator.prototype = {
            _write: function (s) {
                this._buffer.push(s);
                return this;
            },

            _writeLine: function (s) {
                this._write(s)._write("\n");
                return this;
            },

            _writeIndents: function () {
                for (var i = 0; i < this._indent; i++) {
                    this._write(" ");
                }

                for (var i = 0; i < this._indentLevel; i++) {
                    this._write("    ");
                }
                return this;
            },

            generate: function (params, jscexAst) {
                this._buffer = [];

                this._writeLine("(function (" + params.join(", ") + ") {");
                this._indentLevel++;

                this._writeIndents()
                    ._writeLine("var " + this._builderVar + " = Jscex.builders[" + stringify(this._builderName) + "];");

                this._writeIndents()
                    ._writeLine("return " + this._builderVar + ".Start(this,");
                this._indentLevel++;

                this._pos = { };

                this._writeIndents()
                    ._visitJscex(jscexAst)
                    ._writeLine();
                this._indentLevel--;

                this._writeIndents()
                    ._writeLine(");");
                this._indentLevel--;

                this._writeIndents()
                    ._write("})");

                return this._buffer.join("");
            },

            _visitJscex: function (ast) {
                this._jscexVisitors[ast.type].call(this, ast);
                return this;
            },

            _visitRaw: function (ast) {
                var type = ast[0];

                function throwUnsupportedError() {
                    throw new Error('"' + type + '" is not currently supported.');
                }

                var visitor = this._rawVisitors[type];

                if (visitor) {
                    visitor.call(this, ast);
                } else {
                    throwUnsupportedError();
                }

                return this;
            },

            _visitJscexStatements: function (statements) {
                for (var i = 0; i < statements.length; i++) {
                    var stmt = statements[i];

                    if (stmt.type == "raw" || stmt.type == "if" || stmt.type == "switch") {
                        this._writeIndents()
                            ._visitJscex(stmt)._writeLine();
                    } else if (stmt.type == "delay") {
                        this._visitJscexStatements(stmt.stmts);
                    } else {
                        this._writeIndents()
                            ._write("return ")._visitJscex(stmt)._writeLine(";");
                    }
                }
            },

            _visitRawStatements: function (statements) {
                for (var i = 0; i < statements.length; i++) {
                    var s = statements[i];

                    this._writeIndents()
                        ._visitRaw(s)._writeLine();

                    switch (s[0]) {
                        case "break":
                        case "return":
                        case "continue":
                        case "throw":
                            return;
                    }
                }
            },

            _visitRawBody: function (body) {
                if (body[0] == "block") {
                    this._visitRaw(body);
                } else {
                    this._writeLine();
                    this._indentLevel++;

                    this._writeIndents()
                        ._visitRaw(body);
                    this._indentLevel--;
                }

                return this;
            },

            _visitRawFunction: function (ast) {
                var funcName = ast[1] || "";
                var args = ast[2];
                var statements = ast[3];
                
                this._writeLine("function " + funcName + "(" + args.join(", ") + ") {")
                this._indentLevel++;

                var currInFunction = this._pos.inFunction;
                this._pos.inFunction = true;

                this._visitRawStatements(statements);
                this._indentLevel--;

                this._pos.inFunction = currInFunction;

                this._writeIndents()
                    ._write("}");
            },

            _jscexVisitors: {
                "delay": function (ast) {
                    if (ast.stmts.length == 1) {
                        var subStmt = ast.stmts[0];
                        switch (subStmt.type) {
                            case "delay":
                            case "combine":
                            case "normal":
                            case "break":
                            case "continue":
                            case "loop":
                            case "try":
                                this._visitJscex(subStmt);
                                return;
                            case "return":
                                if (!subStmt.stmt[1]) {
                                    this._visitJscex(subStmt);
                                    return;
                                }
                        }
                    }

                    this._writeLine(this._builderVar + ".Delay(function () {");
                    this._indentLevel++;

                    this._visitJscexStatements(ast.stmts);
                    this._indentLevel--;

                    this._writeIndents()
                        ._write("})");
                },

                "combine": function (ast) {
                    this._writeLine(this._builderVar + ".Combine(");
                    this._indentLevel++;

                    this._writeIndents()
                        ._visitJscex(ast.first)._writeLine(",");
                    this._writeIndents()
                        ._visitJscex(ast.second)._writeLine();
                    this._indentLevel--;

                    this._writeIndents()
                        ._write(")");
                },

                "loop": function (ast) {
                    this._writeLine(this._builderVar + ".Loop(");
                    this._indentLevel++;

                    if (ast.condition) {
                        this._writeIndents()
                            ._writeLine("function () {");
                        this._indentLevel++;

                        this._writeIndents()
                            ._write("return ")._visitRaw(ast.condition)._writeLine(";");
                        this._indentLevel--;

                        this._writeIndents()
                            ._writeLine("},");
                    } else {
                        this._writeIndents()._writeLine("null,");
                    }

                    if (ast.update) {
                        this._writeIndents()
                            ._writeLine("function () {");
                        this._indentLevel++;

                        this._writeIndents()
                            ._visitRaw(ast.update)._writeLine(";");
                        this._indentLevel--;

                        this._writeIndents()
                            ._writeLine("},");
                    } else {
                        this._writeIndents()._writeLine("null,");
                    }

                    this._writeIndents()
                        ._visitJscex(ast.bodyStmt)._writeLine(",");

                    this._writeIndents()
                        ._writeLine(ast.bodyFirst);
                    this._indentLevel--;

                    this._writeIndents()
                        ._write(")");
                },

                "raw": function (ast) {
                    this._visitRaw(ast.stmt);
                },

                "bind": function (ast) {
                    var info = ast.info;
                    this._write(this._builderVar + ".Bind(")._visitRaw(info.expression)._writeLine(", function (" + info.argName + ") {");
                    this._indentLevel++;

                    if (info.assignee == "return") {
                        this._writeIndents()
                            ._writeLine("return " + this._builderVar + ".Return(" + info.argName + ");");
                    } else {
                        if (info.assignee) {
                            this._writeIndents()
                                ._visitRaw(info.assignee)._writeLine(" = " + info.argName + ";");
                        }

                        this._visitJscexStatements(ast.stmts);
                    }
                    this._indentLevel--;

                    this._writeIndents()
                        ._write("})");
                },

                "if": function (ast) {

                    for (var i = 0; i < ast.conditionStmts.length; i++) {
                        var stmt = ast.conditionStmts[i];
                        
                        this._write("if (")._visitRaw(stmt.cond)._writeLine(") {");
                        this._indentLevel++;

                        this._visitJscexStatements(stmt.stmts);
                        this._indentLevel--;

                        this._writeIndents()
                            ._write("} else ");
                    }

                    this._writeLine("{");
                    this._indentLevel++;

                    if (ast.elseStmts) {
                        this._visitJscexStatements(ast.elseStmts);
                    } else {
                        this._writeIndents()
                            ._writeLine("return " + this._builderVar + ".Normal();");
                    }

                    this._indentLevel--;

                    this._writeIndents()
                        ._write("}");
                },

                "switch": function (ast) {
                    this._write("switch (")._visitRaw(ast.item)._writeLine(") {");
                    this._indentLevel++;

                    for (var i = 0; i < ast.caseStmts.length; i++) {
                        var caseStmt = ast.caseStmts[i];

                        if (caseStmt.item) {
                            this._writeIndents()
                                ._write("case ")._visitRaw(caseStmt.item)._writeLine(":");
                        } else {
                            this._writeIndents()._writeLine("default:");
                        }
                        this._indentLevel++;

                        this._visitJscexStatements(caseStmt.stmts);
                        this._indentLevel--;
                    }

                    this._writeIndents()
                        ._write("}");
                },

                "try": function (ast) {
                    this._writeLine(this._builderVar + ".Try(");
                    this._indentLevel++;

                    this._writeIndents()
                        ._visitJscex(ast.bodyStmt)._writeLine(",");

                    if (ast.catchStmts) {
                        this._writeIndents()
                            ._writeLine("function (" + ast.exVar + ") {");
                        this._indentLevel++;

                        this._visitJscexStatements(ast.catchStmts);
                        this._indentLevel--;

                        this._writeIndents()
                            ._writeLine("},");
                    } else {
                        this._writeIndents()
                            ._writeLine("null,");
                    }

                    if (ast.finallyStmt) {
                        this._writeIndents()
                            ._visitJscex(ast.finallyStmt)._writeLine();
                    } else {
                        this._writeIndents()
                            ._writeLine("null");
                    }
                    this._indentLevel--;

                    this._writeIndents()
                        ._write(")");
                },

                "normal": function (ast) {
                    this._write(this._builderVar + ".Normal()");
                },

                "throw": function (ast) {
                    this._write(this._builderVar + ".Throw(")._visitRaw(ast.stmt[1])._write(")");
                },

                "break": function (ast) {
                    this._write(this._builderVar + ".Break()");
                },

                "continue": function (ast) {
                    this._write(this._builderVar + ".Continue()");
                },

                "return": function (ast) {
                    this._write(this._builderVar + ".Return(");
                    if (ast.stmt[1]) this._visitRaw(ast.stmt[1]);
                    this._write(")");
                }
            },

            _rawVisitors: {
                "var": function (ast) {
                    this._write("var ");

                    var items = ast[1];
                    for (var i = 0; i < items.length; i++) {
                        this._write(items[i][0]);
                        if (items[i].length > 1) {
                            this._write(" = ")._visitRaw(items[i][1]);
                        }
                        if (i < items.length - 1) this._write(", ");
                    }

                    this._write(";");
                },

                "seq": function (ast) {
                    for (var i = 1; i < ast.length; i++) {
                        this._visitRaw(ast[i]);
                        if (i < ast.length - 1) this._write(", "); 
                    }
                },

                "binary": function (ast) {
                    var op = ast[1], left = ast[2], right = ast[3];

                    function needBracket(item) {
                        var type = item[0];
                        return !(type == "num" || type == "name" || type == "dot");
                    }

                    if (needBracket(left)) {
                        this._write("(")._visitRaw(left)._write(") ");
                    } else {
                        this._visitRaw(left)._write(" ");
                    }

                    this._write(op);

                    if (needBracket(right)) {
                        this._write(" (")._visitRaw(right)._write(")");
                    } else {
                        this._write(" ")._visitRaw(right);
                    }
                },

                "sub": function (ast) {
                    var prop = ast[1], index = ast[2];

                    function needBracket() {
                        return !(prop[0] == "name")
                    }

                    if (needBracket()) {
                        this._write("(")._visitRaw(prop)._write(")[")._visitRaw(index)._write("]");
                    } else {
                        this._visitRaw(prop)._write("[")._visitRaw(index)._write("]");
                    }
                },

                "unary-postfix": function (ast) {
                    var op = ast[1];
                    var item = ast[2];
                    this._visitRaw(item)._write(op);
                },

                "unary-prefix": function (ast) {
                    var op = ast[1];
                    var item = ast[2];
                    this._write(op);
                    if (op == "typeof") {
                        this._write("(")._visitRaw(item)._write(")");
                    } else {
                        this._visitRaw(item);
                    }
                },

                "assign": function (ast) {
                    var op = ast[1];
                    var name = ast[2];
                    var value = ast[3];

                    this._visitRaw(name);
                    if ((typeof op) == "string") {
                        this._write(" " + op + "= ");
                    } else {
                        this._write(" = ");
                    }
                    this._visitRaw(value);
                },

                "stat": function (ast) {
                    this._visitRaw(ast[1])._write(";");
                },

                "dot": function (ast) {
                    function needBracket() {
                        var leftOp = ast[1][0];
                        return !(leftOp == "dot" || leftOp == "name");
                    }

                    if (needBracket()) {
                        this._write("(")._visitRaw(ast[1])._write(").")._write(ast[2]);
                    } else {
                        this._visitRaw(ast[1])._write(".")._write(ast[2]);
                    }
                },

                "new": function (ast) {
                    var ctor = ast[1];

                    this._write("new ")._visitRaw(ctor)._write("(");

                    var args = ast[2];
                    for (var i = 0, len = args.length; i < len; i++) {
                        this._visitRaw(args[i]);
                        if (i < len - 1) this._write(", ");
                    }

                    this._write(")");
                },

                "call": function (ast) {
                
                    if (_isJscexPattern(ast)) {
                        var indent = this._indent + this._indentLevel * 4;
                        var newCode = _compileJscexPattern(ast, indent);
                        this._write(newCode);
                    } else {

                        var invalidBind = (ast[1][0] == "name") && (ast[1][1] == this._binder);
                        if (invalidBind) {
                            this._pos = { inFunction: true };
                            this._buffer = [];
                        }

                        this._visitRaw(ast[1])._write("(");

                        var args = ast[2];
                        for (var i = 0; i < args.length; i++) {
                            this._visitRaw(args[i]);
                            if (i < args.length - 1) this._write(", ");
                        }

                        this._write(")");

                        if (invalidBind) {
                            throw ("Invalid bind operation: " + this._buffer.join(""));
                        }
                    }
                },

                "name": function (ast) {
                    this._write(ast[1]);
                },

                "object": function (ast) {
                    var items = ast[1];
                    if (items.length <= 0) {
                        this._write("{ }");
                    } else {
                        this._writeLine("{");
                        this._indentLevel++;
                        
                        for (var i = 0; i < items.length; i++) {
                            this._writeIndents()
                                ._write(stringify(items[i][0]) + ": ")
                                ._visitRaw(items[i][1]);
                            
                            if (i < items.length - 1) {
                                this._writeLine(",");
                            } else {
                                this._writeLine("");
                            }
                        }
                        
                        this._indentLevel--;
                        this._writeIndents()._write("}");
                    }
                },

                "array": function (ast) {
                    this._write("[");

                    var items = ast[1];
                    for (var i = 0; i < items.length; i++) {
                        this._visitRaw(items[i]);
                        if (i < items.length - 1) this._write(", ");
                    }

                    this._write("]");
                },

                "num": function (ast) {
                    this._write(ast[1]);
                },

                "regexp": function (ast) {
                    this._write("/" + ast[1] + "/" + ast[2]);
                },

                "string": function (ast) {
                    this._write(stringify(ast[1]));
                },

                "function": function (ast) {
                    this._visitRawFunction(ast);
                },

                "defun": function (ast) {
                    this._visitRawFunction(ast);
                },

                "return": function (ast) {
                    if (this._pos.inFunction) {
                        this._write("return");
                        var value = ast[1];
                        if (value) this._write(" ")._visitRaw(value);
                        this._write(";");
                    } else {
                        this._write("return ")._visitJscex({ type: "return", stmt: ast })._write(";");
                    }
                },
                
                "for": function (ast) {
                    this._write("for (");

                    var setup = ast[1];
                    if (setup) {
                        this._visitRaw(setup);
                        if (setup[0] != "var") {
                            this._write("; ");
                        } else {
                            this._write(" ");
                        }
                    } else {
                        this._write("; ");
                    }

                    var condition = ast[2];
                    if (condition) this._visitRaw(condition);
                    this._write("; ");

                    var update = ast[3];
                    if (update) this._visitRaw(update);
                    this._write(") ");

                    var currInLoop = this._pos.inLoop;
                    this._pos.inLoop = true;

                    var body = ast[4];
                    this._visitRawBody(body);

                    this._pos.inLoop = currInLoop;
                },

                "for-in": function (ast) {
                    this._write("for (");

                    var declare = ast[1];
                    if (declare[0] == "var") { // declare == ["var", [["m"]]]
                        this._write("var " + declare[1][0][0]);
                    } else {
                        this._visitRaw(declare);
                    }
                    
                    this._write(" in ")._visitRaw(ast[3])._write(") ");

                    var body = ast[4];
                    this._visitRawBody(body);
                },

                "block": function (ast) {
                    this._writeLine("{")
                    this._indentLevel++;

                    this._visitRawStatements(ast[1]);
                    this._indentLevel--;

                    this._writeIndents()
                        ._write("}");
                },

                "while": function (ast) {
                    var condition = ast[1];
                    var body = ast[2];

                    var currInLoop = this._pos.inLoop
                    this._pos.inLoop = true;

                    this._write("while (")._visitRaw(condition)._write(") ")._visitRawBody(body);

                    this._pos.inLoop = currInLoop;
                },

                "do": function (ast) {
                    var condition = ast[1];
                    var body = ast[2];

                    var currInLoop = this._pos.inLoop;
                    this._pos.inLoop = true;

                    this._write("do ")._visitRawBody(body);

                    this._pos.inLoop = currInLoop;

                    if (body[0] == "block") {
                        this._write(" ");
                    } else {
                        this._writeLine()._writeIndents();
                    }

                    this._write("while (")._visitRaw(condition)._write(");");
                },

                "if": function (ast) {
                    var condition = ast[1];
                    var thenPart = ast[2];

                    this._write("if (")._visitRaw(condition)._write(") ")._visitRawBody(thenPart);

                    var elsePart = ast[3];
                    if (elsePart) {
                        if (thenPart[0] == "block") {
                            this._write(" ");
                        } else {
                            this._writeLine("")
                                ._writeIndents();
                        }

                        if (elsePart[0] == "if") {
                            this._write("else ")._visitRaw(elsePart);
                        } else {
                            this._write("else ")._visitRawBody(elsePart);
                        }
                    }
                },

                "break": function (ast) {
                    if (this._pos.inLoop || this._pos.inSwitch) {
                        this._write("break;");
                    } else {
                        this._write("return ")._visitJscex({ type: "break", stmt: ast })._write(";");
                    }
                },

                "continue": function (ast) {
                    if (this._pos.inLoop) {
                        this._write("continue;");
                    } else {
                        this._write("return ")._visitJscex({ type: "continue", stmt: ast })._write(";");
                    }
                },

                "throw": function (ast) {
                    var pos = this._pos;
                    if (pos.inTry || pos.inFunction) {
                        this._write("throw ")._visitRaw(ast[1])._write(";");
                    } else {
                        this._write("return ")._visitJscex({ type: "throw", stmt: ast })._write(";");
                    }
                },

                "conditional": function (ast) {
                    this._write("(")._visitRaw(ast[1])._write(") ? (")._visitRaw(ast[2])._write(") : (")._visitRaw(ast[3])._write(")");
                },

                "try": function (ast) {

                    this._writeLine("try {");
                    this._indentLevel++;

                    var currInTry = this._pos.inTry;
                    this._pos.inTry = true;

                    this._visitRawStatements(ast[1]);
                    this._indentLevel--;

                    this._pos.inTry = currInTry;

                    var catchClause = ast[2];
                    var finallyStatements = ast[3];

                    if (catchClause) {
                        this._writeIndents()
                            ._writeLine("} catch (" + catchClause[0] + ") {")
                        this._indentLevel++;

                        this._visitRawStatements(catchClause[1]);
                        this._indentLevel--;
                    }

                    if (finallyStatements) {
                        this._writeIndents()
                            ._writeLine("} finally {");
                        this._indentLevel++;

                        this._visitRawStatements(finallyStatements);
                        this._indentLevel--;
                    }                

                    this._writeIndents()
                        ._write("}");
                },

                "switch": function (ast) {
                    this._write("switch (")._visitRaw(ast[1])._writeLine(") {");
                    this._indentLevel++;

                    var currInSwitch = this._pos.inSwitch;
                    this._pos.inSwitch = true;

                    var cases = ast[2];
                    for (var i = 0; i < cases.length; i++) {
                        var c = cases[i];
                        this._writeIndents();

                        if (c[0]) {
                            this._write("case ")._visitRaw(c[0])._writeLine(":");
                        } else {
                            this._writeLine("default:");
                        }
                        this._indentLevel++;

                        this._visitRawStatements(c[1]);
                        this._indentLevel--;
                    }
                    this._indentLevel--;

                    this._pos.inSwitch = currInSwitch;

                    this._writeIndents()
                        ._write("}");
                }
            }
        }

        function _isJscexPattern(ast) {
            if (ast[0] != "call") return false;
            
            var evalName = ast[1];
            if (evalName[0] != "name" || evalName[1] != "eval") return false;

            var compileCall = ast[2][0];
            if (!compileCall || compileCall[0] != "call") return false;

            var compileMethod = compileCall[1];
            if (!compileMethod || compileMethod[0] != "dot" || compileMethod[2] != "compile") return false;

            var jscexName = compileMethod[1];
            if (!jscexName || jscexName[0] != "name" || jscexName[1] != "Jscex") return false;

            var builder = compileCall[2][0];
            if (!builder || builder[0] != "string") return false;

            var func = compileCall[2][1];
            if (!func || func[0] != "function") return false;

            return true;
        }
        
        function _compileJscexPattern(ast, indent) {

            var builderName = ast[2][0][2][0][1];
            var funcAst = ast[2][0][2][1];
            var binder = root.binders[builderName];

            var jscexTreeGenerator = new JscexTreeGenerator(binder);
            var jscexAst = jscexTreeGenerator.generate(funcAst);

            var codeGenerator = new CodeGenerator(builderName, binder, indent);
            var newCode = codeGenerator.generate(funcAst[2], jscexAst);

            return newCode;
        }
        
        function compile(builderName, func) {

            var funcCode = func.toString();
            var evalCode = "eval(Jscex.compile(" + stringify(builderName) + ", " + funcCode + "))"
            var evalCodeAst = root.parse(evalCode);

            // [ "toplevel", [ [ "stat", [ "call", ... ] ] ] ]
            var evalAst = evalCodeAst[1][0][1];
            var newCode = _compileJscexPattern(evalAst, 0);

            root.logger.debug(funcCode + "\n\n>>>\n\n" + newCode);
            
            return codeGenerator(newCode);
        };

        root.compile = compile;
        
        root.modules["jit"] = true;
    }
    
    var isCommonJS = (typeof require !== "undefined" && typeof module !== "undefined" && module.exports);
    var isAmd = (typeof define !== "undefined" && define.amd);
    
    if (isCommonJS) {
        module.exports.init = function (root) {
            if (!root.modules["parser"]) {
                require("./jscex-parser").init(root);
            };
            
            init(root);
        }
    } else if (isAmd) {
        define("jscex-jit", ["jscex-parser"], function (parser) {
            return {
                init: function (root) {
                    if (!root.modules["parser"]) {
                        parser.init(root);
                    }
                    
                    init(root);
                }
            };
        });
    } else {
        if (typeof Jscex === "undefined") {
            throw new Error('Missing root object, please load "jscex" module first.');
        }
        
        if (!Jscex.modules["parser"]) {
            throw new Error('Missing essential components, please initialize "parser" module first.');
        }

        init(Jscex);
    }

})();

// jscex-builderbase.min.js
(function(){var j=function(){};j.prototype={Loop:function(b,c,a,d){return{next:function(e,i){var f=function(b){a.next(e,function(a,e){if(a=="normal"||a=="continue")g(b);else if(a=="throw"||a=="return")i(a,e);else if(a=="break")i("normal");else throw Error('Invalid type for "Loop": '+a);})},g=function(a){try{c&&!a&&c.call(e),!b||b.call(e)?f(!1):i("normal")}catch(d){i("throw",d)}};d?f(!0):g(!0)}}},Delay:function(b){return{next:function(c,a){try{b.call(c).next(c,a)}catch(d){a("throw",d)}}}},Combine:function(b,
    c){return{next:function(a,d){b.next(a,function(b,i,f){if(b=="normal")try{c.next(a,d)}catch(g){d("throw",g)}else d(b,i,f)})}}},Return:function(b){return{next:function(c,a){a("return",b)}}},Normal:function(){return{next:function(b,c){c("normal")}}},Break:function(){return{next:function(b,c){c("break")}}},Continue:function(){return{next:function(b,c){c("continue")}}},Throw:function(b){return{next:function(c,a){a("throw",b)}}},Try:function(b,c,a){return{next:function(d,e){b.next(d,function(b,f,g){if(b!=
    "throw"||!c)a?a.next(d,function(a,c,d){a=="normal"?e(b,f,g):e(a,c,d)}):e(b,f,g);else if(c){var h;try{h=c.call(d,f)}catch(j){a?a.next(d,function(a,b,c){a=="normal"?e("throw",j):e(a,b,c)}):e("throw",j)}h&&h.next(d,function(b,c,f){b=="throw"?a?a.next(d,function(a,d,g){a=="normal"?e(b,c,f):e(a,d,g)}):e(b,c,f):a?a.next(d,function(a,d,g){a=="normal"?e(b,c,f):e(a,d,g)}):e(b,c,f)})}else a.next(d,function(a,c,d){a=="normal"?e(b,f,g):e(a,c,d)})})}}}};var h=function(b){if(!b.modules)b.modules={};if(!b.modules.builderbase)b.modules.builderbase=
    !0,b.BuilderBase=j},k=typeof define==="function"&&!define.amd,l=typeof require==="function"&&typeof define==="function"&&define.amd;if(typeof require==="function"&&typeof module!=="undefined"&&module.exports)module.exports.init=h;else if(k)define("jscex-builderbase",function(b,c,a){a.exports.init=h});else if(l)define("jscex-builderbase",function(){return{init:h}});else{if(typeof Jscex==="undefined")throw Error('Missing the root object, please load "jscex" module first.');h(Jscex)}})();

// jscex-async.min.js
(function(){var k=function(){};k.prototype={isCancellation:!0,message:"The task has been cancelled."};typeof __jscex__async__taskIdSeed==="undefined"&&(__jscex__async__taskIdSeed=0);var l=function(b){return typeof b.start==="function"&&typeof b.addEventListener==="function"&&typeof b.removeEventListener==="function"&&typeof b.complete==="function"},j=function(b){if(!b.modules.async){var d=function(){};d.prototype={register:function(a){this.isCancellationRequested&&a();if(!this._handlers)this._handlers=
    [];this._handlers.push(a)},unregister:function(a){this._handlers&&(a=this._handlers.indexOf(a),a>=0&&this._handlers.splice(a,1))},cancel:function(){if(!this.isCancellationRequested){this.isCancellationRequested=!0;var a=this._handlers;delete this._handlers;for(var f=0;f<a.length;f++)try{a[f]()}catch(c){b.logger.warn("[WARNING] Cancellation handler threw an error: "+c)}}},throwIfCancellationRequested:function(){if(this.isCancellationRequested)throw new k;}};var e=function(a){this.id=++__jscex__async__taskIdSeed;
    this._delegate=a;this._listeners={};this.status="ready"};e.prototype={start:function(){if(this.status!="ready")throw Error('Task can only be started in "ready" status.');this.status="running";this._delegate(this)},complete:function(a,f){if(this.status!="running")throw Error('The "complete" method can only be called in "running" status.');var c=this._listeners;delete this._listeners;if(a=="success")this.result=f,this.status="succeeded",this._notify("success",c.success);else if(a=="failure")this.error=
    f,this.status=f.isCancellation?"canceled":"faulted",this._notify("failure",c.failure);else throw Error("Unsupported type: "+a);this._notify("complete",c.complete);this.error&&!c.failure&&!c.complete&&b.logger.warn("[WARNING] An unhandled error occurred: "+this.error)},_notify:function(a,f){if(f)for(var c=0;c<f.length;c++)try{f[c](this)}catch(i){b.logger.warn("[WARNING] The task's "+a+" listener threw an error: "+i)}},addEventListener:function(a,b){this._listeners&&(this._listeners[a]||(this._listeners[a]=
    []),this._listeners[a].push(b))},removeEventListener:function(a,b){if(this._listeners){var c=this._listeners[a];if(c){var i=c.indexOf(b);i>=0&&c.splice(i,1)}}}};e.create=function(a){return new e(a)};e.isTask=l;var h=function(){};h.prototype={Start:function(a,b){return e.create(function(c){b.next(a,function(a,b){if(a=="normal"||a=="return")c.complete("success",b);else if(a=="throw")c.complete("failure",b);else throw Error("Unsupported type: "+a);})})},Bind:function(a,b){return{next:function(c,e){var d=
    function(a){if(a.error)e("throw",a.error);else{var d;try{d=b.call(c,a.result)}catch(h){e("throw",h);return}d.next(c,e)}};a.status=="ready"?(a.addEventListener("complete",d),a.start()):a.status=="running"?a.addEventListener("complete",d):d(a)}}}};for(var g in b.BuilderBase.prototype)h.prototype[g]=b.BuilderBase.prototype[g];if(!b.Async)b.Async={};g=b.Async;g.CancellationToken=d;g.CanceledError=k;g.Task=e;g.AsyncBuilder=h;if(!b.builders)b.builders={};b.binders.async="$await";b.builders.async=new h;
    b.modules.async=!0}},m=typeof define==="function"&&!define.amd,n=typeof require==="function"&&typeof define==="function"&&define.amd;if(typeof require==="function"&&typeof module!=="undefined"&&module.exports)module.exports.init=function(b){if(!b.modules.builderbase){if(typeof __dirname==="string")try{require.paths.unshift(__dirname)}catch(d){try{module.paths.unshift(__dirname)}catch(e){}}require("jscex-builderbase").init(b)}j(b)};else if(m)define("jscex-async",["jscex-builderbase"],function(b,d,
    e){e.exports.init=function(d){d.modules.builderbase||b("jscex-builderbase").init(d);j(d)}});else if(n)define("jscex-async",["jscex-builderbase"],function(b){return{init:function(d){d.modules.builderbase||b.init(d);j(d)}}});else{if(typeof Jscex==="undefined")throw Error('Missing the root object, please load "jscex" module first.');if(!Jscex.modules.builderbase)throw Error('Missing essential components, please initialize "builderbase" module first.');j(Jscex)}})();

// jscex-async-powerpack.min.js
(function(){var m=function(j){if(j.length<=1)return null;for(var f=[],h=1;h<j.length;h++)f.push(j[h]);return f},n=function(j,f){for(var h=[],k=0;k<j.length;k++)h.push(j[k]);for(;h.length<f;)h.push(void 0);return h},l=function(j){if(!j.modules["async-powerpack"]){if(!j.modules.async)throw Error('Missing essential components, please initialize "jscex-async" module first.');var f=j.Async,h=f.Task,k=f.CanceledError;f.sleep=function(a,b){return h.create(function(c){b&&b.isCancellationRequested&&c.complete("failure",
new k);var e,d;b&&(d=function(){clearTimeout(e);c.complete("failure",new k)});e=setTimeout(function(){b&&b.unregister(d);c.complete("success")},a);b&&b.register(d)})};f.onEvent=function(a,b,c){return h.create(function(e){c&&c.isCancellationRequested&&e.complete("failure",new k);var d=function(){a.removeEventListener?a.removeEventListener(b,g):a.removeListener?a.removeListener(b,g):a.detachEvent(b,g)},g,i;c&&(i=function(){d();e.complete("failure",new k)});g=function(a){c&&c.unregister(i);d();e.complete("success",
a)};a.addEventListener?a.addEventListener(b,g):a.addListener?a.addListener(b,g):a.attachEvent(b,g);c&&c.register(i)})};h.whenAll=function(){var a={},b;if(arguments.length==1){var c=arguments[0];h.isTask(c)?(a[0]=c,b=!0):(a=c,b=Object.prototype.toString.call(a)==="[object Array]")}else{for(c=0;c<arguments.length;c++)a[c]=arguments[c];b=!0}return h.create(function(e){var d={},g;for(g in a)if(a.hasOwnProperty(g)){var i=a[g];h.isTask(i)&&(d[i.id]=g)}for(var c in d)i=a[d[c]],i.status=="ready"&&i.start();
for(c in d)if(i=a[d[c]],i.error){e.complete("failure",i.error);return}var f=b?[]:{},j=function(b){if(b.error){for(var c in d)a[d[c]].removeEventListener("complete",j);e.complete("failure",b.error)}else f[d[b.id]]=b.result,delete d[b.id],k--,k==0&&e.complete("success",f)},k=0;for(c in d)g=d[c],i=a[g],i.status=="succeeded"?(f[g]=i.result,delete d[i.id]):(k++,i.addEventListener("complete",j));k==0&&e.complete("success",f)})};h.whenAny=function(){var a={};if(arguments.length==1){var b=arguments[0];h.isTask(b)?
a[0]=b:a=b}else for(b=0;b<arguments.length;b++)a[b]=arguments[b];return h.create(function(b){var e={},d;for(d in a)if(a.hasOwnProperty(d)){var g=a[d];h.isTask(g)&&(e[g.id]=d)}for(var i in e)g=a[e[i]],g.status=="ready"&&g.start();for(i in e)if(d=e[i],g=a[d],g.error||g.status=="succeeded"){b.complete("success",{key:d,task:g});return}var f=function(d){for(var g in e)a[e[g]].removeEventListener("complete",f);b.complete("success",{key:e[d.id],task:d})};for(i in e)a[e[i]].addEventListener("complete",f)})};
if(!f.Jscexify)f.Jscexify={};f=f.Jscexify;f.fromStandard=function(a){var b=m(arguments);return function(){var c=this,e=n(arguments,a.length-1);return h.create(function(d){e.push(function(a,c){if(a)d.complete("failure",a);else if(b){for(var e={},f=0;f<b.length;f++)e[b[f]]=arguments[f+1];return d.complete("success",e)}else d.complete("success",c)});a.apply(c,e)})}};f.fromCallback=function(a){var b=m(arguments);return function(){var c=this,e=n(arguments,a.length-1);return h.create(function(d){e.push(function(a){if(b){for(var c=
{},e=0;e<b.length;e++)c[b[e]]=arguments[e];d.complete("success",c)}else d.complete("success",a)});a.apply(c,e)})}};j.modules["async-powerpack"]=!0}},o=typeof define==="function"&&!define.amd,p=typeof require==="function"&&typeof define==="function"&&define.amd;if(typeof require==="function"&&typeof module!=="undefined"&&module.exports)module.exports.init=l;else if(o)define("jscex-async-powerpack",["jscex-async"],function(j,f,h){h.exports.init=l});else if(p)define("jscex-async-powerpack",["jscex-async"],
function(){return{init:l}});else{if(typeof Jscex==="undefined")throw Error('Missing the root object, please load "jscex" module first.');l(Jscex)}})();

// functions.js
/*
 * http://love.hackerzhou.me
 */

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒"; 
	// console.log("d");
	$("#myclock").html(result);
}


// love.js
(function(window){

    function random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function bezier(cp, t) {  
        var p1 = cp[0].mul((1 - t) * (1 - t));
        var p2 = cp[1].mul(2 * t * (1 - t));
        var p3 = cp[2].mul(t * t); 
        return p1.add(p2).add(p3);
    }  

    function inheart(x, y, r) {
        // x^2+(y-(x^2)^(1/3))^2 = 1
        // http://www.wolframalpha.com/input/?i=x%5E2%2B%28y-%28x%5E2%29%5E%281%2F3%29%29%5E2+%3D+1
        var z = ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) - (x / r) * (x / r) * (y / r) * (y / r) * (y / r);
        return z < 0;
    }

    Point = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Point.prototype = {
        clone: function() {
            return new Point(this.x, this.y);
        },
        add: function(o) {
            p = this.clone();
            p.x += o.x;
            p.y += o.y;
            return p;
        },
        sub: function(o) {
            p = this.clone();
            p.x -= o.x;
            p.y -= o.y;
            return p;
        },
        div: function(n) {
            p = this.clone();
            p.x /= n;
            p.y /= n;
            return p;
        },
        mul: function(n) {
            p = this.clone();
            p.x *= n;
            p.y *= n;
            return p;
        }
    }

    Heart = function() {
        // x = 16 sin^3 t
        // y = 13 cos t - 5 cos 2t - 2 cos 3t - cos 4t
        // http://www.wolframalpha.com/input/?i=x+%3D+16+sin%5E3+t%2C+y+%3D+(13+cos+t+-+5+cos+2t+-+2+cos+3t+-+cos+4t)
        var points = [], x, y, t;
        for (var i = 10; i < 30; i += 0.2) {
            t = i / Math.PI;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            points.push(new Point(x, y));
        }
        this.points = points;
        this.length = points.length;
    }
    Heart.prototype = {
        get: function(i, scale) {
            return this.points[i].mul(scale || 1);
        }
    }

    Seed = function(tree, point, scale, color) {
        this.tree = tree;

        var scale = scale || 1
        var color = color || '#FF0000';

        this.heart = {
            point  : point,
            scale  : scale,
            color  : color,
            figure : new Heart(),
        }

        this.cirle = {
            point  : point,
            scale  : scale,
            color  : color,
            radius : 5,
        }
    }
    Seed.prototype = {
        draw: function() {
            this.drawHeart();
            this.drawText();
        },
        addPosition: function(x, y) {
            this.cirle.point = this.cirle.point.add(new Point(x, y));
        },
        canMove: function() {
            return this.cirle.point.y < (this.tree.height + 20); 
        },
        move: function(x, y) {
            this.clear();
            this.drawCirle();
            this.addPosition(x, y);
        },
        canScale: function() {
            return this.heart.scale > 0.2;
        },
        setHeartScale: function(scale) {
            this.heart.scale *= scale;
        },
        scale: function(scale) {
            this.clear();
            this.drawCirle();
            this.drawHeart();
            this.setHeartScale(scale);
        },
        drawHeart: function() {
            var ctx = this.tree.ctx, heart = this.heart;
            var point = heart.point, color = heart.color, 
                scale = heart.scale;
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < heart.figure.length; i++) {
                var p = heart.figure.get(i, scale);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawCirle: function() {
            var ctx = this.tree.ctx, cirle = this.cirle;
            var point = cirle.point, color = cirle.color, 
                scale = cirle.scale, radius = cirle.radius;
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.beginPath();
            ctx.moveTo(0, 0);
    	    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawText: function() {
            var ctx = this.tree.ctx, heart = this.heart;
            var point = heart.point, color = heart.color, 
                scale = heart.scale;
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.moveTo(0, 0);
    	    ctx.lineTo(15, 15);
    	    ctx.lineTo(60, 15);
            ctx.stroke();

            ctx.moveTo(0, 0);
            ctx.scale(0.75, 0.75);
            ctx.font = "12px 微软雅黑,Verdana"; // 字号肿么没有用? (ˉ(∞)ˉ)
            ctx.fillText("click here", 23, 16);
            ctx.restore();
        },
        clear: function() {
            var ctx = this.tree.ctx, cirle = this.cirle;
            var point = cirle.point, scale = cirle.scale, radius = 26;
            var w = h = (radius * scale);
            ctx.clearRect(point.x - w, point.y - h, 4 * w, 4 * h);
        },
        hover: function(x, y) {
            var ctx = this.tree.ctx;
            var pixel = ctx.getImageData(x, y, 1, 1);
            return pixel.data[3] == 255
        }
    }

    Footer = function(tree, width, height, speed) {
        this.tree = tree;
        this.point = new Point(tree.seed.heart.point.x, tree.height - height / 2);
        this.width = width;
        this.height = height;
        this.speed = speed || 2;
        this.length = 0;
    }
    Footer.prototype = {
        draw: function() {
            var ctx = this.tree.ctx, point = this.point;
            var len = this.length / 2;

            ctx.save();
            ctx.strokeStyle = 'rgb(35, 31, 32)';
            ctx.lineWidth = this.height;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
    	    ctx.lineTo(len, 0);
    	    ctx.lineTo(-len, 0);
            ctx.stroke();
            ctx.restore();

            if (this.length < this.width) {
                this.length += this.speed;
            }
        }
    }

    Tree = function(canvas, width, height, opt) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.opt = opt || {};

        this.record = {};
        
        this.initSeed();
        this.initFooter();
        this.initBranch();
        this.initBloom();
    }
    Tree.prototype = {
        initSeed: function() {
            var seed = this.opt.seed || {};
            var x = seed.x || this.width / 2;
            var y = seed.y || this.height / 2;
            var point = new Point(x, y);
            var color = seed.color || '#FF0000';
            var scale = seed.scale || 1;

            this.seed = new Seed(this, point, scale, color);
        },

        initFooter: function() {
            var footer = this.opt.footer || {};
            var width = footer.width || this.width;
            var height = footer.height || 5;
            var speed = footer.speed || 2;
            this.footer = new Footer(this, width, height, speed);
        },

        initBranch: function() {
            var branchs = this.opt.branch || []
            this.branchs = [];
            this.addBranchs(branchs);
        },

        initBloom: function() {
            var bloom = this.opt.bloom || {};
            var cache = [],
                num = bloom.num || 500, 
                width = bloom.width || this.width,
                height = bloom.height || this.height,
                figure = this.seed.heart.figure;
            var r = 240, x, y;
            for (var i = 0; i < num; i++) {
                cache.push(this.createBloom(width, height, r, figure));
            }
            this.blooms = [];
            this.bloomsCache = cache;
        },

        toDataURL: function(type) {
            return this.canvas.toDataURL(type);
        },

        draw: function(k) {
            var s = this, ctx = s.ctx;
            var rec = s.record[k];
            if (!rec) {
                return ;
            }
            var point = rec.point,
                image = rec.image;

            ctx.save();
            ctx.putImageData(image, point.x, point.y);
        	ctx.restore();
        },

        addBranch: function(branch) {
        	this.branchs.push(branch);
        },

        addBranchs: function(branchs){
            var s = this, b, p1, p2, p3, r, l, c;
        	for (var i = 0; i < branchs.length; i++) {
                b = branchs[i];
                p1 = new Point(b[0], b[1]);
                p2 = new Point(b[2], b[3]);
                p3 = new Point(b[4], b[5]);
                r = b[6];
                l = b[7];
                c = b[8]
                s.addBranch(new Branch(s, p1, p2, p3, r, l, c)); 
            }
        },

        removeBranch: function(branch) {
            var branchs = this.branchs;
        	for (var i = 0; i < branchs.length; i++) {
        		if (branchs[i] === branch) {
        			branchs.splice(i, 1);
                }
            }
        },

        canGrow: function() {
            return !!this.branchs.length;
        },
        grow: function() {
            var branchs = this.branchs;
    	    for (var i = 0; i < branchs.length; i++) {
                var branch = branchs[i];
                if (branch) {
                    branch.grow();
                }
            }
        },

        addBloom: function (bloom) {
            this.blooms.push(bloom);
        },

        removeBloom: function (bloom) {
            var blooms = this.blooms;
            for (var i = 0; i < blooms.length; i++) {
                if (blooms[i] === bloom) {
                    blooms.splice(i, 1);
                }
            }
        },

        createBloom: function(width, height, radius, figure, color, alpha, angle, scale, place, speed) {
            var x, y;
            while (true) {
                x = random(20, width - 20);
                y = random(20, height - 20);
                if (inheart(x - width / 2, height - (height - 40) / 2 - y, radius)) {
                    return new Bloom(this, new Point(x, y), figure, color, alpha, angle, scale, place, speed);
                }
            }
        },
        
        canFlower: function() {
            return !!this.blooms.length;
        }, 
        flower: function(num) {
            var s = this, blooms = s.bloomsCache.splice(0, num);
            for (var i = 0; i < blooms.length; i++) {
                s.addBloom(blooms[i]);
            }
            blooms = s.blooms;
            for (var j = 0; j < blooms.length; j++) {
                blooms[j].flower();
            }
        },

        snapshot: function(k, x, y, width, height) {
            var ctx = this.ctx;
            var image = ctx.getImageData(x, y, width, height); 
            this.record[k] = {
                image: image,
                point: new Point(x, y),
                width: width,
                height: height
            }
        },
        setSpeed: function(k, speed) {
            this.record[k || "move"].speed = speed;
        },
        move: function(k, x, y) {
            var s = this, ctx = s.ctx;
            var rec = s.record[k || "move"];
            var point = rec.point,
                image = rec.image,
                speed = rec.speed || 10,
                width = rec.width,
                height = rec.height; 

            i = point.x + speed < x ? point.x + speed : x;
            j = point.y + speed < y ? point.y + speed : y; 

            ctx.save();
            ctx.clearRect(point.x, point.y, width, height);
            ctx.putImageData(image, i, j);
        	ctx.restore();

            rec.point = new Point(i, j);
            rec.speed = speed * 0.95;

            if (rec.speed < 2) {
                rec.speed = 2;
            }
            return i < x || j < y;
        },

        jump: function() {
            var s = this, blooms = s.blooms;
            if (blooms.length) {
                for (var i = 0; i < blooms.length; i++) {
                    blooms[i].jump();
                }
            } 
            if ((blooms.length && blooms.length < 3) || !blooms.length) {
                var bloom = this.opt.bloom || {},
                    width = bloom.width || this.width,
                    height = bloom.height || this.height,
                    figure = this.seed.heart.figure;
                var r = 240, x, y;
                for (var i = 0; i < random(1,2); i++) {
                    blooms.push(this.createBloom(width / 2 + width, height, r, figure, null, 1, null, 1, new Point(random(-100,600), 720), random(200,300)));
                }
            }
        }
    }

    Branch = function(tree, point1, point2, point3, radius, length, branchs) {
        this.tree = tree;
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.radius = radius;
        this.length = length || 100;    
        this.len = 0;
        this.t = 1 / (this.length - 1);   
        this.branchs = branchs || [];
    }

    Branch.prototype = {
        grow: function() {
            var s = this, p; 
            if (s.len <= s.length) {
                p = bezier([s.point1, s.point2, s.point3], s.len * s.t);
                s.draw(p);
                s.len += 1;
                s.radius *= 0.97;
            } else {
                s.tree.removeBranch(s);
                s.tree.addBranchs(s.branchs);
            }
        },
        draw: function(p) {
            var s = this;
            var ctx = s.tree.ctx;
            ctx.save();
        	ctx.beginPath();
        	ctx.fillStyle = 'rgb(35, 31, 32)';
            ctx.shadowColor = 'rgb(35, 31, 32)';
            ctx.shadowBlur = 2;
        	ctx.moveTo(p.x, p.y);
        	ctx.arc(p.x, p.y, s.radius, 0, 2 * Math.PI);
        	ctx.closePath();
        	ctx.fill();
        	ctx.restore();
        }
    }

    Bloom = function(tree, point, figure, color, alpha, angle, scale, place, speed) {
        this.tree = tree;
        this.point = point;
        this.color = color || 'rgb(255,' + random(0, 255) + ',' + random(0, 255) + ')';
        this.alpha = alpha || random(0.3, 1);
        this.angle = angle || random(0, 360);
        this.scale = scale || 0.1;
        this.place = place;
        this.speed = speed;

        this.figure = figure;
    }
    Bloom.prototype = {
        setFigure: function(figure) {
            this.figure = figure;
        },
        flower: function() {
            var s = this;
            s.draw();
            s.scale += 0.1;
            if (s.scale > 1) {
                s.tree.removeBloom(s);
            }
        },
        draw: function() {
            var s = this, ctx = s.tree.ctx, figure = s.figure;

            ctx.save();
            ctx.fillStyle = s.color;
            ctx.globalAlpha = s.alpha;
            ctx.translate(s.point.x, s.point.y);
            ctx.scale(s.scale, s.scale);
            ctx.rotate(s.angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < figure.length; i++) {
                var p = figure.get(i);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        jump: function() {
            var s = this, height = s.tree.height;

            if (s.point.x < -20 || s.point.y > height + 20) {
                s.tree.removeBloom(s);
            } else {
                s.draw();
                s.point = s.place.sub(s.point).div(s.speed).add(s.point);
                s.angle += 0.05;
                s.speed -= 1;
            }
        }
    }

    window.random = random;
    window.bezier = bezier;
    window.Point = Point;
    window.Tree = Tree;

})(window);



// heart_tree.js
// 心形树script
(function(){
    var canvas = $('#mycanvas');
    
    // if (!canvas[0].getContext) {
    //     $("#error").show();
    //     return false;
    // }

    var width = canvas.width();
    var height = canvas.height();
    
    canvas.attr("width", width);
    canvas.attr("height", height);

    var opts = {
        seed: {
            x: width / 2 - 20,
            color: "rgb(190, 26, 37)",
            scale: 2
        },
        branch: [
            [535, 680, 570, 250, 500, 200, 30, 100, [
                [540, 500, 455, 417, 340, 400, 13, 100, [
                    [450, 435, 434, 430, 394, 395, 2, 40]
                ]],
                [550, 445, 600, 356, 680, 345, 12, 100, [
                    [578, 400, 648, 409, 661, 426, 3, 80]
                ]],
                [539, 281, 537, 248, 534, 217, 3, 40],
                [546, 397, 413, 247, 328, 244, 9, 80, [
                    [427, 286, 383, 253, 371, 205, 2, 40],
                    [498, 345, 435, 315, 395, 330, 4, 60]
                ]],
                [546, 357, 608, 252, 678, 221, 6, 100, [
                    [590, 293, 646, 277, 648, 271, 2, 80]
                ]]
            ]] 
        ],
        bloom: {
            num: 700,
            width: 1080,
            height: 650,
        },
        footer: {
            width: 1200,
            height: 5,
            speed: 10,
        }
    }

    var tree = new Tree(canvas[0], width, height, opts);
    var seed = tree.seed;
    var foot = tree.footer;
    var hold = 1;

    canvas.click(function(e) {
        var offset = canvas.offset(), x, y;
        x = e.pageX - offset.left;
        y = e.pageY - offset.top;
        if (seed.hover(x, y)) {
            hold = 0; 
            canvas.unbind("click");
            canvas.unbind("mousemove");
            canvas.removeClass('hand');
        }
    }).mousemove(function(e){
        var offset = canvas.offset(), x, y;
        x = e.pageX - offset.left;
        y = e.pageY - offset.top;
        canvas.toggleClass('hand', seed.hover(x, y));
    });

    var seedAnimate = eval(Jscex.compile("async", function () {
        seed.draw();
        while (hold) {
            $await(Jscex.Async.sleep(10));
        }
        while (seed.canScale()) {
            seed.scale(0.95);
            $await(Jscex.Async.sleep(10));
        }
        while (seed.canMove()) {
            seed.move(0, 2);
            foot.draw();
            $await(Jscex.Async.sleep(10));
        }
    }));

    var growAnimate = eval(Jscex.compile("async", function () {
        do {
            tree.grow();
            $await(Jscex.Async.sleep(10));
        } while (tree.canGrow());
    }));

    var flowAnimate = eval(Jscex.compile("async", function () {
        do {
            tree.flower(2);
            $await(Jscex.Async.sleep(10));
        } while (tree.canFlower());
    }));

    var moveAnimate = eval(Jscex.compile("async", function () {
        tree.snapshot("p1", 240, 0, 610, 680);
        while (tree.move("p1", 500, 0)) {
            foot.draw();
            $await(Jscex.Async.sleep(10));
        }
        foot.draw();
        tree.snapshot("p2", 500, 0, 610, 680);


        canvas.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
        canvas.css("background", "#ffe");
        $await(Jscex.Async.sleep(300));
        canvas.css("background", "none");
    }));

    var jumpAnimate = eval(Jscex.compile("async", function () {
        var ctx = tree.ctx;
        while (true) {
            tree.ctx.clearRect(0, 0, width, height);
            tree.jump();
            foot.draw();
            $await(Jscex.Async.sleep(25));
        }
    }));
   //下面修改起始日期
    var textAnimate = eval(Jscex.compile("async", function () {
        var together = new Date();
        together.setFullYear(2019, 2, 19); 			//时间年月日 月份0~11
        together.setHours(22);						//小时	
        together.setMinutes(50);					//分钟
        together.setSeconds(0);					//秒前一位
        together.setMilliseconds(0);				//秒第二位

        // $("#code").show().typewriter();
        $("#myclock").fadeIn(500);
        while (true) {
            timeElapse(together);
            $await(Jscex.Async.sleep(1000));
        }
    }));

    var runAsync = eval(Jscex.compile("async", function () {
        $await(seedAnimate());
        $await(growAnimate());
        $await(flowAnimate());
        $await(moveAnimate());

        textAnimate().start();

        $await(jumpAnimate());
    }));

    runAsync().start();
})();