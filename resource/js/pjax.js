var pjax = new Pjax({
  /* 在页面进行 PJAX 时需要被替换的元素或容器，一条一个 CSS 选择器，数组形式 */
  selectors: [
    "title",
    /* "meta", 如果是全部 meta 替换的话，只需要写 meta */
    "meta[name='description']",
    "meta[name='keywords']",
    ".main",
    ".cat_title_header",
    ".cat_title_footer",
    ".tab_user",
    ".fanjianzhuanhuan",
    ".foot_bottom",
    ".pjax_end"
  ],
  cacheBust: false
})

document.addEventListener('pjax:send', function (){
    $(".pjax_loading").fadeIn();
});

document.addEventListener('pjax:complete', function (){
    function time(){
        $(".pjax_loading").fadeOut();
    }
    setTimeout(time, 250);
});