(function ($) {
    $.fn.extend({
        /* 按键盘实现插入内容 */
        shortcuts: function () {
            this.keydown(function (e) {
                var _this = $(this);
                e.stopPropagation();
                if (e.altKey) {
                    switch (e.keyCode) {
                        case 67:
                            _this.insertContent('[code]' + _this.selectionRange() + '[/code]');
                            break;
                    }
                }
            });
        },
        /* 插入内容 */
        insertContent: function (myValue, t) {
            var $t = $(this)[0];
            if (document.selection) {
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
                sel.moveStart('character', -l);
                var wee = sel.text.length;
                if (arguments.length == 2) {
                    var l = $t.value.length;
                    sel.moveEnd('character', wee + t);
                    t <= 0 ? sel.moveStart('character', wee - 2 * t - myValue.length) : sel.moveStart('character', wee - t - myValue.length);
                    sel.select();
                }
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
                if (arguments.length == 2) {
                    $t.setSelectionRange(startPos - t, $t.selectionEnd + t);
                    this.focus();
                }
            } else {
                this.value += myValue;
                this.focus();
            }
        },
        /* 选择 */
        selectionRange: function (start, end) {
            var str = '';
            var thisSrc = this[0];
            if (start === undefined) {
                if (/input|textarea/i.test(thisSrc.tagName) && /firefox/i.test(navigator.userAgent)) str = thisSrc.value.substring(thisSrc.selectionStart, thisSrc.selectionEnd);
                else if (document.selection) str = document.selection.createRange().text;
                else str = document.getSelection().toString();
            } else {
                if (!/input|textarea/.test(thisSrc.tagName.toLowerCase())) return false;
                end === undefined && (end = start);
                if (thisSrc.setSelectionRange) {
                    thisSrc.setSelectionRange(start, end);
                    this.focus();
                } else {
                    var range = thisSrc.createTextRange();
                    range.move('character', start);
                    range.moveEnd('character', end - start);
                    range.select();
                }
            }
            if (start === undefined) return str;
            else return this;
        }
    });
})(jQuery);

