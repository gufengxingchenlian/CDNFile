$(document).ready(function(){
    $(".cat_option_menu .menulist li").click(function(){
      $(window).scrollTop(0);
    });
    $('#cat_notice').css('color','#48aff0');
    $("#cat_notice").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_notice").css('display','block');
    });
    $("#cat_basic").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_basic").css('display','block');
    });
    $("#cat_menu").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_menu").css('display','block');
      $(document).ready(cat_menu);
      $("select[name='cat_musicmode']").change(cat_menu);
    });
    $("#cat_index").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_index").css('display','block');
      $(document).ready(cat_index);
      $("select[name='cat_IndexBackgroundSwitch']").change(cat_index);
      $("select[name='cat_hotpost']").change(cat_index);
      $("select[name='cat_Indexcardsay_news']").change(cat_index);
      $("select[name='cat_Indexcardimg_news']").change(cat_index);
    });
    $("#cat_page").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_page").css('display','block');
      $(document).ready(cat_page);
      $("select[name='cat_diary_weather']").change(cat_page);
    });
    $("#cat_article").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_article").css('display','block');
    });
    $("#cat_link").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_link").css('display','block');
    });
    $("#cat_comment").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_comment").css('display','block');
      $(document).ready(cat_comment);
      $("select[name='cat_comment_IP']").change(cat_comment);
      $("select[name='cat_email_switch']").change(cat_comment);
    });
    $("#cat_effect").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_effect").css('display','block');
      $(document).ready(cat_effect);
      $("select[name='cat_pwa_switch']").change(cat_effect);
      $("select[name='cat_welcome_switch']").change(cat_effect);
    });
    $("#cat_user").click(function(){
      $('.menulist .menu').css('color','#444');
      $(this).css('color','#48aff0');
      $(".typecho-option").css('display','none');
      $(".cat_user").css('display','block');
      $(document).ready(cat_user);
      $("select[name='cat_skin_choose']").change(cat_user);
      $("select[name='cat_qingmo_background_choose']").change(cat_user);
      $("select[name='cat_background']").change(cat_user);
    });
});

