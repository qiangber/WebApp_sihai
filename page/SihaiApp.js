  /*切换效果函数*/
  var nTabs = function(thisObj,Num) {
    if(thisObj.className == "ui-btn-active") return;
    //var tabObj = thisObj.parentNode.id; 
    //var tabList = document.getElementById(tabObj).getElementsByName("");
    if(Num==0){     
        document.getElementById("myTab_Content0").style.display = "block";
        document.getElementById("myTab_Content1").style.display = "none";
    }else{ 
        document.getElementById("myTab_Content0").style.display = "none";
        document.getElementById("myTab_Content1").style.display = "block";          
    }
  }

  var isbind = 0;
  //后台接口
  var url = "http://120.27.28.183:8080/SihaiApp/ieaction.do";

  var aboutApp = function(type) {
    $("." + type).bind("click", function() {
      $.mobile.loading("show");
      $.getJSON(url, "type=getProfile&profileType=" + type + "&jsonpCallback=?", function(data) {
        var jsonData = eval(data);
        $("#" + type + "Page").find(".content p").html(jsonData.content);
        $.mobile.loading("hide");
        $.mobile.changePage("#" + type + "Page");
      });
    });         
  }

  var getNewsList = function(clickId) {
    $("#" + clickId).bind("click", function() {
      $.mobile.loading("show");
      $.getJSON(url, "type=getNews&comeCode=" + clickId + "&jsonpCallback=?", function(data) {
        var jsonData = eval(data);
        var array = [];
        $(jsonData).each(function(index, obj) {
          array.push('<li><a href="#" data-no="' + obj.id + '">' +
                    '<p style="font-weight: bold;">' + obj.title + '</p>' +
                    '<p class="ui-li-desc">发布于' + obj.time + '</p>' +
                    '</a></li>');
        })

        var list = $("#newsList");
        list.html(array.join(""));
        list.prepend('<div class="ui-bar ui-bar-b"><h3 align="center">' + jsonData[0].comeFrom + '</h3></div>');
        $("#others").popup("close");
        list.listview("refresh");
        $.mobile.loading("hide");

      });
    });
  }

  var getAllList = function() {
    $.mobile.loading("show");
    $.getJSON(url, "type=getNews&jsonpCallback=?", function(data) {
      var jsonData = eval(data);
      var array = [];
      $(jsonData).each(function(index, obj) {
        array.push('<li><a href="#" data-no="' + obj.id + '">' +
                  '<p style="font-weight: bold;">' + obj.title + '</p>' +
                  '<p>发布于' + obj.time + '</p>' + 
                  '</a></li>');
      });
      var list = $("#newsList");
      list.html(array.join(""));
      list.listview("refresh");
      $.mobile.loading("hide");
    });
  }

  var getNewsInfoById = function() {
    $.mobile.loading("show");

    var id = $(this).attr("data-no");
    if (id == undefined) {
      alert("请求出现错误！");
      $.mobile.loading("hide");
      return;
    };        

    $.getJSON(url, "type=getNews&id=" + id + "&jsonpCallback=?", function(data) {

      var jsonData = eval(data);
      var array = [];            

      $(jsonData).each(function(index, obj) {
        array.push('<div class="ui-body ui-body-a" theme="b" style="text-shadow: 0 1px 0 #f3f3f3;"><div class="article-info">发布于' + obj.time + '</div><p><strong>' + obj.title + 
          '</strong></p><p>' + obj.content + '</p></div>');
      });

      var tbody = $("#newsInfo").find(".content p");
      tbody.html(array.join(""));
      $.mobile.loading("hide");
      $.mobile.changePage("#newsInfo");
    });
  }

  var getItemsList = function(type, clickId) {
    $("#" + clickId).bind("click", function() {
      $.mobile.loading("show");
      $.getJSON(url, "type=" + type  + "&jsonpCallback=?", function(data) {
        var jsonData = eval(data);
        var array = [];
        $(jsonData).each(function(index, obj) {
          array.push('<li><a href="#" data-no="' + obj.id + '">' +
                    '<p style="font-weight: bold;">' + obj.title + '</p>' +
                    '<p class="ui-li-desc">发布于' + obj.time + '</p>' +
                    '</a></li>');
        })

        var list = $("#itemsList");
        list.html(array.join(""));
        if (type != "getAllItems") {
          list.prepend('<div class="ui-bar ui-bar-b"><h3 align="center">' + jsonData[0].type + '</h3></div>');
        };
        list.listview("refresh");
        $.mobile.loading("hide");

      });
    });
  }

  var getMyList = function() {
    $.mobile.loading("show");
    $.getJSON(url, "type=getMyList&jsonpCallback=?", function(data) {
      
      var jsonData = eval(data);
      var array = [];

      $(jsonData).each(function(index, obj) {
        array.push('<li><a href="#" data-no="' + obj.items_ID + '"' + ' data-money="' + obj.money + '">' +
                    '<p style="font-weight: bold;">' + obj.title + '</p>' +
                    '<p class="ui-li-desc">发布于' + obj.time + '</p>' +
                    '</a></li>');
      })
      var list = $("#myList");
      list.html(array.join(""));
      list.listview("refresh");
      $.mobile.loading("hide");
    })
  }

  var getItemsInfoById = function() {

    $.mobile.loading("show");

    var id = $(this).attr("data-no");
    var money = $(this).attr("data-money") == undefined?"到<strong>我的投资</strong>中查看":$(this).attr("data-money");
    if (id == undefined) {
      alert("请求出现错误！");
      $.mobile.loading("hide");
      return;
    };        

    $.getJSON(url, "type=getOneStudy&id=" + id + "&jsonpCallback=?", function(data) {

      var jsonData = eval(data);
      var array = [];            

      $(jsonData).each(function(index, obj) {
        array.push('<table class="tstyle ui-responsive" data-mode="reflow"><tr><th>项目名称</th><td>' + obj.title +
          '</td></tr><tr><th>项目类型</th><td>' + obj.type + 
          '</td></tr><tr style="border-top:1px solid #0D0D0D;"><th>负责人</th><td>' + obj.concerned + 
          '</td></tr><tr><th>联系电话</th><td>' + obj.phoneNum + 
          '</td></tr><tr style="height:70px;border-top:1px solid #0D0D0D;"><th>信息概述</th><td>' + obj.content + 
          '</td></tr><tr style="height:70px;"><th>项目亮点</th><td>' + obj.desc + 
          '</td></tr><tr style="border-top:1px solid #0D0D0D;"><th>已投资金额</th><td>' + money + 
          '</td></tr></table><table class="tstyle"><tr><th style="width:35%;">欲投资金额</th><td style="width:30%;">' +
          '<input type="tel" id="pay"></td><td style="width:35%;text-align:right;">' +'<a href="#" data-role="button" data-theme="b" data-inline="ture" style="font-size:14px;font-family:tahoma;" data-no="' + 
          id + '">立即支付</a></td></tr></table>');
      });

      var tbody = $("#itemsInfo").find(".box");
      tbody.html(array.join(""));
      $.mobile.loading("hide");
      $.mobile.changePage("#itemsInfo");
    });
  }

  var login = function() {
    if ($("#userName").val() != "身份证号码或登录ID" && $("#password").val()) {

      var searchButton = $(this);
      searchButton.button("option", "disabled", true);

      $.mobile.loading("show");

      userName = $("#userName").val();
      password = $("#password").val();

      $.getJSON(url, "type=login&userName=" + userName + "&password=" + password + "&jsonpCallback=?", function(data) {
        var jsonData = eval(data);
        $(jsonData).each(function(index, obj) {
          if (obj.result == "success") {
            alert("登录成功！您好，" + obj.info.name);
            $("#mine").find(".content div").html('<div class="ui-bar ui-bar-a"><h1 align="left">' + obj.info.name + '，您好！欢迎使用四海众邦投资平台</h1></div>')
            $.mobile.changePage("#mine");
          } else {
            alert("登录失败，用户名与密码不匹配，请重新输入！")
          }              
        })
        $.mobile.loading("hide");
        searchButton.button("option", "disabled", false);
      })
    } else {
      alert("请输入用户名或者密码！");
    }
  }

  var checkLogin = function() {
    $.mobile.loading("show");
    $.getJSON(url, "type=checkLogin&jsonpCallback=?", function(data) {
      var jsonData = eval(data);
      var name = jsonData.name;

      if (name == null) {
        var isLogin = confirm("请先登录");
        if(isLogin == true) {
          $.mobile.changePage("#login")
        }        
      } else {
        $("#mine").find(".content div").html('<div class="ui-bar ui-bar-a"><h1 align="left">' + 
          name + '，您好！欢迎使用四海众邦投资平台</h1></div>')
        $.mobile.changePage("#mine")
      }
      $.mobile.loading("hide")
    })
  }

  var loginOut = function() {
    var isLogOut = confirm("您要注销登录吗？");
    if(isLogOut==true)
    {
      $.mobile.loading("show")
      $.getJSON(url, "type=loginOut&jsonpCallback=?", function(data) {
        var jsonData = eval(data);

        if (jsonData.result == "success") {
          alert("注销成功!");
          $.mobile.loading("hide");
          $.mobile.changePage("#homepage");
        };
      })
    }
  }

  var invest = function() {

    $.mobile.loading("show");

    var money = $("#pay").val();
    var items_ID = $(this).attr("data-no");

    $.getJSON(url, "type=checkLogin&jsonpCallback=?", function(data) {
      var jsonData = eval(data);
      var name = jsonData.name;
      var user_ID = jsonData.user_ID;

      if (name == null) {
        var isLogin = confirm("请先登录");
        if(isLogin == true) {
          $.mobile.changePage("#login")
        }
      } else {
        $.getJSON(url, "type=invest&money=" + money + "&items_ID=" + items_ID + "&user_ID=" + user_ID + "&jsonpCallback=?", function(data) {
          var jsonData = eval(data);
          if (jsonData.result == "Update") {
            alert("感谢您对该项目的再次支持^_^")
          } else if (jsonData.result == "Insert") {
            alert("感谢您对该项目的支持，已将该项目添加到个人中心")
          } else {
            alert("支付功能出现故障，给你带来不便万分抱歉");
          }
          $.mobile.changePage("#mine");
        })
      }
      $.mobile.loading("hide")
    })
  }

  var bindEvent = function() {
    $("#111").on("click", getAllList);
    $("#newsList").on("click", "a", getNewsInfoById);
    $("#itemsList").on("click", "a", getItemsInfoById);
    $("#myList").on("click", "a", getItemsInfoById);
    $("#submit").on("click", login);
    $("#user").on("click", checkLogin);
    $(".toMine").on("click", checkLogin);
    $("#itemsInfo").on("click", ".box .tstyle a", invest);
    $("#loginOut").on("click", loginOut);
    $(".006").on("click", function() {
      $.mobile.loading("show");
      $.mobile.changePage("#homepage");
      getNewsList("006");
      $("#006").trigger("click");
    })
  }

  $(document).on("pageinit", "#homepage", function() {
    
    if (isbind) return
    isbind = 1;

    bindEvent();
    //获取平台概况
    aboutApp("aboutUs");aboutApp("contact");
    //获取素材列表
    getNewsList("001");getNewsList("002");getNewsList("003");getNewsList("004");getNewsList("005");
    getNewsList("006");
    $("#111").trigger("click");
  });

  $(document).on("pageinit", "#itemsListPage", function() {
    //获取项目列表
    getItemsList("studySpirit", "items_1");getItemsList("studyKnowledge", "items_2");
    getItemsList("studyItems", "items_3");getItemsList("studyPolicy", "items_4");
    getItemsList("studyexp", "items_5");getItemsList("getAllItems", "allItems");
    $("#allItems").trigger("click");
  });

  $(document).on("pageshow", "#mine", function() {
    getMyList();
  }) 