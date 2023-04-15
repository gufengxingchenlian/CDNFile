$(function(){
    /* tab标签自动显示（第一项），非专题页面 */
    if($('.cat_title_h1').text().trim() != '专题'){
        var tabnum = $(".tab_user div[tabnum*='tab']").first().attr('tabnum');
        $('.tab_user div[tabnum *=' + tabnum + ']').addClass('tab_on');
        $('.tabs_content section').fadeOut("slow");
        $('.tabs_content .' + tabnum).fadeIn("slow");
    }
    if($('.cat_title_h1').text().trim() == '专题'){
        /* 如果没有tab，显示提示 */
        setTimeout(function(){
        if($('.flex_zhuanti_add').length == 0){
            $('#cat_article_start').after("<div style='text-align: center;font-size: 1.5rem;color: var(--main);box-shadow: var(--box-shadow);margin-top: var(--margin);background: var(--background);border: var(--border);border-radius: var(--radius);padding: 1rem;'>未找到文章专题类型，请新建文章，并选择需要的专题类型。</div>");
        } },500);
        /* 专题首页-tab标签切换js(非侧栏，是正文) */
        $("div[zhuanti*='tab']").click(function(){
            var tabnum = $(this).attr('zhuanti');
            if ($('.tab_user div').hasClass('tab_on')) {
              $('.tab_user div').removeClass('tab_on');
            }
            $('.tab_user div[tabnum *=' + tabnum + ']').addClass('tab_on');
            $('.tabs_content section').fadeOut("slow");
            var title = $(".tab_user .tab_on").attr('name');
            var _img = $(".tab_user .tab_on").attr('_img');
            $('.cat_title_h1').text(title);
            if(_img != ""){
                if($('.zhuanti_title_img').css('display') == 'none'){
                    $('.cat_title_life_album').hide();
                    $('.zhuanti_title_img').show();
                }
                $('.zhuanti_title_img').attr('src',_img);
            }
            setTimeout(function(){
                $('.tabs_content .' + tabnum).fadeIn("slow");
                $('html,body').stop().animate({scrollTop: $('#cat_article_start').offset().top},500);
            },500);
        });
    }
});

/* footer_tab标签切换js */
$(".tab_user div[tabnum*='tab']").click(function(){
    var tabnum = $(this).attr('tabnum');
    if ($('.tab_user div').hasClass('tab_on')) {
      $('.tab_user div').removeClass('tab_on');
    }
    $('.tab_user div[tabnum *=' + tabnum + ']').addClass('tab_on');
    $('.tabs_content section').fadeOut("slow");
    
            var _img = $(".tab_user .tab_on").attr('_img');
            if(_img != ""){
                if($('.zhuanti_title_img').css('display') == 'none'){
                    $('.cat_title_life_album').hide();
                    $('.zhuanti_title_img').show();
                }
                $('.zhuanti_title_img').attr('src',_img);
            }
            
    setTimeout(function(){
        $('.tabs_content .' + tabnum).fadeIn("slow");
        $('html,body').stop().animate({scrollTop: $('#cat_article_start').offset().top},500);
    },500);
});

/* 激活轮播图功能 */
{
	if ($('.swiper').length !== 0) {
		new Swiper('.swiper', {
			keyboard: false,
			direction: 'horizontal',
			loop: true,
			autoplay: true,
			mousewheel: false,
			pagination: { el: '.swiper-pagination' },
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		});
	}
}
/* 抽签提示 */
function jbox_chouqian() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'green', content: "抽签成功！！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
function jbox_chouqianed() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'blue', content: "今天已经抽过了，明天再来吧！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
/* 抽签按钮 */
$(".chouqian").click(function(){
	var qian_one = Math.floor(Math.random() * 8);
	var date=new Date();
	date.setDate(date.getDate() + 1);
	date.setHours(8);
	date.setMinutes(0);
	date.setSeconds(0);
    document.cookie = "chouqian="+qian_one+";path=/;expires="+date.toGMTString();
    var qian_arr = ['大凶','凶','末吉','吉','小吉','中吉','大吉','大大吉'];
    console.log('抽签结果：' + qian_arr[qian_one]);
    jbox_chouqian();
    $('.chouqian').hide();
    $('.chouqianed').show();
    $('.chouqianed').html(qian_arr[qian_one]);
});
$(".chouqianed").click(function(){
    jbox_chouqianed();
});
/* 登录弹窗 */
if ($(".Login_ANNIU").length!=0){   
    $(".Login_ANNIU").click(function(){
        $(".cat_login_out").show();
    });
    $(".cat_login_out").click(function(){
        $(this).hide();
    });
    $(".cat_login").click(function(e){
        e.stopPropagation();
    });
}
/* 打赏弹窗 pjax_is_ok */
if ($(".reward").length!=0){   
    $(".reward").click(function(){
        $(".cat_dashang_out").show();
    });
    $(".cat_dashang_out").click(function(){
        $(this).hide();
    });
    $(".cat_dashang").click(function(e){
        e.stopPropagation();
    });
}
/* 获取头像和昵称 */
$("#user_avatar").blur(function(){
	var QQ = $("#user_avatar").val();
	$.ajax({
		url : "https://api.usuuu.com/qq/" + QQ ,
		type: "GET",
		dataType: "json",
		success : function(result) {
			console.log(result["data"].name,result["data"].avatar);
			$("#user_nick").val(result["data"].name);
			$("[name='avatar']").val(result["data"].avatar);
		}
	});
	document.getElementById("user_avatar").value= isNaN(this.value) ? this.value : this.value + "@qq.com";
	$("#user_avatarimg").attr('src', 'https://cravatar.cn/avatar/' + $.md5($("#user_avatar").val()) +'?&d=mm');
});
$("#toavatar").blur(function(){
	var QQ = $("#toavatar").val();
	$.ajax({
		url : "https://api.usuuu.com/qq/" + QQ ,
		type: "GET",
		dataType: "json",
		success : function(result) {
			console.log(result["data"].name,result["data"].avatar);
			$("#tonick").val(result["data"].name);
			$("[name='avatar']").val(result["data"].avatar);
		}
	});
	document.getElementById("toavatar").value= isNaN(this.value) ? this.value : this.value + "@qq.com";
	$("#avatarimg").attr('src', 'https://cravatar.cn/avatar/' + $.md5($("#toavatar").val()) +'?&d=mm');
});
	
	
	