/* 新按钮 */
$(function() {
    const items = [
        {
            title: 'html代码',
            id: 'wmd-html',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18.178l-4.62-1.256-.328-3.544h2.27l.158 1.844 2.52.667 2.52-.667.26-2.866H6.96l-.635-6.678h11.35l-.227 2.21H8.822l.204 2.256h8.217l-.624 6.778L12 18.178zM3 2h18l-1.623 18L12 22l-7.377-2L3 2zm2.188 2L6.49 18.434 12 19.928l5.51-1.494L18.812 4H5.188z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'wmd-button',
            text: '\n!!!\n<p align="center">居中</p>\n<p align="right">居右</p>\n<font size="5" color="red">颜色&大小</font>\n!!!\n'
        },
        {
            title: '短代码',
            id: 'wmd-short-code',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'wmd-button',
            text: '\`短代码\`'
        },
        {
            title: '长代码',
            id: 'wmd-long-code',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 12l-7.071 7.071-1.414-1.414L8.172 12 2.515 6.343 3.929 4.93 11 12zm0 7h10v2H11v-2z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'wmd-button',
            text: '\n\`\`\`html\n    代码主体\n\`\`\`\n'
        },
        {
            title: '回复可见',
            id: 'wmd-hide-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z" fill="rgba(139,139,139,1)"/></svg>',
            type: 'wmd-button',
            text: '\n{cat_hide}\n   这里的内容回复后才能看见\n{/cat_hide}\n'
        },
        {
            title: '插入链接',
            id: 'wmd-addlink-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '[链接名称](链接地址)'
        },
        {
            title: '附件地址',
            id: 'wmd-download-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M14.828 7.757l-5.656 5.657a1 1 0 1 0 1.414 1.414l5.657-5.656A3 3 0 1 0 12 4.929l-5.657 5.657a5 5 0 1 0 7.071 7.07L19.071 12l1.414 1.414-5.657 5.657a7 7 0 1 1-9.9-9.9l5.658-5.656a5 5 0 0 1 7.07 7.07L12 16.244A3 3 0 1 1 7.757 12l5.657-5.657 1.414 1.414z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n{cat_download name="附件名称" url="附件地址" password=""}\n'
        },
        {
            title: '插入表格',
            id: 'wmd-table-button',
            svg: '<svg t="1668215446794" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2736" width="20" height="20"><path d="M182.701 915.991c-40.5 0-74.701-33.539-74.701-74.701V182.71c0-34.822 28.755-74.701 73.206-74.701h660.093c38.579 0 74.701 32.098 74.701 74.701v658.58c0 40.384-30.676 74.701-74.701 74.701H182.701z m478.41-73.826h180.115V667.193H661.111v174.972z m-226.475 0h151.992V667.193H434.636v174.972z m-253.43 0h178.948V667.193H181.206v174.972z m479.905-254.379h180.115V408.164H661.111v179.622z m-226.475 0h151.992V408.164H434.636v179.622z m-253.43 0h178.948V408.164H181.206v179.622z m0-406.808v148.746l660.129 2.225v-150.6l-660.129-0.371z" p-id="2737" fill="#999999"></path></svg>',
            type: 'origin_btn',
            text: '\n| 表头 | 表头 | 表头 |\n| :--: | :--: | :--: |\n| 表格 | 表格 | 表格 |\n| 表格 | 表格 | 表格 |\n| 表格 | 表格 | 表格 |\n'
        },
        {
            title: '时间轴',
            id: 'wmd-timeline',
            svg: '<svg t="1668216348910" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3776" width="20" height="20"><path d="M234.666667 448a64 64 0 1 0 0 128 64 64 0 0 0 0-128z m-149.333334 64a149.333333 149.333333 0 1 1 298.666667 0 149.333333 149.333333 0 0 1-298.666667 0z" fill="#999999" p-id="3777"></path><path d="M234.666667 448a64 64 0 1 0 0 128 64 64 0 0 0 0-128z m-149.333334 64a149.333333 149.333333 0 1 1 298.666667 0 149.333333 149.333333 0 0 1-298.666667 0z" fill="#999999" p-id="3778"></path><path d="M277.333333 128v277.333333H192V128h85.333333zM277.333333 597.333333v298.666667H192V597.333333h85.333333z" fill="#999999" p-id="3779"></path><path d="M469.333333 170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h384a42.666667 42.666667 0 0 1 42.666667 42.666667v256a42.666667 42.666667 0 0 1-42.666667 42.666666H512a42.666667 42.666667 0 0 1-42.666667-42.666666V170.666667z m85.333334 42.666666v170.666667h298.666666v-170.666667H554.666667z" fill="#999999" p-id="3780"></path><path d="M469.333333 597.333333h469.333334v85.333334H469.333333v-85.333334zM469.333333 810.666667h469.333334v85.333333H469.333333v-85.333333z" fill="#999999" p-id="3781"></path></svg>',
            type: 'wmd-button',
            text: '\n-o- 时间轴内容\n-√- 时间轴内容\n-x- 时间轴内容\n-+- 时间轴内容\n--- 时间轴内容\n-i- 时间轴内容\n-?- 时间轴内容\n-!- 时间轴内容\n'
        },
        {
            title: 'Emoji表情',
            id: 'wmd-emoji',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0zm1-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\nEmoji表情\n'
        },
        {
            title: '特殊字符',
            id: 'wmd-character',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n特殊字符\n'
        },
        {
            title: 'TIP文本框',
            id: 'wmd-tip',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm-1 2H4v14h16V5zM8 7v10H6V7h2z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n{cat_tips_user color="#文本框颜色代码"}文本内容{/cat_tips_user}\n'
        },
        {
            title: '文章卡片',
            id: 'wmd-insidepost-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n{cat_insidepost id="站内文章的cid"}\n{cat_bilipost id="B站视频的bv号"}\n{cat_gamepost id="游戏的appid"}\n'
        },
        {
            title: '链接卡片',
            id: 'wmd-usercard-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 8H4v8h16v-8zm0-2V5H4v4h16zm-6 6h4v2h-4v-2z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n{cat_usercard title="卡片标题" url="卡片地址" desc="卡片描述" logo="图片标识"}\n'
        },
        {
            title: '插入图片',
            id: 'wmd-addimage-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n![图片描述](图片链接)\n'
        },
        {
            title: '插入图集',
            id: 'wmd-addimages',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 5H4v14l9.292-9.294a1 1 0 0 1 1.414 0L20 15.01V5zM2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n插入图集\n'
        },
        {
            title: '本地音乐',
            id: 'wmd-localmusic-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 3v14a4 4 0 1 1-2-3.465V5H9v12a4 4 0 1 1-2-3.465V3h13zM5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n{cat_localmusic name="音乐名" artist="艺术家" url="音乐地址" cover="音乐封面"}\n'
        },
        {
            title: '网络音乐',
            id: 'wmd-webmusic-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 3v14a4 4 0 1 1-2-3.465V6H9v11a4 4 0 1 1-2-3.465V3h13z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n{cat_qqmusic}这里输入QQ音乐的单曲ID{/cat_qqmusic}\n{cat_music}这里输入网易云音乐的单曲ID{/cat_music}\n{cat_mlist}这里输入网易云音乐的歌单ID{/cat_mlist}\n'
        },
        {
            title: '本地视频',
            id: 'wmd-video-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM8 5v14h8V5H8zM4 5v2h2V5H4zm14 0v2h2V5h-2zM4 9v2h2V9H4zm14 0v2h2V9h-2zM4 13v2h2v-2H4zm14 0v2h2v-2h-2zM4 17v2h2v-2H4zm14 0v2h2v-2h-2z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n{cat_video}这里输入视频链接地址{/cat_video}\n'
        },
        {
            title: '网络视频',
            id: 'wmd-webvideo-button',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v2h2V5H4zm14 0v2h2V5h-2zM4 9v2h2V9H4zm14 0v2h2V9h-2zM4 13v2h2v-2H4zm14 0v2h2v-2h-2zM4 17v2h2v-2H4zm14 0v2h2v-2h-2z" fill="rgba(153,153,153,1)"/></svg>',
            type: 'origin_btn',
            text: '\n{cat_bili p="1" q="80"}BV号{/cat_bili}\n'
        }
    ];
    items.forEach(_ => {
        let item = $(`<li class="${_.type}" id="${_.id}" title="${_.title}">${_.svg}</li>`);
        item.on('click', function () {
            if(_.type == 'wmd-button'){
                $('#text').insertContent(_.text);
            }
        });
        $('#wmd-button-row').append(item);
    });
});

