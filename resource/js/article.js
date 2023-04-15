$(function(){
/* 目录的生成需要等待文章加载完成之后再生成。 */
    if($('.cat_post_out').find('h1,h2,h3,h4,h5,h6').length == 0){
        $('#post_menu').hide();
        $('.Menu_anniu').hide();
    }else{
        var padding=['h1','h2','h3','h4','h5','h6'];/* 不同的标题等级缩进大小 */
        $('.cat_post_out').find('h1,h2,h3,h4,h5,h6').each(function(index,item){
            var that=$(this);
            $('<span id="menu'+index+'"></span>').insertBefore(that); /* 插入锚点地址 */
            var tagName=that[0].tagName.toLowerCase();
            var tagIndex=parseInt(tagName.charAt(1))-1; /* 根据标题等级分类，并设置不同的缩进。 */
            $('#post_menu').append($('<a target="_self" href="#menu'+index+'" class="post_menu_tag_'+padding[tagIndex]+'">'+that.text()+'</a>'));
        });
        $(".post_menu_tag_h1").prepend('<i class="ri-h-1"></i>. ');
        $(".post_menu_tag_h2").prepend('<i class="ri-h-2"></i>. ');
        $(".post_menu_tag_h3").prepend('<i class="ri-h-3"></i>. ');
        $(".post_menu_tag_h4").prepend('<i class="ri-h-4"></i>. ');
        $(".post_menu_tag_h5").prepend('<i class="ri-h-5"></i>. ');
        $(".post_menu_tag_h6").prepend('<i class="ri-h-6"></i>. ');
        var firstmenuis = $('#post_menu a').first().attr('class');
        var firstmenuis_num = firstmenuis.substr(firstmenuis.length-1,1);
        $(".post_menu_tag_h" + (parseInt(firstmenuis_num)+1).toString()).css('padding-left','2rem');
        $(".post_menu_tag_h" + (parseInt(firstmenuis_num)+2).toString()).css('padding-left','4rem');
        $(".post_menu_tag_h" + (parseInt(firstmenuis_num)+3).toString()).css('padding-left','6rem');
        $(".post_menu_tag_h" + (parseInt(firstmenuis_num)+4).toString()).css('padding-left','8rem');
        $(".post_menu_tag_h" + (parseInt(firstmenuis_num)+5).toString()).css('padding-left','10rem');
    }
	
/* 文章注脚_防止新窗口打开 */
    $('sup a').each(function () {
        $(this).attr('target','_self');
    });
    $('.footnotes a').each(function () {
        $(this).attr('target','_self');
    });
    
/* 点赞按钮效果 */
    function jbox_like() { new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'blue', content: "感谢您的赞赏！", animation: { open: 'slide:bottom', close: 'slide:left' } }); }
    $('.Dianzan_anniu').click(function () {
        $(this).addClass('tab_on');
        $('.Dianzan_anniu .anniu_num').text('✓');
        jbox_like();
    });
	
/* 正文、日记页面图片格式优化 （在灯箱之前执行） */
    $('.cat_comment_replyout[replyout_id*="comment-"]').each(function () {
        var comment_id = $(this).attr('replyout_id');
        $('.cat_comment_replyout[replyout_id="' + comment_id + '"] .substance img:not(.owo_image)').wrapAll('<div class="cat_comment_gridimage"></div>');
    });
    $('.cat_userpage_text img:not(.owo_image)').each(function () {
        $(this).hide();
    });
    
/* 灯箱 */
	$('.isfancy').each(function () {
        let imgaddr = $(this).attr('data-src');
        let imgalt = $(this).attr('alt');
		$(this).wrap('<span data-fancybox="gallery" data-caption="' + imgalt + '" href="' + imgaddr + '"></span>');
	});
	$('.isfancy_ungallery').each(function () {
        let imgaddr = $(this).attr('data-src');
		$(this).wrap('<span data-fancybox href="' + imgaddr + '"></span>');
	});
/* 灯箱end */
$(".cat_comment_gridimage").nextAll('br').remove();
$('.cat_comment_gridimage').unwrap();
$('.postimg').each(function () {
    var img_alt = $(this).attr('alt');
    $(this).after("<div class='cat_post_album_text'>" + img_alt + "</div>");
});
$(".cat_post_tuji br").remove();
$(".postimg").parent().each(function () {
    if ($(this).parent().is("p")) {
        $(this).unwrap();
    }
});

/* （在灯箱之前执后）end */