/* 登录弹窗_访客 */
$(function(){
    $(".changeicon_user").click(function(){
        $(".cat_login_user").show();
        $(".cat_login_admin").hide();
    });
    $(".changeicon_admin").click(function(){
        $(".cat_login_user").hide();
        $(".cat_login_admin").show();
    });
});
$("#user_login_botton").click(function(){
    var address = $.md5('https://' + document.domain);
    var username = $('#user_nick').val();
    var usermail = $('#user_avatar').val();
    var useraddress = $('#user_addr').val();
    var date = new Date(); 
    date.setTime(date.getTime()+(7*60*60*1000));   
    document.cookie = address+"__typecho_remember_author="+encodeURI(username)+";path=/;expires="+date.toGMTString();
    document.cookie = address+"__typecho_remember_mail="+encodeURI(usermail)+";path=/;expires="+date.toGMTString();
    document.cookie = address+"__typecho_remember_url="+encodeURI(useraddress)+";path=/;expires="+date.toGMTString();
    window.location.reload();
});
/* 清除cookie方法 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var c = getCookie(name);
    if (c != null){
        document.cookie = name + "=" + c + ";expires=" + exp.toGMTString();
    }
}
$(".user_loginout").click(function(){
    var address = $.md5('https://' + document.domain);
    delCookie(address+"__typecho_remember_author");
    delCookie(address+"__typecho_remember_mail");
    delCookie(address+"__typecho_remember_url");
    window.location.reload();
});


/* head_menu 标签切换js */
$(".head_menu a[tabnum*='cat_']").click(function(){
    var tabnum = $(this).attr('tabnum');
    $('.head_menu a').removeClass('tab_on');
    if(!$(this).hasClass('toindex')) { 
      $('.head_menu a[tabnum *=' + tabnum + ']').addClass('tab_on');
    }
});
/* 全屏显示按钮 */
$("#cat_fullscreen").unbind("click");
$("#cat_fullscreen").click(function(){
	const isFullScreen = document.fullscreenElement;
    if (isFullScreen) {
		$('#cat_fullscreen .anniu').removeClass("tab_on");
        $("#cat_fullscreen #cat_fullscreen_off").hide();
        $("#cat_fullscreen #cat_fullscreen_on").show();
        if (document.exitFullscreen) {document.exitFullscreen();}
        else if (document.msExitFullscreen) {document.msExitFullscreen();} 
        else if (document.mozCancelFullScreen){document.mozCancelFullScreen();} 
        else if (document.webkitCancelFullScreen) {document.webkitCancelFullScreen();}
    } else {
        var fullscreen = document.documentElement;
		$('#cat_fullscreen .anniu').addClass("tab_on");
        $("#cat_fullscreen #cat_fullscreen_on").hide();
        $("#cat_fullscreen #cat_fullscreen_off").show();
        if (fullscreen.requestFullscreen) {fullscreen.requestFullscreen();} 
        else if (fullscreen.mozRequestFullScreen) {fullscreen.mozRequestFullScreen();} 
        else if (fullscreen.webkitRequestFullscreen) {fullscreen.webkitRequestFullscreen();}
        else if (fullscreen.msRequestFullscreen) {fullscreen.msRequestFullscreen();}
    }
});