/* 隐藏默认的插入按钮 */
$(function() {
    $('#wmd-hide-button').before('<li id="wmd-spacer2" class="wmd-spacer"></li>');
    $('#wmd-webvideo-button').after('<li class="wmd-spacer" id="wmd-spacer2"></li><button title="发表" style="box-shadow: unset;padding: 0.5rem;vertical-align: middle;line-height: 0.5rem;border: unset;margin: 0.2rem;border-radius: 20%!important;background: unset;" type="submit" class="btn primary" id="btn-submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.596 1.04l6.347 6.346a.5.5 0 0 1-.277.848l-1.474.23-5.656-5.656.212-1.485a.5.5 0 0 1 .848-.283zM4.595 20.15c3.722-3.331 7.995-4.328 12.643-5.52l.446-4.018-4.297-4.297-4.018.446c-1.192 4.648-2.189 8.92-5.52 12.643L2.454 18.01c2.828-3.3 3.89-6.953 5.303-13.081l6.364-.707 5.657 5.657-.707 6.364c-6.128 1.414-9.782 2.475-13.081 5.303L4.595 20.15zm5.284-6.03a2 2 0 1 1 2.828-2.828A2 2 0 0 1 9.88 14.12z" fill="rgba(153,153,153,1)"/></svg></button><hr id="emojistart" style="border: unset;">');
    var emojiall = "😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠";
    var emojiarr = emojiall.split(" ");
    var emoji = "<div class='emojiblock' style='display:none;'>";
        emojiarr.forEach(function(element) {
            emoji += "<span style='cursor: pointer;margin: 0.25rem;font-size: 1.25rem;line-height: 2rem;' onclick=document.getElementsByClassName('pastable')[0].value+='" + element + "'>" + element + "</span>";
        });
    emoji += "</div>";
    
    var characterall = "〔 〕 〈 〉 「 」 『 』 〖 〗 ︻ ︼ ﹄ ﹃ × ÷ ± ≌ ∽ ≦ ≧ ≒ ≈ ≡ ≠ ≤ ≥ ≮ ≯ ∷ ∫ ∮ ∝ ∞ ∧ ∨ ∑ ∏ ∪ ∩ ∈ ∵ ∴ ⊥ ∥ ∠ ⌒ ⊙ √ ∟ ⊿ ↑ ↓ ← → ↖ ↗ ↙ ↘ ↔ ↕ ‰ ℃ ℉ ° ￡ ￥ ￠ ♂ ♀ ℅ ★ ✰";
    var characterarr = characterall.split(" ");
    var character = "<div class='characterblock' style='display:none;'>";
        characterarr.forEach(function(element) {
            character += "<span onclick=document.getElementsByClassName('pastable')[0].value+='" + element + "'>" + element + "</span>";
        });
    character += "</div>";
    
    $('#emojistart').after(emoji,character);
});



/* 原版按钮替换 */
$(function() {
    $('#wmd-bold-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" fill="rgba(153,153,153,1)"/></svg>');
    $('#wmd-italic-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" fill="rgba(153,153,153,1)"/></svg>');
    $('#wmd-quote-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" fill="rgba(153,153,153,1)"/></svg>');
    $('#wmd-olist-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="rgba(153,153,153,1)"/></svg>');
    
    $('#wmd-ulist-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="rgba(153,153,153,1)"/></svg>');
    $('#wmd-heading-button').hide();
    $('#wmd-hr-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M2 11h2v2H2v-2zm4 0h12v2H6v-2zm14 0h2v2h-2v-2z" fill="rgba(153,153,153,1)"/></svg>');
    $('#wmd-more-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 21v-4H7v4H5v-5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v5h-2zM7 3v4h10V3h2v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3h2zM2 9l4 3-4 3V9zm20 0v6l-4-3 4-3z" fill="rgba(153,153,153,1)"/></svg>');
    
    $('#wmd-undo-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z" fill="rgba(153,153,153,1)"/></svg>');
    $('#wmd-redo-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z" fill="rgba(153,153,153,1)"/></svg>');
    $('#wmd-fullscreen-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z" fill="rgba(153,153,153,1)"/></svg>');
    $('#wmd-exit-fullscreen-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z" fill="rgba(153,153,153,1)"/></svg>');
});