/* 验证码 */
if ($('#CaptchaText').length > 0){
    var EquipmentInfo = navigator.userAgent;
    var Equipment = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    var IsPC = true;
    for (var Equipments = 0; Equipments < Equipment.length; Equipments++) {
    	if (EquipmentInfo.indexOf(Equipment[Equipments]) != -1 || navigator.maxTouchPoints > 1) {
    		IsPC = false;
    		break;
    	}
    }
    var Captcha = document.getElementById("Captcha");
    var CaptchaText = document.getElementById("CaptchaText");
    var commentPut = document.getElementById("comment_put");
    if (IsPC) {
    		var MouseArr = 0;
    		var MousePosition = [];
    		Captcha.onmousemove = function(evt) {
    			var e = evt || event;
    			if (MouseArr < 200) {
    				MousePosition[MouseArr] = e.clientX;
    				CaptchaText.innerHTML = '<i class="ri-code-s-line"></i> 继续滑动 ' + Math.ceil((MousePosition.length / 200) * 100) + '%';
    				MouseArr++;
    			} else {
    				$('#Captcha').hide();
    				$('#Captcha_ok').show();
    			}
    		};
    } else {
		Captcha.onclick = function() {
			CaptchaText.innerHTML = '<i class="ri-radio-button-line"></i> 再次点击';
			Captcha.onclick = function() {
				$('#Captcha').hide();
    			$('#Captcha_ok').show();
			};
		};
	}
}
/* 验证码end */

/* 私密评论（样式） */
    $('.comment_secert .no_secert').click(function () {
        $('.comment_secert input:checkbox').attr("checked", true);
        $('.OwO-textarea').addClass("comment_secert_textarea");
        $('.comment_secert .no_secert').hide();
        $('.comment_secert .yes_secert').show();
    });
    $('.comment_secert .yes_secert').click(function () {
        $('.comment_secert input:checkbox').attr("checked", false);
        $('.OwO-textarea').removeClass("comment_secert_textarea");
        $('.comment_secert .yes_secert').hide();
        $('.comment_secert .no_secert').show();
    });
/* 私密评论end */

$('cat_article_hide').unwrap();

/* 评论用户外链 */
$('#cat_comment .user .author a').attr({ target:"_blank"});

/* 评论跳转 */
    const $comment = document.querySelector('#cat_comment');
    $('.go_cat_comment').on('click', function () {
        const top = $comment.offsetTop - 10;
		window.scrollTo({ top, behavior: 'smooth' });
    });

/* 评论默认弹窗 */
    $('.cat_comment_title').click(function () {
        $('.respond').addClass('cat_comment_body');
        $('.cat_comment_replyout_style').show();
    });
    /* 评论取消回复 */
    $('.cat_cancel_titleout').click(function () {
        $(".respond").removeClass("cat_comment_body");
        $('.cat_comment_replyout_style').hide();
    });
    $('.respond').click(function (e){
        e.stopPropagation();
    });
    
/* 评论回复弹窗 */
    $('.cat_comment_replyout div[reply_id*="comment-"]').click(function () {
        var xid = $(this).attr('reply_id');
        $('.diary_input_hidden').hide();
        $('.diary_input_authorinfo').css('display','block');
        $('.diary_input_authorinfo .list').css('width','100%');
        $('.diary_input_authorinfo .list').css('margin','0.5rem 0');
        $('.cat_comment_replyout[replyout_id="' + xid + '"] cat_article_bili').hide();
        $('.cat_comment_replyout[replyout_id="' + xid + '"] meting-js').hide();
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .diary_gridimage').hide();
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .handle').addClass('cat_hide');
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .cat_left_line').addClass('cat_hide');
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .cat_left_circle').addClass('cat_hide');
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .diary_bottom').addClass('cat_hide');
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .cat_comment_body').addClass('cat_hide_margin');
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .cat_comment_reply').hide();
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .cat_comment_gridimage').hide();
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .cat_comment_reply').addClass('cat_comment_reply_temp');
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .cat_comment_reply').removeClass('cat_comment_reply');
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .substance').addClass('comment_out_in3line');
        $('.cat_comment_replyout[replyout_id="' + xid + '"] .substance').removeClass('substance');
        $('.cat_comment_replyout[replyout_id="' + xid + '"]').addClass('cat_comment_replyout_style');
    });
    /* 评论取消回复 */
    $('#cancel-comment-reply-link').html('<i class="ri-close-circle-fill"></i>');
    $('#cancel-comment-reply-link').click(function () {
        $('.diary_input_hidden').show();
        $('.diary_input_authorinfo').css('display','flex');
        $('.diary_input_authorinfo .list').css('width','10rem');
        $('.diary_input_authorinfo .list').css('margin','0');
        $('cat_article_bili').show();
        $('meting-js').show();
        $('.diary_gridimage').show();
        $('.cat_hide').removeClass('cat_hide');
        $('.cat_comment_body').removeClass('cat_hide_margin');
        $('.cat_comment_replyout .cat_comment_reply_temp').addClass('cat_comment_reply');
        $('.cat_comment_replyout .cat_comment_reply').removeClass('cat_comment_reply_temp');
        $('.cat_comment_reply').show();
        $('.cat_comment_gridimage').show();
        $(".comment_out_in3line").addClass('substance');
        $(".substance").removeClass('comment_out_in3line');
        $(".cat_comment_replyout").removeClass("cat_comment_replyout_style");
    });