/* 昼夜模式时间判断（根据html标签判断） */
$(function(){
    if(document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === ''){
        var bq = $('html').attr('class');
        if(bq == 'darkmode silencemode'){
            console.log('静夜模式自动开启（标签）');
            $("#dark_model_ANNIU").hide();
            $("#silence_model_ANNIU").hide();
            $("#light_model_ANNIU").css('display','inline-flex');
        }else if(bq == 'darkmode'){
            console.log('星光模式自动开启（标签）');
            $("#light_model_ANNIU").hide();
            $("#dark_model_ANNIU").hide();
            $("#silence_model_ANNIU").css('display','inline-flex');
            $(".stars").show();
            $('#tourmap_post').hide();
            $('#tourmap_post_dark').show();
            $('#tourmap').hide();
            $('#tourmap_dark').show();
            if ($( ".stars:has(.star)" ).length==0){   
                var stars=800;
                var $stars=$(".stars");
                var r=800;
                for(var i=0;i<stars;i++){
                    var $star=$("<div/>").addClass("star");
                    $stars.append($star);
                }
                $(".star").each(function(){
                    var cur=$(this);
                    var s=0.2+(Math.random()*1);
                    var curR=r+(Math.random()*300);
                    cur.css({ 
                    transformOrigin:"0 0 "+curR+"px",
                    transform:" translate3d(0,0,-"+curR+"px) rotateY("+(Math.random()*360)+"deg) rotateX("+(Math.random()*-50)+"deg) scale("+s+","+s+")"
                });
              });
            } 
        }else{
            console.log('朝阳模式自动开启（标签）');
            $("#light_model_ANNIU").hide();
            $("#silence_model_ANNIU").hide();
            $("#dark_model_ANNIU").css('display','inline-flex');
        }
    }else{
        /* 昼夜模式cookie检测 */
        var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if(night == '3'){
            $("#light_model_ANNIU").hide();
            $("#silence_model_ANNIU").hide();
            $("#dark_model_ANNIU").css('display','inline-flex');
            console.log('朝阳模式开启（cookie）');
        }else if(night == '1'){
            $("#light_model_ANNIU").hide();
            $("#dark_model_ANNIU").hide();
            $("#silence_model_ANNIU").show();
            $(".stars").show();
            $('#tourmap_post').hide();
            $('#tourmap_post_dark').show();
            $('#tourmap').hide();
            $('#tourmap_dark').show();
            if ($( ".stars:has(.star)" ).length==0){   
                var stars=800;
                var $stars=$(".stars");
                var r=800;
                for(var i=0;i<stars;i++){
                    var $star=$("<div/>").addClass("star");
                    $stars.append($star);
                }
                $(".star").each(function(){
                    var cur=$(this);
                    var s=0.2+(Math.random()*1);
                    var curR=r+(Math.random()*300);
                    cur.css({ 
                    transformOrigin:"0 0 "+curR+"px",
                    transform:" translate3d(0,0,-"+curR+"px) rotateY("+(Math.random()*360)+"deg) rotateX("+(Math.random()*-50)+"deg) scale("+s+","+s+")"
                });
              });
            } 
            console.log('星光模式开启（cookie）');
        }else if(night == '2'){
            $("#dark_model_ANNIU").hide();
            $("#silence_model_ANNIU").hide();
            $("#light_model_ANNIU").css('display','inline-flex');
            console.log('静夜模式开启（cookie）');
        }
    }
});
/* 昼夜模式按钮 */
$("#dark_model_ANNIU").click(function(){
    var date = new Date(); 
    date.setTime(date.getTime()+(3*60*60*1000));   
    document.cookie = "night=1;path=/;expires="+date.toGMTString();
    console.log('星光模式手动开启（按钮）');
    $("#dark_model_ANNIU").hide();
    $("#silence_model_ANNIU").css('display','inline-flex');
    $(".stars").show();
	$('html').addClass("darkmode");
    $('#tourmap_post').hide();
    $('#tourmap_post_dark').show();
    $('#tourmap').hide();
    $('#tourmap_dark').show();
    if ($( ".stars:has(.star)" ).length==0){   
        var stars=800;
        var $stars=$(".stars");
        var r=800;
        for(var i=0;i<stars;i++){
            var $star=$("<div/>").addClass("star");
            $stars.append($star);
        }
        $(".star").each(function(){
            var cur=$(this);
            var s=0.2+(Math.random()*1);
            var curR=r+(Math.random()*300);
            cur.css({ 
            transformOrigin:"0 0 "+curR+"px",
            transform:" translate3d(0,0,-"+curR+"px) rotateY("+(Math.random()*360)+"deg) rotateX("+(Math.random()*-50)+"deg) scale("+s+","+s+")"
        });
      });
    } 
});
$("#silence_model_ANNIU").click(function(){
    var date = new Date(); 
    date.setTime(date.getTime()+(3*60*60*1000));   
    document.cookie = "night=2;path=/;expires="+date.toGMTString();
    console.log('静夜模式手动开启（按钮）');
    $("#silence_model_ANNIU").hide();
    $("#light_model_ANNIU").css('display','inline-flex');
    $(".stars").hide();
	$('html').addClass("silencemode");
});
$("#light_model_ANNIU").click(function(){
    var date = new Date(); 
    date.setTime(date.getTime()+(3*60*60*1000));   
    document.cookie = "night=3;path=/;expires="+date.toGMTString();
    console.log('朝阳模式手动开启（按钮）');
    $("#light_model_ANNIU").hide();
    $("#dark_model_ANNIU").css('display','inline-flex');
	$('html').removeClass("darkmode");
	$('html').removeClass("silencemode");
    $('#tourmap_post').show();
    $('#tourmap_post_dark').hide();
    $('#tourmap').show();
    $('#tourmap_dark').hide();
});
/* 滚动百分比 */
window.onscroll = function() {
    let percentage = document.getElementById('percentage');
    let totalH = document.body.scrollHeight || document.documentElement.scrollHeight;
    let clientH = window.innerHeight || document.documentElement.clientHeight;
    let validH = totalH - clientH;
    let scrollH = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollH == 0){
            percentage.innerHTML = '<i class="ri-align-top"></i>';
        }else{
    let fullWindowHeightInPercentage = Math.round((scrollH / validH) * 100);
    percentage.innerHTML = '<div style="width: 1.5rem;font-size: 1.2rem;line-height: 1.3rem;">' + fullWindowHeightInPercentage + '<span style="font-size:small;">%<span></div>';
    if (fullWindowHeightInPercentage == 0) percentage.innerHTML = '<i class="ri-align-top"></i>';
    if (fullWindowHeightInPercentage >= 100) percentage.innerHTML = '<i class="ri-align-bottom"></i>';
    }
};
$('#percentage').on('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


$(function(){
/* 删除#cat_article_start的属性 */
    setTimeout(function(){
        $('#cat_article_start').css('animation','unset');
        $('#cat_article_start').css('-webkit-animation','unset');
        $('#cat_article_start').css('-moz-animation','unset');
    },1200);
/* 头图鼠标滚动，点击下滑 */    
    $('.cat_title_mengban').on("mousewheel", function (e, delta) {
        var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        var delta = Math.max(-1, Math.min(1, wheel));
        if (delta < 0) {
            $('html,body').stop().animate({scrollTop: $('#cat_article_start').offset().top},500);
        }
    });
    $('.cat_title_mengban').click(function(){
        $('html,body').stop().animate({scrollTop: $('#cat_article_start').offset().top},500);
    });
/* 头图鼠标滚动，显示下方标题栏 */
/* 音乐侧栏同步隐藏 */ 
    $(window).scroll(function(){
        var cat_title_block_height =  $('.cat_title_block').height();
        var top = $('html,body').scrollTop();
        if(top >= cat_title_block_height){
            $(".cat_title_footer").fadeIn(300);
            if($(".cat_title_footer").css('top') == '0px'){
                $(".user_webinfo").css('padding-bottom','1rem');
            }else{
                $(".user_webinfo").css('padding-bottom','3.5rem');
            }
            if($(window).width() < 500 && $(".Music_anniu.tab_on").length!=0){
                $(".cat_music_menu").fadeIn(300);
            }
        }else {  
            $(".cat_title_footer").fadeOut(300);
            $(".user_webinfo").css('padding-bottom','1rem');
            if($(window).width() < 500 && $(".Music_anniu.tab_on").length!=0){
                $(".cat_music_menu").fadeOut(300);
            }
        }
    });
/* 点击下方标题栏，显示两侧栏 */   
    $('.cat_title_footer_title,.cat_title_footer_logo,.cat_title_arrow_openmenu').click(function(){var widthA = $(window).width();
        if (widthA < 500){
            var headerhidden = $("header").css("left");
            if (headerhidden != 0){
                $("header").css("left","0");
                $("footer").css("right","0");
                $(".cat_title_footer_mengban").show();
            }
        }
    });
    $('.cat_title_footer_mengban').click(function(){/* 点击蒙版（隐藏） */ 
        var headerhidden = $("header").css("left");
        if (headerhidden != 0){
            $("header").css("left","-11rem");
            $("footer").css("right","-5rem");
            $(".cat_title_footer_mengban").hide();               
            $("#post_menu").fadeOut(300);/* 收起目录 */           
            $(".cat_category_menu").fadeOut(300);/* 收起分类菜单 */           
            $(".cat_search_menu").fadeOut(300);/* 收起搜索条 */        
            $(".cat_admin_menu").fadeOut(300);/* 收起admin条 */ 
            $(".Menu_anniu").removeClass('tab_on');
            $(".Category_anniu").removeClass('tab_on');
            $(".Search_anniu").removeClass('tab_on');
            $(".Admin_anniu").removeClass('tab_on');
        }
    });
    $('.head_top .anniu,#search .submit,#jl_viewHistory a,.cat_category_menu a,.tab_user .anniu:not(.Menu_anniu):not(.Admin_anniu):not(.Category_anniu):not(.Search_anniu),.go_cat_comment,#percentage,.toindex').click(function(){/* 点击其他（隐藏） */ 
        var widthA = $(window).width();
        if (widthA < 500){
            $("header").css("left","-11rem");
            $("footer").css("right","-5rem");
            $(".cat_title_footer_mengban").hide();
        }
    });

{
/* 归档_初始 */
    var firstyear = $('.cat_index_guidang .cat_guidang_years .cat_guidang_year').first().attr('year_id');
    var firstmon = $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon').first().attr('mon_id');
    $('.cat_index_guidang .cat_guidang_years .cat_guidang_year').first().addClass('tab_on');
    $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon[year_id *=' + firstyear + ']').first().addClass('tab_on');
    $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon[year_id *=' + firstyear + ']').css('display','inline-block');
    $('.cat_index_guidang .cat_guidang_day[year_id *=' + firstyear + '][mon_id *=' + firstmon + ']').show();
/* 归档_切换_year */
    $('.cat_index_guidang .cat_guidang_years .cat_guidang_year').click(function () {
        var nextyear = $(this).attr('year_id');
        var nextmon = $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon[year_id *=' + nextyear + ']').first().attr('mon_id');
        $(".cat_index_guidang .cat_guidang_mons .cat_guidang_mon").fadeOut();
        $(".cat_index_guidang .cat_guidang_day").fadeOut();
        setTimeout(function(){
            $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon[year_id *=' + nextyear + ']').css('display','inline-block');
            $('.cat_index_guidang .cat_guidang_years .cat_guidang_year').removeClass('tab_on');
            $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon').removeClass('tab_on');
            $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon[year_id *=' + nextyear + ']').first().addClass('tab_on');
            $('.cat_index_guidang .cat_guidang_years .cat_guidang_year[year_id *=' + nextyear + ']').addClass('tab_on');
            $('.cat_index_guidang .cat_guidang_day[year_id *=' + nextyear + '][mon_id *=' + nextmon + ']').css('display','list-item');
        },500);
    });
/* 归档_切换_mon */
    $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon').click(function () {
        var nextyear = $(this).attr('year_id');
        var nextmon = $(this).attr('mon_id');
        $(".cat_index_guidang .cat_guidang_day").fadeOut();
        $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon').removeClass('tab_on');
        $('.cat_index_guidang .cat_guidang_mons .cat_guidang_mon[year_id *=' + nextyear + '][mon_id *=' + nextmon + ']').addClass('tab_on');
        setTimeout(function(){
            $('.cat_index_guidang .cat_guidang_day[year_id *=' + nextyear + '][mon_id *=' + nextmon + ']').css('display','list-item');
        },500);
    });
}
/* 分类目录 & 搜索条的显示与隐藏 */
    $(".Category_anniu").unbind("click");
    $(".Search_anniu").unbind("click");
    $(".Admin_anniu").unbind("click");
    $(".Music_anniu").unbind("click");
    $("#post_menu").unbind("click");
    $('.Category_anniu').click(function () {
        if( $(".cat_category_menu").css("display")=='none') {
            $(".cat_search_menu").fadeOut(300);
            $("#post_menu").fadeOut(300);
            $(".cat_category_menu").fadeIn(300);
            $(".Search_anniu").removeClass('tab_on');
            $(".Menu_anniu").removeClass('tab_on');
            $(".Category_anniu").addClass('tab_on');
        }else {                
            $(".cat_category_menu").fadeOut(300);
            $(".Category_anniu").removeClass('tab_on');
        }
    });
    $('.Search_anniu').click(function () {
        if( $(".cat_search_menu").css("display")=='none') {
            $(".cat_category_menu").fadeOut(300);
            $("#post_menu").fadeOut(300);
            $(".cat_search_menu").fadeIn(300);
            $(".Category_anniu").removeClass('tab_on');
            $(".Menu_anniu").removeClass('tab_on');
            $(".Search_anniu").addClass('tab_on');
        }else {                
            $(".cat_search_menu").fadeOut(300);
            $(".Search_anniu").removeClass('tab_on');
        }
    });
    $('.Menu_anniu').click(function () {
        if( $("#post_menu").css("display")=='none') {
            $(".cat_search_menu").fadeOut(300);
            $(".cat_category_menu").fadeOut(300);
            $("#post_menu").fadeIn(300);
            $(".Category_anniu").removeClass('tab_on');
            $(".Search_anniu").removeClass('tab_on');
            $(".Menu_anniu").addClass('tab_on');
            if($(document).scrollTop() < $('.cat_title_header').height()) {
                $('html,body').stop().animate({scrollTop: $('#cat_article_start').offset().top},500);
            }
        }else {                
            $("#post_menu").fadeOut(300);
            $(".Menu_anniu").removeClass('tab_on');
        }
    });
    $('.Admin_anniu').click(function () {
        if( $(".cat_admin_menu").css("display")=='none') {
            $(".cat_admin_menu").fadeIn(300);
            $(".Admin_anniu").addClass('tab_on');
        }else {                
            $(".cat_admin_menu").fadeOut(300);
            $(".Admin_anniu").removeClass('tab_on');
        }
    });
    $('.Music_anniu').click(function () {
        if( $(".cat_music_menu").css("display")=='none') {
            $(".cat_music_menu").fadeIn(300);
            $(".Music_anniu").addClass('tab_on');
        }else {                
            $(".cat_music_menu").fadeOut(300);
            $(".Music_anniu").removeClass('tab_on');
        }
    });

/* jBox-tip */
    $('div[id*=jBox]').hide();
    new jBox('Tooltip', {
        attach: '[title]:not(.anniu):not(.cat_post_prevandnext a):not(img):not(.cat_guidang_day a):not(.onlinetime):not(.fanjianzhuanhuan)',
        theme: 'TooltipDark'
    });
    new jBox('Tooltip', {/* jBox右栏左侧 */  
        attach: '.foot_menu .anniu:not(.Dianzan_anniu),.cat_guidang_day a,.fanjianzhuanhuan',
        theme: 'TooltipDark',
        position: {
          x: 'left',
          y: 'center'
        },
        outside: 'x'
    });
    new jBox('Tooltip', {/* jBox跟随 */  
        attach: '.onlinetime',
        theme: 'TooltipDark',
        position: {
          x: 'center',
          y: 'bottom'
        },
    });
/* jBox-notice */

/* 侧栏自定义按钮点击 */
$('.user_set_anniu').on('click', function () {
    $('.anniu').removeClass('tab_on');
    $(this).addClass('tab_on');
});

/* 评论发送提示 */
if ($('#cat_comment').length) {
	let isSubmit = false;
    function jbox_commentA() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'red', content: "请输入正确的邮箱！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    function jbox_commentB() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'red', content: "请输入昵称！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    function jbox_commentC() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'red', content: "请输入评论内容！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    function jbox_commentD() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'blue', content: "评论发送中...", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    function jbox_commentE() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'green', content: "评论发送成功！请等待刷新！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
	$('.cat_comment_respond_form').on('submit', function (e){
	    e.preventDefault();
		const author = $(".cat_comment_respond_form .head input[name='author']").val();
		const mail = $(".cat_comment_respond_form .head input[name='mail']").val();
		const text = $(".cat_comment_respond_form .body textarea[name='text']").val();
		if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(mail)) return jbox_commentA();
		if (author.trim() === '') return jbox_commentB();
		if (text.trim() === '') return jbox_commentC();
		if (isSubmit) return;
		isSubmit = true;
		$('.cat_comment_respond_form .foot .submit button').text('发送中...');
        $('.cat_comment_respond_form .foot .submit button').attr({"disabled":"true"}); 
	    jbox_commentE();
	}); 
}
/* 点赞按钮点击 ok */
$('#agree').on('click', function () {
    /* 发送 AJAX 请求 */
    $.ajax({
      /* 请求方式 post */
      type: 'post',
      /* url 获取点赞按钮的自定义 url 属性 */
      url: $('#agree').attr('data-url'),
      /* 发送的数据 cid，直接获取点赞按钮的 cid 属性 */
      data: 'agree=' + $('#agree').attr('data-cid'),
      async: true,
      timeout: 30000,
      cache: false,
      /* 请求成功的函数 */
      success: function (data) {
        var re = /\d/;  /* 匹配数字的正则表达式 */
        /* 匹配数字 */
        if (re.test(data)) {
          /* 把点赞按钮中的点赞数量设置为传回的点赞数量 */
          $('#agree .agree-num').html(data);
        }
          /* 这里可以添加点赞成功后的效果代码，根据自身需求添加 */
          $('#agree').get(0).disabled = true;  /* 禁用点赞按钮 */
      },
      error: function () {
        /* 如果请求出错就恢复点赞按钮 */
        $('#agree').get(0).disabled = false;
      },
    });
  });