/* 基本按钮追加 */
$(function() {
    $('#wmd-bold-button').after('<li class="wmd-button" id="wmd-shanchuxian" title="删除线" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z" fill="rgba(153,153,153,1)"/></svg></li><li class="wmd-button" id="wmd-xiahuaxian" title="下划线" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" fill="rgba(153,153,153,1)"/></svg></li><li class="wmd-button" id="wmd-dianhuaxian" title="文字注释" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 19a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-5.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm11 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM18 3v2H8v4h9v2H8v4h10v2H6V3h12z" fill="rgba(153,153,153,1)"/></svg></li><li class="wmd-button" id="wmd-copy" title="文字一键复制" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 19a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-5.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm11 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM13 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.621 6.302 14.685 14.685 0 0 0 5.327 3.042l-.536 1.93A16.685 16.685 0 0 1 12 13.726a16.696 16.696 0 0 1-6.202 3.547l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042 18.077 18.077 0 0 1-2.822-4.3h2.24A16.031 16.031 0 0 0 12 10.876a16.168 16.168 0 0 0 2.91-4.876L5 6V4h6V2h2z" fill="rgba(153,153,153,1)"/></svg></li>');
    $('#wmd-italic-button').after('<li class="wmd-button" id="wmd-biaoti" title="正文标题" style="position: relative;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z" fill="rgba(153,153,153,1)"/></svg><div class="biaoticaidan"><span class="wmd-button" id="wmd-biaoti1" title="一级标题" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0H24V24H0z"/><path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" fill="rgba(153,153,153,1)"/></svg></span><span class="wmd-button" id="wmd-biaoti2" title="二级标题" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0H24V24H0z"/><path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" fill="rgba(153,153,153,1)"/></svg></span><span class="wmd-button" id="wmd-biaoti3" title="三级标题" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0H24V24H0z"/><path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z" fill="rgba(153,153,153,1)"/></svg></span><span class="wmd-button" id="wmd-biaoti4" title="四级标题" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0H24V24H0z"/><path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm9-12v8h1.5v2H22v2h-2v-2h-5.5v-1.34l5-8.66H22zm-2 3.133L17.19 16H20v-4.867z" fill="rgba(153,153,153,1)"/></svg></span><span class="wmd-button" id="wmd-biaoti5" title="五级标题" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0H24V24H0z"/><path d="M22 8v2h-4.323l-.464 2.636c.33-.089.678-.136 1.037-.136 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.827 0-3.367-1.224-3.846-2.897l1.923-.551c.24.836 1.01 1.448 1.923 1.448 1.105 0 2-.895 2-2s-.895-2-2-2c-.63 0-1.193.292-1.56.748l-1.81-.904L16 8h6zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z" fill="rgba(153,153,153,1)"/></svg></span><span class="wmd-button" id="wmd-biaoti6" title="六级标题" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0H24V24H0z"/><path d="M21.097 8l-2.598 4.5c2.21 0 4.001 1.79 4.001 4s-1.79 4-4 4-4-1.79-4-4c0-.736.199-1.426.546-2.019L18.788 8h2.309zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" fill="rgba(153,153,153,1)"/></svg></span></div></li>');
    
    $("#wmd-shanchuxian").click(function(){
        $('#text').insertContent('~~删除线内容~~');
    });
    $("#wmd-xiahuaxian").click(function(){
        $('#text').insertContent('<u>下划线内容</u>');
    });
    $("#wmd-dianhuaxian").click(function(){
        $('#text').insertContent('{{文字内容}{文字注释}}');
    });
    $("#wmd-copy").click(function(){
        $('#text').insertContent('{cat_copy text="文字内容"}');
    });
    $("#wmd-biaoti").click(function(){
        $('.biaoticaidan').slideToggle();
    });
    $("#wmd-biaoti1").click(function(){$('#text').insertContent('\n\n# 一级标题\n\n');});
    $("#wmd-biaoti2").click(function(){$('#text').insertContent('\n\n## 二级标题\n\n');});
    $("#wmd-biaoti3").click(function(){$('#text').insertContent('\n\n### 三级标题\n\n');});
    $("#wmd-biaoti4").click(function(){$('#text').insertContent('\n\n#### 四级标题\n\n');});
    $("#wmd-biaoti5").click(function(){$('#text').insertContent('\n\n##### 五级标题\n\n');});
    $("#wmd-biaoti6").click(function(){$('#text').insertContent('\n\n###### 六级标题\n\n');});

    $('#wmd-fullscreen-button').after('<li class="wmd-button" id="wmd-check" title="复选框" style="position: relative;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zm6 2H4.003L4 20h11V9zm-6.497 9l-3.536-3.536 1.414-1.414 2.122 2.122 4.242-4.243 1.414 1.414L8.503 18z" fill="rgba(153,153,153,1)"/></svg><div class="fuxuankuangcaidan"><span class="wmd-button" id="wmd-check1" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z" fill="rgba(153,153,153,1)"/></svg></span><span class="wmd-button" id="wmd-check2" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z" fill="rgba(153,153,153,1)"/></svg></span><span class="wmd-button" id="wmd-check3" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2 6h10v2H7v-2z" fill="rgba(153,153,153,1)"/></svg></span><span class="wmd-button" id="wmd-check4" style="left: 450px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6 6V7h2v4h4v2h-4v4h-2v-4H7v-2h4z" fill="rgba(153,153,153,1)"/></svg></span></div></li>');
    $("#wmd-check").click(function(){
        $('.fuxuankuangcaidan').slideToggle();
    });
    $("#wmd-check1").click(function(){$('#text').insertContent('\n{ } 复选框');});
    $("#wmd-check2").click(function(){$('#text').insertContent('\n{x} 复选框');});
    $("#wmd-check3").click(function(){$('#text').insertContent('\n{-} 复选框');});
    $("#wmd-check4").click(function(){$('#text').insertContent('\n{+} 复选框');});
});

