/* 侧栏音乐 */
$(function(){
	var audios = document.getElementsByTagName("audio");
	function pauseAll() {
		var self = this;
		[].forEach.call(audios, function (i) {
			i !== self && i.pause();
		})
	}
	[].forEach.call(audios, function (i) {
		i.addEventListener("play", pauseAll.bind(i));
	});
	$(".netcloudmusic").click(function () {
		if(!$(this).hasClass("netcloudmusic_play")){
			$('.netcloudmusic').removeClass("netcloudmusic_play");
			$(this).addClass("tab_on");
			$('#netcloudmusic_icon').removeClass('ri-pause-circle-line');
			$('#netcloudmusic_icon').addClass('ri-headphone-line');
			$(this).addClass("netcloudmusic_play");
			$('.music-name p').removeClass("on");
			$(this).parents('li').find('.music-name p').addClass("on");
			$(this).find('#netcloudmusic_icon').removeClass('ri-play-circle-line');
			$(this).find('#netcloudmusic_icon').addClass('ri-pause-circle-line');
			$(this).find('.audio').get(0).play();
			$(".changemusic").show();
		}else{
			$(this).removeClass("netcloudmusic_play");
			$(this).removeClass("tab_on");
			$('.music-name p').removeClass("on");
			$(this).find('#netcloudmusic_icon').removeClass('ri-pause-circle-line');
			$(this).find('#netcloudmusic_icon').addClass('ri-play-circle-line');
			$(this).find('.audio').get(0).pause();
			$(".changemusic").hide();
		}
	});
	$(".changemusic").click(function () {
	    var background_music_text = getCookie("background_music");
	    var background_music_arr = background_music_text.split('-');
        var newid = background_music_arr[Math.floor(Math.random() * background_music_arr.length)];
        $('.audio').attr("src","https://music.163.com/song/media/outer/url?id="+newid+".mp3");
        $('.audio').attr("autoplay",'');
	});
    $(".cat_music_menu").hover(function(){
        $(".cat_music_menu").css("background","var(--background-color)");
    },function(){
        $(".cat_music_menu").css("background","var(--background)");
    });
});

    
    
/* Jbox */
$(function(){
	/* jBox-tip之前 */
	var title_user_name = $('.toindex.anniu').attr('title');
    $('.toindex.anniu').append('<span class="anniu_name">' + title_user_name + '</span>');
    
	$('.head_top .anniu').each(function () {
        var titlename = $(this).attr('title');
        $(this).attr('name',titlename);
        $(this).children('.anniu_name').remove();
        $(this).append('<span class="anniu_name">' + titlename + '</span>');
    });
    /* jBox左栏右侧 */
    new jBox('Tooltip', {
        attach: '.head_menu .anniu',
        theme: 'TooltipDark',
        position: {
          x: 'right',
          y: 'center'
        },
        outside: 'x'
    });
});