/* 日记动态--点击展开评论 */
$('.eye_button_open[data-fxid*="comment-"]').on('click', function () {
    var fxid = $(this).attr('data-fxid');
    $(this).hide();
    $('#cat_comment .diary_bottom .diary_bottom_right .eye_button_close[data-fxid="' + fxid + '"]').css('display','inline-block');
    $('#cat_comment>ol>li[id="li-' + fxid + '"] .comment-children').slideDown();
});

/* 日记动态--点击收起评论 */
$('.eye_button_close[data-fxid*="comment-"]').on('click', function () {
    var fxid = $(this).attr('data-fxid');
    $(this).hide();
    $('#cat_comment .diary_bottom .diary_bottom_right .eye_button_open[data-fxid="' + fxid + '"]').css('display','inline-block');
    $('#cat_comment>ol>li[id="li-' + fxid + '"] .comment-children').slideUp();
});

/* 日记动态--次级评论数量 */
$('#cat_comment .diary_bottom .diary_bottom_right .eye_button_close[data-fxid*="comment-"]').each(function () {
    var fxid = $(this).attr('data-fxid');
    var num = $('#cat_comment>ol>li[id="li-' + fxid + '"] .comment-children .avatar').length;
    if(num == "0"){
        $('.eye_button_close[data-fxid="' + fxid + '"]').hide();
        $('.eye_button_open[data-fxid="' + fxid + '"]').hide();
    }else{
        $('.cat_diary_single_num[data-fxid="' + fxid + '"]').text(num);
    }
});

