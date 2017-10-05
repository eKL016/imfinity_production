// 按下首頁的"確認報名"後，跳出popup確認
$("#myBtnCheck").on('click', function(){
  $("#popupCheck").addClass('activePopup');
  $("#popupCheck").fadeIn();
  $("#popupCheck div").show();
  $("#checkSubmit").show();
  $("#popupCheck #checkImg").hide();
});
$("#mobile-check-btn").on('click', function(){
  $("#popupCheck").addClass('activePopup');
  $("#popupCheck").fadeIn();
  $("#popupCheck div").show();
  $("#checkSubmit").show();
  $("#popupCheck #checkImg").hide();
});
// 按右上角的叉叉，popup關閉
$('body').on('click','.closePopup', function() {
  $("#popupCheck").fadeOut();
  $("#popupCheck #checkImg").empty();
});
// 按下方的"Check"，會回傳報名狀況
$("#checkSubmit").on('click', function(){
  $("#popupCheck div").hide();
  $("#checkSubmit").hide();
  $("#popupCheck #checkImg").fadeIn();
  $.ajax({
		type: 'POST',
		url: './check',//到時候會變成正確的位置
		data: JSON.stringify({"email":$("#checkemail").val(),
    "password":$("#checkpassword").val()}),
		contentType: "application/json",
		dataType: 'json',
    success: function(data,Textmsg){
      console.log(data);
      if(data.msg==="existed"){
        $("#popupCheck #checkImg").append("<img src='./photo/check.png' style='width:80%;margin:auto;'><div>恭喜完成報名!<br>錄取名單將於5/15公布於粉專</div>");
      }
      else{
        $("#popupCheck #checkImg").append("<img src='./photo/not.png' style='width:80%;margin:auto;'><div>尚未報名<br>若有問題請洽FB粉專</div>");
      };

    }

  });
})
// 立即報名的按鈕 -> 報名頁面
$("#myBtnRegister").on('click',function(){
  location.href = "register";
});
$("#mobile-register-btn").on("click",function(){
  location.href = "register"
});
//歷年回顧 : photo gallery
var now = 0;
$('#photoCircle div').on('click', function(){
  $('#photoCircle div').css('background', 'none');
  $(this).css('background', 'white');
  $(".reviewPhoto img").hide();
  var index = $(this).index() + 1;
  if(index === 1){
    now = 0;
    $('.reviewPhoto img:first-child').show();
  }
  else{
    now = index - 1;
    $('.reviewPhoto img:nth-child(' + index + ')').show();
  }
});
//每隔3秒，photo gallery就會自動輪播到下一張照片
function photoSlide(){
  var last = $(".reviewPhoto img").length - 1;
  $(".reviewPhoto img").hide();
  $("#photoCircle div").css('background', 'none');
  if(now === last){
    now = 0;
    $("#photoCircle div:first-child").css('background', 'white');
    $(".reviewPhoto img:first-child").fadeIn(500);
  }
  else{
    now = now + 1;
    $("#photoCircle div:nth-child(" + (now+1) + ")").css('background', 'white');
    $(".reviewPhoto img:nth-child(" + (now+1) + ")").fadeIn(500);
  }
  setTimeout(photoSlide, 3000);
}
setTimeout(photoSlide, 3000);

