/*! ng-csv 12-08-2015 */
!function(a){angular.module("ngCsv.config",[]).value("ngCsv.config",{debug:!0}).config(["$compileProvider",function(a){angular.isDefined(a.urlSanitizationWhitelist)?a.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/):a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/)}]),angular.module("ngCsv.directives",["ngCsv.services"]),angular.module("ngCsv.services",[]),angular.module("ngCsv",["ngCsv.config","ngCsv.services","ngCsv.directives","ngSanitize"]),angular.module("ngCsv.services").service("CSV",["$q",function(a){var b="\r\n",c="﻿",d={"\\t":"  ","\\b":"\b","\\v":"","\\f":"\f","\\r":"\r"};this.stringifyField=function(a,b){return"locale"===b.decimalSep&&this.isFloat(a)?a.toLocaleString():"."!==b.decimalSep&&this.isFloat(a)?a.toString().replace(".",b.decimalSep):"string"==typeof a?(a=a.replace(/"/g,'""'),(b.quoteStrings||a.indexOf(",")>-1||a.indexOf("\n")>-1||a.indexOf("\r")>-1)&&(a=b.txtDelim+a+b.txtDelim),a):"boolean"==typeof a?a?"TRUE":"FALSE":a},this.isFloat=function(a){return+a===a&&(!isFinite(a)||Boolean(a%1))},this.stringify=function(d,e){var f=a.defer(),g=this,h="",i="",j=a.when(d).then(function(a){if(angular.isDefined(e.header)&&e.header){var d,j;d=[],angular.forEach(e.header,function(a){this.push(g.stringifyField(a,e))},d),j=d.join(e.fieldSep?e.fieldSep:","),i+=j+b}var k=[];angular.isArray(a)?k=a:angular.isFunction(a)&&(k=a()),angular.forEach(k,function(a,c){var d,f,h=angular.copy(k[c]);f=[];var j=e.columnOrder?e.columnOrder:h;angular.forEach(j,function(a){var b=e.columnOrder?h[a]:a;this.push(g.stringifyField(b,e))},f),d=f.join(e.fieldSep?e.fieldSep:","),i+=c<k.length?d+b:d}),e.addByteOrderMarker&&(h+=c),h+=i,f.resolve(h)});return"function"==typeof j["catch"]&&j["catch"](function(a){f.reject(a)}),f.promise},this.isSpecialChar=function(a){return void 0!==d[a]},this.getSpecialChar=function(a){return d[a]}}]),angular.module("ngCsv.directives").directive("ngCsv",["$parse","$q","CSV","$document","$timeout",function(b,c,d,e,f){return{restrict:"AC",scope:{data:"&ngCsv",filename:"@filename",header:"&csvHeader",columnOrder:"&csvColumnOrder",txtDelim:"@textDelimiter",decimalSep:"@decimalSeparator",quoteStrings:"@quoteStrings",fieldSep:"@fieldSeparator",lazyLoad:"@lazyLoad",addByteOrderMarker:"@addBom",ngClick:"&",charset:"@charset"},controller:["$scope","$element","$attrs","$transclude",function(a,b,e){function f(){var b={txtDelim:a.txtDelim?a.txtDelim:'"',decimalSep:a.decimalSep?a.decimalSep:".",quoteStrings:a.quoteStrings,addByteOrderMarker:a.addByteOrderMarker};return angular.isDefined(e.csvHeader)&&(b.header=a.$eval(a.header)),angular.isDefined(e.csvColumnOrder)&&(b.columnOrder=a.$eval(a.columnOrder)),b.fieldSep=a.fieldSep?a.fieldSep:",",b.fieldSep=d.isSpecialChar(b.fieldSep)?d.getSpecialChar(b.fieldSep):b.fieldSep,b}a.csv="",angular.isDefined(a.lazyLoad)&&"true"==a.lazyLoad||angular.isArray(a.data)&&a.$watch("data",function(){a.buildCSV()},!0),a.getFilename=function(){return a.filename||"download.csv"},a.buildCSV=function(){var g=c.defer();return b.addClass(e.ngCsvLoadingClass||"ng-csv-loading"),d.stringify(a.data(),f()).then(function(c){a.csv=c,b.removeClass(e.ngCsvLoadingClass||"ng-csv-loading"),g.resolve(c)}),a.$apply(),g.promise}}],link:function(b,c){function d(){var c=b.charset||"utf-8",d=new Blob([b.csv],{type:"text/csv;charset="+c+";"});if(a.navigator.msSaveOrOpenBlob)navigator.msSaveBlob(d,b.getFilename());else{var g=angular.element("<a></a>");g.attr("href",a.URL.createObjectURL(d)),g.attr("download",b.getFilename()),g.attr("target","_blank"),e.find("body").append(g),f(function(){g[0].click(),g.remove()},null)}}c.bind("click",function(){b.buildCSV().then(function(){d()}),b.$apply()})}}}])}(window,document);