/* 日记动态--动态加载次级评论 */
var onVisible = function onVisible(element, callback) {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if(entry.intersectionRatio > 0) {
            observer.disconnect();
            callback(element);
        }
        });
    }).observe(element);
};
$('#cat_comment>ol>li:nth-child(-n+3) .diary_bottom_right .eye_button_open[data-fxid*="comment-"]').each(function() { 
    var fxid = $(this).attr('data-fxid');
    var that = this;
    onVisible(this, () => {
        $(that).click();
    });
});
/* 日记动态--评论展开 end. */
/* 日记动态点赞提交 */
function jbox_diaryA() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'red', content: "登录之后才能点赞哦！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
function jbox_diaryB() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'green', content: "💗 点赞成功！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
function jbox_diaryC() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'red', content: "点赞系统出错！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
function jbox_diaryD() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'yellow', content: "💘 已经赞过啦！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    
$('.like_button[data-zid*="comment-"]').on('click', function () {
    var zid = $(this).attr('data-zid');
	var likename   = $('.user_logined_username').text();
	var likeavatar = $('.user_logined_avatar').attr("src");
	var likemail   = $('.user_logined_usermail').text();
	var likeparent = $('.like_button[data-zid="' + zid + '"]').attr('data-like-coid');
	var likestatus = $('.user_logined_status').text();
    var beforelikenum = $('.like_button[data-zid="' + zid + '"] .beforelike').text();
    var afterlikenum = parseInt(beforelikenum) + 1;
	if (likestatus == "not_online"){
	    jbox_diaryA();
	}else{
    	$.ajax({
    		url: CAT.BASE_API,
    		type: 'POST',
    		data: { routeType: 'diary_like' , likename , likemail , likeparent },
    		dataType: 'text',
            success: function (data) {
                jbox_diaryB();
            	$('.like_button[data-zid="' + zid + '"] i').attr("title","已点赞");
                $('.like_button[data-zid="' + zid + '"] i').css("color","var(--color-red)");
                $('.like_button[data-zid="' + zid + '"] .likenumchange').text(afterlikenum);
                $('.like_button[data-zid="' + zid + '"] .likenumchange').removeClass("likenumchange");
                $('.cat_comment_replyout[replyout_id="' + zid + '"] .likesuccess_newavatar').after('<div class="likedavatar"><img src="' + likeavatar + '"></div>');
                $('.cat_comment_replyout[replyout_id="' + zid + '"] .likesuccess_newavatar').removeClass("likesuccess_newavatar");
                $('.cat_comment_replyout[replyout_id="' + zid + '"] .diary_bottom .noonelike_word').css('display','none');
                $('.cat_comment_replyout[replyout_id="' + zid + '"] .diary_bottom_right .likesuccess').css('display','inline-block');
                $('.cat_comment_replyout[replyout_id="' + zid + '"] .like_button .likenumchange').text(afterlikenum);
                $('.cat_comment_replyout[replyout_id="' + zid + '"] .like_button .likenumfirstchange').text('首赞达成！');
            },
            error: function () {
                jbox_diaryC();
            },
    	});
	}
});
$('.likeD_button').on('click', function () {
    jbox_diaryD();
});