// 處理scroll的問題
var label = ["回到最上","營隊介紹","活動簡介","報名資訊","歷年回顧"];
$(document).ready(function() {

  var html;
  var total = $(".js-content").length;

  $(document).on('click', '.js-ProgressBar-circle', function(e){
    $.scrollTo( "#" + $(this).data('scroll'),{ duration : 1000} );
    e.preventDefault();
  })
  $(document).on('click','.homepage-circle', function(e){
    $.scrollTo( "#" + $(this).data('scroll'),{ duration : 1000} );
    e.preventDefault();
  })


  $(".js-content").each(function(i){
    html  = '<div class="ProgressBar-bar js-ProgressBar-bar" style="margin:auto" >';
    html += '<span class="ProgressBar-avancement js-ProgressBar-avancement"></span>';
    html += '<a href="#" data-scroll="' +  $(this).attr('id') + '"<span class="ProgressBar-circle js-ProgressBar-circle"></span></a>';
    html += '</div>';
    $('nav').append(html);
  })
  var floor, background, logoColor, enColor, border, inside;;
  $(window).scroll(function (){
    var height = $(window).height();
    var top = $(this).scrollTop();
    var bottom = top + height;

    var floor = Math.floor(top / height);

    // 設定不同section的顏色
    if(floor === 0){
      background = "#FCFAF2";
      logoColor  = "#B6B2B2";
      enColor    = "#8C8C8C";
      border     = "#E3E3E3";
      inside     = "#E3E3E3";
    }
    else if(floor === 1){
      background = "rgb(217,246,162)";
      logoColor  = "#8CBC36";
      enColor    = "#81AD31";
      border     = "rgb(164,208,84)";
      inside     = "rgb(140,188,54)";
    }
    else if(floor === 2){
      background = "rgb(248,210,187)";
      logoColor  = "#F89D83";
      enColor    = "#E87A90";
      border     = "rgb(241,157,131)";
      inside     = "rgb(242,136,118)";
    }
    else if(floor === 3){
      background = "rgb(210,237,240)";
      logoColor  = "#78C2C4";
      enColor    = "#1E88A8";
      border     = "rgb(4,135,142)";
      inside     = "rgb(40,130,128)";
    }
    else if(floor >= 4){
      background = "rgb(253,237,179)";
      logoColor  = "#F6C555";
      enColor    = "#EA9036";
      border     = "rgb(226,171,60)";
      inside     = "rgb(226,148,59)";
    }
    $("nav").css({'background':background, 'transition':'background 0.5s'});
    $("nav img").css({'background':logoColor, 'transition':'background 0.5s'});
    $("nav .navbar-en").css({'color':enColor, 'transition': 'color 0.5s'});
    $(".ProgressBar-bar").not(":last-child").css({'background':inside, 'transition': 'background 0.5s'});
    $(".ProgressBar-avancement").not(":last-child").css({'background':inside, 'transition': 'background 0.5s'});
    $(".ProgressBar-circle").css({'border':"solid 2.5px " + border,'transition':'border 0.5s'});
    $(".ProgressBar-circle--active").css({'border':"solid 15px " + inside,'transition':'border 0.5s'});


    $(".js-content").each(function(i){
      var this_top = $(this).offset().top;
      var height = $(this).outerHeight();
      var this_bottom = this_top + height;
      var percent = 0;

      if (top >= this_top && top <= this_bottom){ //如果現在滾動到一個js-content的中間
        percent = ((top - this_top) / height) * 100;
        // percent += 10;
      }else if (top > this_bottom) { //如果現在不在這個js-content中，即在後面的js-content中
        percent = 100;
      }
      if( i == total - 1 && Math.round(this_bottom) <= Math.round(bottom) ){ percent = 100; }

      if(i !== total-1)
        $(".js-ProgressBar-bar:eq("+i+") .js-ProgressBar-avancement").css("height", percent + "%");
      if( percent > 0){
          $(".js-ProgressBar-bar:eq("+i+") .js-ProgressBar-circle").addClass('ProgressBar-circle--active');
          $(".js-ProgressBar-bar:eq("+i+") .js-ProgressBar-avancement").addClass('ProgressBar-avancement--active');
          $(".js-ProgressBar-bar:eq("+i+") .js-ProgressBar-caption").addClass('ProgressBar-caption--active');
      }else{
          $(".js-ProgressBar-bar:eq("+i+") .js-ProgressBar-circle").removeClass('ProgressBar-circle--active');
          $(".js-ProgressBar-bar:eq("+i+") .js-ProgressBar-avancement").removeClass('ProgressBar-avancement--active');
          $(".js-ProgressBar-bar:eq("+i+") .js-ProgressBar-caption").removeClass('ProgressBar-caption--active');
      }
    })

  })

})

//loader
var loading;
function myLoading() {
    loading = setTimeout(showPage, 0);
}

function showPage() {
  $("#loading").css('display', 'none');
  $("#loaderBack").css('display', 'none');
  $("#myDiv").css('display', 'block');
  AOS.init({
    duration: 1200,
  });
}