/* 旅行地图文章 */
{
    if(!$("html").hasClass("darkmode")) {
        $('#tourmap_post').show();
        $('#tourmap_post_dark').hide();
    }else{
        $('#tourmap_post').hide();
        $('#tourmap_post_dark').show();
    }
}
/* 文章字体大小切换 */
    $(".Fontsize_anniu").toggle(
        function(){
            $(".cat_post_out>p").css("font-size","1.125rem");
            $(".Fontsize_anniu").addClass('tab_on');
            $('.Fontsize_anniu .anniu_num').text('×1');
            new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'green', content: "正文字体已放大为1.25倍", animation: { open: 'slide:bottom', close: 'slide:left' } });
        },
        function(){
            $(".cat_post_out>p").css("font-size","1.2rem");
            $('.Fontsize_anniu .anniu_num').text('×2');
            new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'green', content: "正文字体已放大为1.5倍", animation: { open: 'slide:bottom', close: 'slide:left' } });
        },
        function(){
            $(".cat_post_out>p").css("font-size","1rem");
            $(".Fontsize_anniu").removeClass('tab_on');
            new jBox('Notice', { theme: 'NoticeFancy', attributes: { x: 'left', y: 'bottom' }, color: 'green', content: "正文字体大小已恢复", animation: { open: 'slide:bottom', close: 'slide:left' } });
            $('.Fontsize_anniu .anniu_num').text('');
        }
    );
    
/* 相册缩略图切换 */

    if($(".Album_small_anniu").css("display")!='none' && $("#cat_article_start").hasClass("cat_post_album_out_grid")) {
        $('.cat_post_album_out_grid').css('grid-template-columns','repeat(auto-fill,minmax(10rem,1fr))');
        $('.postalbum_pic_info').hide();
    }
    if($(".Album_small_anniu").css("display")!='none' && $("#cat_article_start").hasClass("cat_post_album_out_column")) {
        $('.cat_post_album_out_column img').css('height','9rem');
        $('.postalbum_pic_info').hide();
    }
        
    $(".Album_large_anniu").unbind("click");
    $(".Album_small_anniu").unbind("click");
    $('.Album_large_anniu').click(function () {
        if($(document).scrollTop() < $('.cat_title_header').height()) {
            $('html,body').stop().animate({scrollTop: $('#cat_article_start').offset().top},500);
        }
        if($("#cat_article_start").hasClass("cat_post_album_out_grid")) {
            $('.cat_post_album_out_grid').css('grid-template-columns','repeat(auto-fill,minmax(10rem,1fr))');
        }
        if($("#cat_article_start").hasClass("cat_post_album_out_column")) {
            $('.cat_post_album_out_column img').css('height','9rem');
        }
        $(this).hide();
        $('.postalbum_pic_info').hide();
        $('.Album_small_anniu').show();
    });
    $('.Album_small_anniu').click(function () {
        if($(document).scrollTop() < $('.cat_title_header').height()) {
            $('html,body').stop().animate({scrollTop: $('#cat_article_start').offset().top},500);
        }
        if($("#cat_article_start").hasClass("cat_post_album_out_grid")) {
            $('.cat_post_album_out_grid').css('grid-template-columns','repeat(auto-fill,minmax(15rem,1fr))');
        }
        if($("#cat_article_start").hasClass("cat_post_album_out_column")) {
            $('.cat_post_album_out_column img').css('height','14rem');
        }
        $(this).hide();
        $('.postalbum_pic_info').show();
        $('.Album_large_anniu').show();
    });
    
/* 文章正文，代码头部标题 */    
    if ($('.cat_post_out pre[class*="language-"]').length > 0){
        $('.cat_post_out pre[class*="language-"]').each(function () {
            var prename = $(this).children().attr('class').toString().substr(9).toUpperCase();
            var name = '<i style="color:var(--theme);" class="ri-code-s-slash-line"></i> ' + prename + ' 代码:';
            $(this).before(name);
        });
    }

/* 正文时间线替换 */
    $('.post_timeline').parent().each(function () {
        $(this).wrapAll('<div class="post_timeline_out"></div>');
    });
    $('.post_timeline').unwrap();


/* 导航模板的jquery */
    $('.navigation_block').parent().each(function () {
        $(this).wrapAll('<div class="grid_14" style="margin: var(--margin) 0;"></div>');
        $(".grid_14 br").remove();
    });
    $('.navigation_block').unwrap();

/* 文章分享弹窗 */
if ($(".postshare").length!=0){   
    $(".postshare").click(function(){
        $(".cat_postshare_out").show();
    });
    $(".cat_postshare_out").click(function(){
        $(this).hide();
    });
    $(".cat_postshare").click(function(e){
        e.stopPropagation();
    });
}

});