/* 日记————鼠标经过显示相应图片 */
    $('#cat_comment>.comment-list>li[id*="li-comment-"]').mouseenter(function(){
        var liid = $(this).attr('id');
        if($('li[id="' + liid + '"] .cat_diary_image_li').length > 0){
            var imageurl = $('li[id="' + liid + '"] .cat_diary_image_li img').attr('data-src');
            $('.cat_diary_peitu img').fadeOut(500,function(){
                $(this).attr('src',imageurl).bind('onreadystatechange load',function(){
                    if (this.complete) $(this).fadeIn(500);
                });
            });
            $('.cat_diary_peitu span').attr("href",imageurl);
        }
        if($('li[id="' + liid + '"]>.diary_top .undisplay_mood').length > 0){
            var imgmood = '，' + $('li[id="' + liid + '"]>.diary_top .undisplay_mood').text();
        } else {
            var imgmood = '';
        }
        var imgup = $('li[id="' + liid + '"]>.diary_top .date').text();
        $('.cat_diary_peitu .imgup').text(imgup + imgmood);
        if($('li[id="' + liid + '"]>.diary_top .diary_weather').length > 0){
            var imgdown = $('li[id="' + liid + '"]>.diary_top .diary_weather').html();
        } else {
            var imgdown = '';
        }
        $('.cat_diary_peitu .imgdown').html(imgdown);
    });