function cat_menu() {
    var cat_musicmode = $("select[name='cat_musicmode']").children('option:selected').val();
    if(cat_musicmode == 'one' || cat_musicmode == 'two'){
        $("input[name='cat_musiclist_three']").parentsUntil("form").hide();
        $("textarea[name='cat_musiclist_one']").parentsUntil("form").show();
    }else if(cat_musicmode == 'three'){
        $("textarea[name='cat_musiclist_one']").parentsUntil("form").hide();
        $("input[name='cat_musiclist_three']").parentsUntil("form").show();
    }else{
        $("textarea[name='cat_musiclist_one']").parentsUntil("form").hide();
        $("input[name='cat_musiclist_three']").parentsUntil("form").hide();
    }
}
function cat_index() {
    var cat_IndexBackgroundSwitch = $("select[name='cat_IndexBackgroundSwitch']").children('option:selected').val();
    if(cat_IndexBackgroundSwitch == 'image'){
        $("input[name='cat_IndexBackgroundImage']").parentsUntil("form").show();
        $("input[name='cat_IndexBackgroundVideo']").parentsUntil("form").hide();
        $("textarea[name='cat_IndexBackgroundPics']").parentsUntil("form").hide();
    }else if(cat_IndexBackgroundSwitch == 'video'){
        $("input[name='cat_IndexBackgroundImage']").parentsUntil("form").hide();
        $("input[name='cat_IndexBackgroundVideo']").parentsUntil("form").show();
        $("textarea[name='cat_IndexBackgroundPics']").parentsUntil("form").hide();
    }else if(cat_IndexBackgroundSwitch == 'pics'){
        $("input[name='cat_IndexBackgroundImage']").parentsUntil("form").hide();
        $("input[name='cat_IndexBackgroundVideo']").parentsUntil("form").hide();
        $("textarea[name='cat_IndexBackgroundPics']").parentsUntil("form").show();
    }
    var cat_hotpost = $("select[name='cat_hotpost']").children('option:selected').val();
    if(cat_hotpost == 'user'){
        $("input[name='cat_hotpost_user']").parentsUntil("form").show();
    }else{
        $("input[name='cat_hotpost_user']").parentsUntil("form").hide();
    }
    var cat_Indexcardsay_news = $("select[name='cat_Indexcardsay_news']").children('option:selected').val();
    if(cat_Indexcardsay_news == 'user'){
        $("textarea[name='cat_Indexcardsay_user']").parentsUntil("form").show();
    }else{
        $("textarea[name='cat_Indexcardsay_user']").parentsUntil("form").hide();
    }
    var cat_Indexcardimg_news = $("select[name='cat_Indexcardimg_news']").children('option:selected').val();
    if(cat_Indexcardimg_news == 'pics'){
        $("textarea[name='cat_Indexcardimg_news_pics']").parentsUntil("form").show();
    }else{
        $("textarea[name='cat_Indexcardimg_news_pics']").parentsUntil("form").hide();
    }
}
function cat_page() {
    var cat_diary_weather = $("select[name='cat_diary_weather']").children('option:selected').val();
    if(cat_diary_weather == 'on'){
        $("input[name='cat_diary_weather_key']").parentsUntil("form").show();
    }else{
        $("input[name='cat_diary_weather_key']").parentsUntil("form").hide();
    }
}
function cat_comment() {
    var cat_comment_IP = $("select[name='cat_comment_IP']").children('option:selected').val();
    if(cat_comment_IP == 'on'){
        $("input[name='cat_comment_ip_api']").parentsUntil("form").show();
        $("select[name='cat_comment_place']").parentsUntil("form").show();
    }else{
        $("input[name='cat_comment_ip_api']").parentsUntil("form").hide();
        $("select[name='cat_comment_place']").parentsUntil("form").hide();
    }
    var cat_email_switch = $("select[name='cat_email_switch']").children('option:selected').val();
    if(cat_email_switch == 'on'){
        $("input[name='cat_email_host']").parentsUntil("form").show();
        $("select[name='cat_email_ssl']").parentsUntil("form").show();
        $("input[name='cat_email_port']").parentsUntil("form").show();
        $("input[name='cat_email_nickname']").parentsUntil("form").show();
        $("input[name='cat_email_sendmail']").parentsUntil("form").show();
        $("input[name='cat_email_password']").parentsUntil("form").show();
    }else{
        $("input[name='cat_email_host']").parentsUntil("form").hide();
        $("select[name='cat_email_ssl']").parentsUntil("form").hide();
        $("input[name='cat_email_port']").parentsUntil("form").hide();
        $("input[name='cat_email_nickname']").parentsUntil("form").hide();
        $("input[name='cat_email_sendmail']").parentsUntil("form").hide();
        $("input[name='cat_email_password']").parentsUntil("form").hide();
    }
}
function cat_effect() {
    var cat_welcome_switch = $("select[name='cat_welcome_switch']").children('option:selected').val();
    if(cat_welcome_switch != 'off'){
        $("textarea[name='cat_welcome_user']").parentsUntil("form").show();
    }else{
        $("textarea[name='cat_welcome_user']").parentsUntil("form").hide();
    }
    var cat_pwa_switch = $("select[name='cat_pwa_switch']").children('option:selected').val();
    if(cat_pwa_switch == 'on'){
        $("select[name='cat_pwa_image']").parentsUntil("form").show();
        $("select[name='cat_pwa_media']").parentsUntil("form").show();
        $("input[name='cat_pwa_cdn']").parentsUntil("form").show();
    }else{
        $("select[name='cat_pwa_image']").parentsUntil("form").hide();
        $("select[name='cat_pwa_media']").parentsUntil("form").hide();
        $("input[name='cat_pwa_cdn']").parentsUntil("form").hide();
    }
}
function cat_user() {
    var cat_skin_choose = $("select[name='cat_skin_choose']").children('option:selected').val();
    if(cat_skin_choose == 'off'){
        $("select[name='cat_qingmo_background_choose']").parentsUntil("form").show();
    }else{
        $("select[name='cat_qingmo_background_choose']").parentsUntil("form").hide();
    }
    var cat_qingmo_background_choose = $("select[name='cat_qingmo_background_choose']").children('option:selected').val();
    if(cat_qingmo_background_choose == 'img'){
        $("textarea[name='cat_defaultBackgroundImage']").parentsUntil("form").show();
    }else{
        $("textarea[name='cat_defaultBackgroundImage']").parentsUntil("form").hide();
    }
    var cat_background = $("select[name='cat_background']").children('option:selected').val();
    if(cat_background == 'off'){
        $("input[name='cat_background_user']").parentsUntil("form").hide();
        $("select[name='cat_background_num']").parentsUntil("form").hide();
    }else if(cat_background == 'user'){
        $("input[name='cat_background_user']").parentsUntil("form").show();
        $("select[name='cat_background_num']").parentsUntil("form").show();
    }else{
        $("input[name='cat_background_user']").parentsUntil("form").hide();
        $("select[name='cat_background_num']").parentsUntil("form").show();
    }
}