/* 自定义字段区域 */
$(function() {
    var copyright_select = $("select[id*='post_copyright_select']").children('option:selected').val();
    $("input[id*='post_copyright']").parentsUntil("tbody").hide();
    $("textarea[id*='post_copyright']").parentsUntil("tbody").hide();
    $("input[id*='post_copyright_" + copyright_select + "']").parentsUntil("tbody").show();
    $("textarea[id*='post_copyright_" + copyright_select + "']").parentsUntil("tbody").show();
    $("select[id*='post_copyright_select']").change(function(){
        var copyright_new=$(this).children('option:selected').val();
        $("input[id*='post_copyright_']").parentsUntil("tbody").hide();
        $("textarea[id*='post_copyright']").parentsUntil("tbody").hide();
        $("input[id*='post_copyright_" + copyright_new + "']").parentsUntil("tbody").show();
        $("textarea[id*='post_copyright_" + copyright_new + "']").parentsUntil("tbody").show();
    });
});
$(function() {
    var info_select = $("select[id*='post_top_info_select']").children('option:selected').val();
    $("input[id*='post_top_info_']").parentsUntil("tbody").hide();
    $("select[id*='post_top_info_post']").parentsUntil("tbody").hide();
    $("select[id*='post_top_info_album']").parentsUntil("tbody").hide();
    $("input[id*='post_top_info_" + info_select + "']").parentsUntil("tbody").show();
    $("select[id*='post_top_info_" + info_select + "']").parentsUntil("tbody").show();
    $("select[id*='post_top_info_select']").change(function(){
        var info_new=$(this).children('option:selected').val();
        $("input[id*='post_top_info_']").parentsUntil("tbody").hide();
        $("select[id*='post_top_info_post']").parentsUntil("tbody").hide();
        $("select[id*='post_top_info_album']").parentsUntil("tbody").hide();
        $("input[id*='post_top_info_" + info_new + "']").parentsUntil("tbody").show();
        $("select[id*='post_top_info_" + info_new + "']").parentsUntil("tbody").show();
    });
});