/* 文章页title——放大缩小*/
    $('.cat_title_arrow_post_down').on('click', function () {
        $(".cat_title_block").animate({height:'97vh'});
        $('.cat_title_arrow_post_down').hide();
        $('.cat_title_arrow_post_up').show();
        $('.cat_style_thin_infohide').show();
        $('.cat_title_title2').css('opacity','1');
        $('.cat_title_header.main_thin').css('margin','1.5vh 5.6rem');
        $('.cat_title_header.main_thin').css('width','auto');
    });
    $('.cat_title_arrow_post_up').on('click', function () {
        $(".cat_title_block").animate({height:'35vh'});
        $('.cat_title_arrow_post_up').hide();
        $('.cat_title_arrow_post_down').show();
        $('.cat_style_thin_infohide').hide();
        $('.cat_title_header.main_thin').css('margin','1.5vh auto');
        $('.cat_title_header.main_thin').css('width','1250px');
    });
    $(".title_big .cat_title_arrow_post_down").click();

/* 地图页——放大缩小 */
    $('.cat_tourmap .cat_title_arrow_map_down').on('click', function () {
        $(".cat_title_block").animate({height:'70vh'});
        $('.cat_title_arrow_map_down').hide();
        $('.cat_title_arrow_map_up').show();
        $('.cat_title_header').addClass('cat_title_map_add');
    });
    $('.cat_tourmap .anniu:not(.cat_title_arrow_map_down)').on('click', function () {
        $(".cat_title_block").animate({height:'35vh'});
        $('.cat_title_arrow_map_up').hide();
        $('.cat_title_arrow_map_down').show();
        $('.cat_title_header').removeClass('cat_title_map_add');
    });
    $('.cat_tour_ANNIU').on('click', function () {
        $('.cat_title_life_album').hide();
        $('.cat_title_mengban span').hide();
        $('.cat_title_arrow_down').hide();
        $('.cat_tourmap').show();
        if(!$("html").hasClass("darkmode")) {
            $('#tourmap').show();
            $('#tourmap_dark').hide();
        }else{
            $('#tourmap').hide();
            $('#tourmap_dark').show();
        }
        $('.cat_title_h1').text('旅行');
    });
    $('.cat_post_ANNIU,.cat_album_ANNIU,.cat_book_ANNIU,.cat_music_ANNIU,.cat_movie_ANNIU,.cat_game_ANNIU,.cat_anime_ANNIU,.cat_github_ANNIU,.cat_steam_ANNIU').on('click', function () {
        $(".cat_tourmap").animate({height:'100%'});
        $(".cat_title_block").animate({height:'35vh'});
        $('.cat_title_arrow_map_up').hide();
        $('.cat_title_arrow_map_down').show();
        $('.cat_title_header').removeClass('cat_title_map_add');
        $('.cat_tourmap').hide();
        $('.cat_tourmap_dark').hide();
        if(!$("html").hasClass("darkmode")) {
            $('.cat_title_mengban span').show();
        }
        $('.cat_title_arrow_down').show();
    });
    $('.foot_menu .tab_user div').on('click', function () {
        if($(this).attr('tabnum')){
            var title = $(this).attr('name');
            $('.cat_title_h1').text(title);
        }
    });
    
    /* 专题页面——文章tab默认 */
    if($('.foot_menu .tab_user div').hasClass('cat_post_ANNIU')){
        $('.cat_post_tab .cat_index_tags .friends_block').first().addClass('tab_on');
        var firsttabname = $('.cat_post_tab .cat_index_tags .friends_block div').first().text();
        $('.cat_post_tab .cat_grid .friends_block[data_post *=' + firsttabname + ']' ).slideDown();
    }
    /* 相册页面——相册tab默认 */
    if($('.foot_menu .tab_user div').hasClass('cat_album_ANNIU')){
        $('.cat_album_tab .cat_index_tags .friends_block').first().addClass('tab_on');
        var firsttabname = $('.cat_album_tab .cat_index_tags .friends_block div').first().text();
        $('.cat_album_tab .cat_grid .friends_block[data_album *=' + firsttabname + ']' ).slideDown();
    }
    /* 书单页面——书单tab默认 */
    if($('.foot_menu .tab_user div').hasClass('cat_book_ANNIU')){
        $('.cat_book_tab .cat_index_tags .friends_block').first().addClass('tab_on');
        var firsttabname = $('.cat_book_tab .cat_index_tags .friends_block div').first().text();
        $('.cat_book_tab .cat_grid .friends_block[data_book *=' + firsttabname + ']' ).slideDown();
    }
        
    /* 专题页面——文章tab切换 */
    $('.cat_post_tab .cat_index_tags .friends_block').on('click', function () {
        var nexttabname = $(this).children('.cat_post_tabname').text();
        $('.cat_post_tab .cat_index_tags .friends_block').removeClass('tab_on');
        $(this).addClass('tab_on');
        $('.cat_post_tab .cat_grid .friends_block').hide();
        $('.cat_post_tab .cat_grid .friends_block[data_post *=' + nexttabname + ']').slideDown();
    });
    /* 相册页面——相册tab切换 */
    $('.cat_album_tab .cat_index_tags .friends_block').on('click', function () {
        var nexttabname = $(this).children('.cat_album_tabname').text();
        $('.cat_album_tab .cat_index_tags .friends_block').removeClass('tab_on');
        $(this).addClass('tab_on');
        $('.cat_album_tab .cat_grid .friends_block').hide();
        $('.cat_album_tab .cat_grid .friends_block[data_album *=' + nexttabname + ']').slideDown();
    });
    $('.cat_book_tab .cat_index_tags .friends_block').on('click', function () {
        var nexttabname = $(this).children('.cat_book_tabname').text();
        $('.cat_book_tab .cat_index_tags .friends_block').removeClass('tab_on');
        $(this).addClass('tab_on');
        $('.cat_book_tab .cat_grid .friends_block').hide();
        $('.cat_book_tab .cat_grid .friends_block[data_book *=' + nexttabname + ']').slideDown();
    });
    
    /* 留言板用户统计区 */
    $('.cat_index_visitors_moreusers').on('click', function () {
        if(!$('.cat_index_visitors_others').is(':visible')) {
            $('.cat_index_visitors_others').slideDown();
            $('.cat_index_visitors_moreusers').html('<i class="ri-arrow-up-line"></i> less');
            $('html,body').animate({scrollTop: $('.cat_index_visitors_moreusers').offset().top-20},500);
        }else{
            $('.cat_index_visitors_others').slideUp();
            $('.cat_index_visitors_moreusers').html('<i class="ri-arrow-down-line"></i> top30');
            $('html,body').animate({scrollTop: $('.cat_index_visitors_top3').offset().top-20},500);
        }
    });
    
    /* 失联友链隐藏 */
    $('.cat_links_unlink_moreusers').on('click', function () {
        $('.unlink_top').slideDown();
        $('.cat_links_unlink_moreusers').hide();
    });
    
    /* owo */
    $('.OwO_1').on('click', function() {
        $('.OwO_1 .OwO-body').slideToggle();
        $(".OwO_2 .OwO-body").hide();
        $(".cat_comment_button_image_block").hide();
        $(".cat_comment_button_links_block").hide();
        $(".cat_comment_button_bilibili_block").hide();
        $(".cat_comment_button_music_block").hide();
    });
    $('.OwO_2').on('click', function() {
        $('.OwO_2 .OwO-body').slideToggle();
        $(".OwO_1 .OwO-body").hide();
        $(".cat_comment_button_image_block").hide();
        $(".cat_comment_button_links_block").hide();
        $(".cat_comment_button_bilibili_block").hide();
        $(".cat_comment_button_music_block").hide();
    });
    /* 评论区按钮升降 */    
    $(".cat_comment_button_image").click(function(){
        $(".cat_comment_button_image_block").slideToggle();
        $(".OwO_1 .OwO-body").hide();
        $(".OwO_2 .OwO-body").hide();
        $(".cat_comment_button_links_block").hide();
        $(".cat_comment_button_bilibili_block").hide();
        $(".cat_comment_button_music_block").hide();
    });
    $(".cat_comment_button_links").click(function(){
        $(".cat_comment_button_links_block").slideToggle();
        $(".OwO_1 .OwO-body").hide();
        $(".OwO_2 .OwO-body").hide();
        $(".cat_comment_button_image_block").hide();
        $(".cat_comment_button_bilibili_block").hide();
        $(".cat_comment_button_music_block").hide();
    });
    $(".cat_comment_button_bilibili").click(function(){
        $(".cat_comment_button_bilibili_block").slideToggle();
        $(".OwO_1 .OwO-body").hide();
        $(".OwO_2 .OwO-body").hide();
        $(".cat_comment_button_links_block").hide();
        $(".cat_comment_button_image_block").hide();
        $(".cat_comment_button_music_block").hide();
    });
    $(".cat_comment_button_music").click(function(){
        $(".cat_comment_button_music_block").slideToggle();
        $(".OwO_1 .OwO-body").hide();
        $(".OwO_2 .OwO-body").hide();
        $(".cat_comment_button_links_block").hide();
        $(".cat_comment_button_bilibili_block").hide();
        $(".cat_comment_button_image_block").hide();
    });
        
    function jbox_comment_button_links_name() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'yellow', content: "链接名不能为空", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    function jbox_comment_button_links_addr() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'yellow', content: "链接地址不能为空", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    function jbox_comment_button_bilibili() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'yellow', content: "未填写BV号", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    function jbox_comment_button_music() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'yellow', content: "未填写音乐ID", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    
    $(".cat_comment_button_links_send").click(function(){
        var comment_links_name_input = $('#comment_links_name_input').val();
        var comment_links_addr_input = $('#comment_links_addr_input').val();
        if (comment_links_name_input==''){
            jbox_comment_button_links_name();
        }else if (comment_links_addr_input==''){
            jbox_comment_button_links_addr();
        }else{
            document.getElementsByClassName('OwO-textarea')[0].value+='{linkname name=\"'+comment_links_name_input+'\" link=\"'+comment_links_addr_input+'\"}';
            $(".cat_comment_button_links_block").slideToggle();
            $("#comment_links_name_input").val("");
            $("#comment_links_addr_input").val("");
        }
    });
    $(".cat_comment_button_bilibili_send").click(function(){
        var comment_bilibili_input = $('#comment_bilibili_input').val();
        if (comment_bilibili_input==''){
            jbox_comment_button_bilibili();
        }else{
            document.getElementsByClassName('OwO-textarea')[0].value+='{bilibili}'+comment_bilibili_input+'{/bilibili}';
            $(".cat_comment_button_bilibili_block").slideToggle();
            $("#comment_bilibili_input").val("");
        }
    });
    $(".cat_comment_button_music_send").click(function(){
        var comment_music_input = $('#comment_music_input').val();
        if (comment_music_input==''){
            jbox_comment_button_music();
        }else{
            document.getElementsByClassName('OwO-textarea')[0].value+='{netmusic}'+comment_music_input+'{/netmusic}';
            $(".cat_comment_button_music_block").slideToggle();
            $("#comment_music_input").val("");
        }
    });
    if($('.cat_index_tags').text().trim().length==0){
        $('.cat_index_tags').remove();
    }
    
    
    
    
    
});



/* Jbox */
$(function(){
    /* jBox-tip之前 */
    $('footer .anniu').each(function () {
        var titlename = $(this).attr('title');
        $(this).attr('name',titlename);
    });
});