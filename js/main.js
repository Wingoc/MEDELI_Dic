/**
 * Created by xianbr on 2018/5/03.
 */

// 导入通用列表
$(function () {

        // 列表的相对路径
        var url = "./Excels/" + "产品功能列表20180503.xlsx";       

        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";
        oReq.onload = function (e) {
            var arraybuffer = oReq.response;
            var data = new Uint8Array(arraybuffer);
            var arr = [];
            for (var i = 0; i != data.length; ++i)
                  arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            // 获取到的Excel对象
            var workbook = XLSX.read(bstr, {type: "binary"});

            console.log("表格导入成功！");

            var EnglishObj = {};
            var EnglishTemp = {};

            var ChineseObj = {};
            var ChineseTemp = {};

            var EngDatabase = [];
            var ChnDatabase = [];

            var english = "";
            var phonogram = "";
            var chinese = "";
            var yamaha = "";
            var casio = "";
            var desc = "";


            var sheet = workbook.Sheets["Sheet1"];
            // 将要处理的sheet转换为数组json对象：[{ }, { }, { }]
            var sheetArrayJson = XLSX.utils.sheet_to_json(sheet, {header: "A"});
            // console.log(sheetArrayJson);

            for(var z=1; z < sheetArrayJson.length; z++){
            	if (sheetArrayJson[z]["A"] != "…") {

                        english = sheetArrayJson[z]["A"];
                        EngDatabase.push(english);

                        if (sheetArrayJson[z]["B"] != undefined) {
                            phonogram = sheetArrayJson[z]["B"];
                        } else {
                            phonogram = "无";
                        }

                        if (sheetArrayJson[z]["C"] != undefined) {
                            chinese = sheetArrayJson[z]["C"];
                        } else {
                            chinese = "无";
                        }

                        if (sheetArrayJson[z]["D"] != undefined) {
                            yamaha = sheetArrayJson[z]["D"];
                        } else {
                            yamaha = "无";
                        }

                        if (sheetArrayJson[z]["E"] != undefined) {
                            casio = sheetArrayJson[z]["E"];
                        } else {
                            casio = "无";
                        }

                        if (sheetArrayJson[z]["F"] != undefined) {
                            desc = sheetArrayJson[z]["F"];
                        } else {
                            desc = "无";
                        }

                        EnglishTemp = { phonogram: phonogram, chinese: chinese, yamaha: yamaha, casio: casio, desc: desc };
                        EnglishObj[english] = EnglishTemp;
                  }
            }



            for(var y=1; y < sheetArrayJson.length; y++){
              if (sheetArrayJson[y]["C"] != undefined) {

                        chinese = sheetArrayJson[y]["C"];
                        ChnDatabase.push(chinese);

                        if (sheetArrayJson[y]["A"] != undefined) {
                            english = sheetArrayJson[y]["A"];
                        } else {
                            english = "无";
                        }

                        if (sheetArrayJson[y]["D"] != undefined) {
                            yamaha = sheetArrayJson[y]["D"];
                        } else {
                            yamaha = "无";
                        }

                        if (sheetArrayJson[y]["E"] != undefined) {
                            casio = sheetArrayJson[y]["E"];
                        } else {
                            casio = "无";
                        }

                        if (sheetArrayJson[y]["F"] != undefined) {
                            desc = sheetArrayJson[y]["F"];
                        } else {
                            desc = "无";
                        }

                        ChineseTemp = { english: english, yamaha: yamaha, casio: casio, desc: desc };
                        ChineseObj[chinese] = ChineseTemp;
                  }
            }


            $("#translate").click(function(){

                if ($("#englishTxt").val()) {
                 if (EnglishObj[$("#englishTxt").val()]) {
                     $("#phonogram").val(EnglishObj[$("#englishTxt").val()]['phonogram']);
                     $("#chineseTxt").val(EnglishObj[$("#englishTxt").val()]['chinese']);
                     $("#yamaha").val(EnglishObj[$("#englishTxt").val()]['yamaha']);
                     $("#casio").val(EnglishObj[$("#englishTxt").val()]['casio']);
                     $("#desc").text(EnglishObj[$("#englishTxt").val()]['desc']);
                 } else {
                     alert("词库中没有找到该英文!");
                 }
                } else if ($("#chineseTxt").val() && !$("#englishTxt").val()) {
                 if (ChineseObj[$("#chineseTxt").val()]) {
                     $("#englishTxt").val(ChineseObj[$("#chineseTxt").val()]['english']);
                     $("#yamaha").val(ChineseObj[$("#chineseTxt").val()]['yamaha']);
                     $("#casio").val(ChineseObj[$("#chineseTxt").val()]['casio']);
                     $("#desc").text(ChineseObj[$("#chineseTxt").val()]['desc']);
                 } else {
                     alert("词库中没有找到该中文!");
                 }
                } else if (!$("#chineseTxt").val() && !$("#englishTxt").val()) {
                 alert("请输入英文或中文!");
                }
            });

            $("#clear").click(function() {
                  $("#englishTxt").val("");
                  $("#phonogram").val("");
                  $("#chineseTxt").val("");
                  $("#yamaha").val("");
                  $("#casio").val("");
                  $("#desc").text("");
            });

            $('#englishTxt').typeahead({
                  source: function(query, process) {
                        query = $('#englishTxt').val();
                        return EngDatabase;
                  },
                  afterSelect: function(item) {
                    $("#englishTxt").focus(function(){
                      document.activeElement.blur();
                    });
                  }
            });


            $('#chineseTxt').typeahead({
                  source: function(query, process) {
                        return ChnDatabase;
                  }
            });

      };
      oReq.send();

      $("#a").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'a');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#b").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'b');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#c").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'c');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#d").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'd');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#e").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'e');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#f").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'f');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#g").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'g');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#h").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'h');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#i").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'i');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#j").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'j');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#k").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'k');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#l").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'l');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#m").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'm');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#n").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'n');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#o").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'o');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#p").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'p');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#q").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'q');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#r").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'r');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#s").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 's');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#t").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 't');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#u").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'u');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#v").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'v');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#w").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'w');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#x").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'x');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#y").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'y');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });
      $("#z").click(function() {
                  $("#englishTxt").val($("#englishTxt").val() + 'z');
                  e = $.Event("keyup");
                  // e.keyCode = 65;
                  $('#englishTxt').trigger(e);
                });



      $("#voice").click(function() {
                  alert("暂不支持！");
                });



});




// 分割数组函数
// chunk([1,2,3],2)   >>>   [ [1,2], [3] ]
var chunk = function (array, size) {
  var result = [];
  for (var x = 0; x < Math.ceil(array.length / size); x++) {
    var start = x * size;
    var end = start + size;
    result.push(array.slice(start, end));
}
return result;
};



   