window.onload = function () {
    /* 样式栏 */
    $(document).ready(function(){
        if ($("#custom-field").length >0){
            /* 插入链接 */
            $(document).on('click', '#wmd-addlink-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog">'+
                    '<div>'+
                    '<h3><label class="typecho-label">插入链接</label></h3>'+
                    '<p><labe>链接名称</labe></p><input type="text" name="A" placeholder="必填"></input>'+
                    '<p><labe>链接地址</labe></p><input type="text" name="B" placeholder="必填"></textarea>'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-addlink-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('click', '#wmd-addlink-button_ok',function () {
                var A = $('.wmd-prompt-dialog input[name = "A"]').val();   
                var B = $('.wmd-prompt-dialog input[name = "B"]').val(); 
                var textContent = '[' + A + ']('+ B + ')\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 插入附件 */
            $(document).on('click', '#wmd-download-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog">'+
                    '<div>'+
                    '<h3><label class="typecho-label">插入附件</label></h3>'+
                    '<p><labe>附件名称</labe></p><input type="text" name="A" placeholder="必填"></input>'+
                    '<p><labe>附件地址</labe></p><input type="text" name="B" placeholder="必填"></input>'+
                    '<p><labe>授权码</labe></p><input type="text" name="C" placeholder="选填"></input>'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-download-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('click', '#wmd-download-button_ok',function () {
                var A = $('.wmd-prompt-dialog input[name = "A"]').val();   
                var B = $('.wmd-prompt-dialog input[name = "B"]').val(); 
                var C = $('.wmd-prompt-dialog input[name = "C"]').val();
                var textContent = '{cat_download name="' + A + '" url="' + B + '" password="' + C + '"}'+ '\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 文章卡片 */
            $(document).on('click', '#wmd-insidepost-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog wmd-insidepost_change">'+
                    '<div>'+
                    '<h3><label class="typecho-label">文章卡片</label></h3>'+
                    '<p><labe>文章卡片类型</labe></p><select name="A"><option value="insidepost" selected="true">站内文章卡片</option><option value="webpost">网站信息卡片</option><option value="bilipost">B站视频卡片</option><option value="gamepost">游戏信息卡片</option></select>'+
                    '<p><labe>文章编号</labe></p><input type="text" name="B" placeholder="站内文章的cid"></input>'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-insidepost-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>'
                );
            });
            $(document).on('change', ".wmd-insidepost_change select[name*='A']",function () {
                if($(this).val() == 'insidepost'){$(".wmd-insidepost_change input[name*='B']").attr("placeholder", "站内文章的cid");}
                if($(this).val() == 'webpost'){$(".wmd-insidepost_change input[name*='B']").attr("placeholder", "输入url网址");}
                if($(this).val() == 'bilipost'){$(".wmd-insidepost_change input[name*='B']").attr("placeholder", "B站视频的bv号");}
                if($(this).val() == 'gamepost'){$(".wmd-insidepost_change input[name*='B']").attr("placeholder", "游戏的appid");}
            });
            $(document).on('click', '#wmd-insidepost-button_ok',function () {
                var A = $('.wmd-prompt-dialog select[name = "A"]').val();   
                var B = $('.wmd-prompt-dialog input[name = "B"]').val();
                var textContent = '{cat_' + A + ' id="' + B + '"}'+ '\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 链接卡片 */
            $(document).on('click', '#wmd-usercard-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog">'+
                    '<div>'+
                    '<h3><label class="typecho-label">链接卡片</label></h3>'+
                    '<p><labe>卡片标题</labe></p><input type="text" name="A" placeholder="必填"></input>'+
                    '<p><labe>卡片地址</labe></p><input type="text" name="B" placeholder="必填"></input>'+
                    '<p><labe>卡片描述</labe></p><input type="text" name="C" placeholder="必填"></input>'+
                    '<p><labe>图片标识</labe></p><input type="text" name="D" placeholder="选填"></input>'+
                    '</div>'+
                    '<p>不填写图片标识则会自动调用api获取favicon</p>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-usercard-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('click', '#wmd-usercard-button_ok',function () {
                var A = $('.wmd-prompt-dialog input[name = "A"]').val();   
                var B = $('.wmd-prompt-dialog input[name = "B"]').val();
                var C = $('.wmd-prompt-dialog input[name = "C"]').val();
                var D = $('.wmd-prompt-dialog input[name = "D"]').val();
                var textContent = '{cat_usercard title="' + A + '" url="' + B + '" desc="' + C + '" logo="' + D + '"}'+ '\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 插入图片 */
            $(document).on('click', '#wmd-addimage-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog">'+
                    '<div>'+
                    '<h3><label class="typecho-label">插入图片</label></h3>'+
                    '<p><labe>图片描述</labe></p><input type="text" name="A" placeholder="选填"></input>'+
                    '<p><labe>图片链接</labe></p><input type="text" name="B" placeholder="必填"></input>'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-addimage-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('click', '#wmd-addimage-button_ok',function () {
                var A = $('.wmd-prompt-dialog input[name = "A"]').val();   
                var B = $('.wmd-prompt-dialog input[name = "B"]').val(); 
                var textContent = '![' + A + '](' + B + ')'+ '\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 插入图集 */
            $(document).on('click', '#wmd-addimages', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog">'+
                    '<div>'+
                    '<h3><label class="typecho-label">插入图集</label></h3>'+
                    '<p><labe>图集样式</labe></p><select name="A"><option value="grid" selected="true">标准方格</option><option value="column">自适应</option></select>'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-addimages_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('click', '#wmd-addimages_ok',function () {
                var A = $('.wmd-prompt-dialog select[name = "A"]').val();
                var textContent = '{cat_album_' + A + '}\n' + '![图片描述](图片地址)' + '\n' + '![图片描述](图片地址)' + '\n' + '{\/cat_album_' + A + '}' + '\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 本地音乐 */
            $(document).on('click', '#wmd-localmusic-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog">'+
                    '<div>'+
                    '<h3><label class="typecho-label">本地音乐</label></h3>'+
                    '<p><labe>音乐名</labe></p><input type="text" name="A" placeholder="必填"></input>'+
                    '<p><labe>艺术家</labe></p><input type="text" name="B" placeholder="必填"></input>'+
                    '<p><labe>音乐地址</labe></p><input type="text" name="C" placeholder="必填"></input>'+
                    '<p><labe>音乐封面</labe></p><input type="text" name="D" placeholder="选填"></input>'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-localmusic-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('click', '#wmd-localmusic-button_ok',function () {
                var A = $('.wmd-prompt-dialog input[name = "A"]').val();   
                var B = $('.wmd-prompt-dialog input[name = "B"]').val();
                var C = $('.wmd-prompt-dialog input[name = "C"]').val();
                var D = $('.wmd-prompt-dialog input[name = "D"]').val();
                var textContent = '{cat_localmusic name="' + A + '" artist="' + B + '" url="' + C + '" cover="' + D + '"}'+ '\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 网络音乐 */
            $(document).on('click', '#wmd-webmusic-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog wmd-webmusic_change">'+
                    '<div>'+
                    '<h3><label class="typecho-label">网络音乐</label></h3>'+
                    '<p><labe>音乐来源</labe></p><select name="A"><option value="qqmusic" selected="true">QQ音乐</option><option value="music">网易云单曲</option><option value="mlist">网易云歌单</option></select>'+
                    '<p><labe>音乐ID</labe></p><input type="text" name="B" placeholder="QQ音乐 ID值"></input>'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-webmusic-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('change', ".wmd-webmusic_change select[name*='A']",function () {
                if($(this).val() == 'qqmusic'){$(".wmd-webmusic_change input[name*='B']").attr("placeholder", "QQ音乐 ID值");}
                if($(this).val() == 'music'){$(".wmd-webmusic_change input[name*='B']").attr("placeholder", "网易云 单曲ID值");}
                if($(this).val() == 'mlist'){$(".wmd-webmusic_change input[name*='B']").attr("placeholder", "网易云 歌单ID值");}
            });
            $(document).on('click', '#wmd-webmusic-button_ok',function () {
                var A = $('.wmd-prompt-dialog select[name = "A"]').val();   
                var B = $('.wmd-prompt-dialog input[name = "B"]').val();
                var textContent = '{cat_' + A + '}' + B + '{/cat_' + A + '}'+ '\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 本地视频 */
            $(document).on('click', '#wmd-video-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog">'+
                    '<div>'+
                    '<h3><label class="typecho-label">本地视频</label></h3>'+
                    '<p><labe>视频地址</labe></p><input type="text" name="A" placeholder="必填"></input>'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-video-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('click', '#wmd-video-button_ok',function () {
                var A = $('.wmd-prompt-dialog input[name = "A"]').val();
                var textContent = '{cat_video url="' + A + '"}'+ '\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 网络视频 */
            $(document).on('click', '#wmd-webvideo-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog wmd-webvideo_change">'+
                    '<div>'+
                    '<h3><label class="typecho-label">网络视频</label></h3>'+
                    '<p><labe>视频来源</labe></p><select name="A"><option value="bili" selected="true">哔哩哔哩</option><option value="xigua">西瓜视频</option><option value="youku">优酷视频</option><option value="txshipin">腾讯视频</option></select>'+
                    '<p><labe>视频ID</labe></p><input type="text" name="B" placeholder="BV号：BVXXXXX"></input>'+
                    '<div class="needhide"><p><labe>哔哩哔哩视频分p</labe></p><input value="1" type="text" name="C" placeholder="1"></input>'+
                    '<p><labe>哔哩哔哩视频清晰度</labe></p><select name="D"><option value="16">360p</option><option value="32">480p</option><option value="64">720p</option><option value="80" selected="true">1080p</option><option value="112">1080p+</option><option value="120">2k</option><option value="125">4k</option><option value="127">8k</option></select></div>'+
                    '</div>'+
                    '清晰度解析需要开启主题设置内高清解析选项。'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-webvideo-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('change', ".wmd-webvideo_change select[name*='A']",function () {
                if($(this).val() == 'bili'){
                    $(".needhide").show();
                    $(".wmd-webvideo_change input[name*='B']").attr("placeholder", "BV号：BVXXXXX");
                }else{
                    $(".needhide").hide();
                    if($(this).val() == 'xigua'){$(".wmd-webvideo_change input[name*='B']").attr("placeholder", "纯数字：XXXXXXXXXX");}
                    if($(this).val() == 'youku'){$(".wmd-webvideo_change input[name*='B']").attr("placeholder", "XN号：XNXXXXX");}
                    if($(this).val() == 'txshipin'){$(".wmd-webvideo_change input[name*='B']").attr("placeholder", "vid号：xxxxxxx");}
                }
            });
            $(document).on('click', '#wmd-webvideo-button_ok',function () {
                var A = $('.wmd-prompt-dialog select[name = "A"]').val();   
                var B = $('.wmd-prompt-dialog input[name = "B"]').val();
                var C = $('.wmd-prompt-dialog input[name = "C"]').val();
                var D = $('.wmd-prompt-dialog select[name = "D"]').val();
                var textContent = '{cat_' + A + ' p="' + C + '" q="' + D + '"}' + B + '{/cat_' + A + '}'+ '\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* TIP文本框 */
            $(document).on('click', '#wmd-tip', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog wmd-tip_change">'+
                    '<div>'+
                    '<h3><label class="typecho-label">TIP文本框</label></h3>'+
                    '<p><labe>TIP文本框类型</labe></p><select name="A"><option value="success" selected="true">成功</option><option value="info">信息</option><option value="warning">警告</option><option value="error">错误</option><option value="user">自定义</option></select>'+
                    '<div class="needhide" style="display:none;"><p><labe>自定义文本框颜色</labe></p><input type="text" name="B" placeholder="#66ccff"></input></div>'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-tip_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('change', ".wmd-tip_change select[name*='A']",function () {
                if($(this).val() == 'user'){
                    $(".needhide").show();
                }else{
                    $(".needhide").hide();
                }
            });
            $(document).on('click', '#wmd-tip_ok',function () {
                var A = $('.wmd-prompt-dialog select[name = "A"]').val();   
                var B = $('.wmd-prompt-dialog input[name = "B"]').val();
                var textContent = '{cat_tips_' + A + ' color="' + B + '"}文本内容{/cat_tips_' + A + '}'+ '\r\n';
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* Emoji表情 */
            $(document).on('click', '#wmd-emoji', function() {
                $('.emojiblock').slideToggle();
                
            });
            /* 特殊字符 */
            $(document).on('click', '#wmd-character', function() {
                $('.characterblock').slideToggle();
                
            });
            /* 插入表格 */
            $(document).on('click', '#wmd-table-button', function() {
                $('body').append(
                    '<div id="postPanel">'+
                    '<div class="wmd-prompt-background" style="position: fixed; top: 0px; z-index: 1000; opacity: 0.5; height: 100%; left: 0px; width: 100%;"></div>'+
                    '<div class="wmd-prompt-dialog">'+
                    '<div>'+
                    '<h3><label class="typecho-label">插入表格</label></h3>'+
                        '<label>表格行</label><input type="number" style="width: 50px; margin: 10px; padding: 7px;" value="3" autocomplete="off" name="A">'+
                        '<label>表格列</label><input type="number" style="width: 50px; margin: 10px; padding: 7px;" value="3" autocomplete="off" name="B">'+
                    '</div>'+
                    '<form>'+
                    '<button type="button" class="btn btn-s primary" id="wmd-table-button_ok">确定</button>'+
                    '<button type="button" class="btn btn-s" id="post_cancel">取消</button>'+
                    '</form>'+
                    '</div>'+
                    '</div>');
            });
            $(document).on('click', '#wmd-table-button_ok',function () {
				let row = $(".wmd-prompt-dialog input[name='A']").val();
				let column = $(".wmd-prompt-dialog input[name='B']").val();
				if (isNaN(row)) row = 3;
				if (isNaN(column)) column = 3;
				let rowStr = '';
				let rangeStr = '';
				let columnlStr = '';
				for (let i = 0; i < column; i++) {
					rowStr += '| 表头 ';
					rangeStr += '| :--: ';
				}
				for (let i = 0; i < row; i++) {
					for (let j = 0; j < column; j++) columnlStr += '| 表格 ';
					columnlStr += '|\n';
				}
				const textContent = `${rowStr}|\n${rangeStr}|\n${columnlStr}\n`;
                $('#text').insertContent(textContent);
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
            /* 取消 */
            $(document).on('click','#post_cancel',function() {
                $('#postPanel').remove();
                $('#wmd-editarea textarea').focus();
            });
        }
    });



/* 批量添加图片 */
$('#upload-panel').append('<div class="piliangimg">批量添加图片附件<br><font size="2" color="gery">如无法添加新上传的图片，请保存此文章后，重新点击此按钮尝试批量添加</font></div>');
$('#upload-panel').on('click','.piliangimg',function() {
    textContent='\n';
    $('#file-list li').each(function() {
        $url = $(this).attr('data-url');
        if(typeof($url) != 'undefined'){
            textContent = textContent + '![]('+$url+')\n';
        }
    });
    $('#text').insertContent(textContent);
    $('#wmd-editarea textarea').focus();
});



};
