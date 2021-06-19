"use strict";
$(function () {
  /* 目录 */
  $(".ni-sidenav-list").on("click", function(e) {
    let target = e.target;
    if (target.tagName.toLowerCase() == "a") {
      e.preventDefault();
      e.stopPropagation();
      let hash = "#" + decodeURIComponent(target.href.split("#")[1]);
      history.pushState({
        "url": location.href
      }, hash, location.href.split("#")[0] + hash);
      $("html").animate({
        scrollTop: $(hash).offset().top
      }, 300);
    }
  });
  $("body").scrollspy({
    "target": ".ni-sidenav"
  });

  /* 返回页面顶端 */
  $(".ni-navtop").on("click", function(e) {
    e.preventDefault();
    $("html").animate({
      scrollTop: 0
    }, 500);
  });
  $(".ni-navbottom").on("click", function(e) {
    e.preventDefault();
    $("html").animate({
      scrollTop: $(document.body).height()
    }, 500);
  });

  /* resize */
  window.windowResize = function () {
    let headerHeight = $(".ni-header").outerHeight(),
        footerHeight = $(".ni-footer").outerHeight();
    $("body").css({
      "margin-bottom": footerHeight + 30
    });
    $(".ni-sidenav-list").affix({
      "offset": {
        "top": $(".ni-content-main").offset().top,
        "bottom": footerHeight
      }
    });
    $(".ni-search-content").css({
      "top": headerHeight,
      "height": $(window).innerHeight() - headerHeight
    });
  };
  windowResize();
  $(window).on("resize", windowResize);

  /* scroll */
  let scrollTimer;
  window.windowScroll = function () {
    $(".ni-footer-navtop").css({
      "bottom": Math.max(($(window).scrollTop() + $(window).innerHeight()) - ($(".ni-content-main").offset().top + $(".ni-content-main").outerHeight()), 25)
    }).fadeIn(200);
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      $(".ni-footer-navtop").fadeOut(500);
    }, 2000);
  }
  $(".ni-footer-navtop").on({
    "mouseenter": function () {
      clearTimeout(scrollTimer);
    },
    "mouseleave": function () {
      scrollTimer = setTimeout(function () {
        $(".ni-footer-navtop").fadeOut(500);
      }, 2000);
    }
  })
  windowScroll();
  $(window).on("scroll", windowScroll);
});