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

  /* 搜索 */
  $(".ni-navbar-item-search > a").on("click", function (e) {
    e.preventDefault();
    if ($("body").hasClass("ni-search-on")) {
      $("body").removeClass("ni-search-on");
      $(".ni-navbar-item-search").removeClass("active");
      $(".ni-search-content").fadeOut();
    } else {
      $("body").addClass("ni-search-on");
      $(".ni-navbar-item-search").addClass("active");
      $(".ni-search-content").fadeIn();
    }
  });
  $(function () {
    let search = instantsearch({
      indexName: "ninterviews",
      searchClient: algoliasearch("TN8HK9FU3W", "1aeebc6fe49cbe30b834550ca71c7656")
    });

    let hitTemplate = function(hit) {
      let url = hit.url,
          title = hit._highlightResult.title.value,
          interviewees = (hit._highlightResult.interviewees || []).map(x => x.value),
          content = (hit._highlightResult.content || []).value;

      let defineList = $("<dl/>").addClass("ni-search-list-item"),
          defineTitle = $("<dt/>").addClass("ni-search-list-title").append($("<a/>").attr({
            "href": url
          }).html(title)).appendTo(defineList),
          defineInterviewees = interviewees.length ? $("<dd/>").addClass("ni-search-list-interviewees").append($("<ul/>").addClass("list-inline").append(interviewees.map(x => $("<li/>").html(x)))).appendTo(defineList) : null,
          defineContent = $("<dd/>").addClass("ni-search-list-content").html(content).appendTo(defineList);

      return defineList[0].outerHTML;
    }

    search.addWidget(instantsearch.widgets.searchBox({
      container: ".ni-search-searchbar",
      placeholder: "请输入关键词",
      cssClasses: {
        "form": "form-inline",
        "input": "form-control",
        "submit": "btn btn-primary",
        "reset": "btn btn-primary"
      }
    }));
    search.addWidget(instantsearch.widgets.hits({
      container: ".ni-search-hits",
      templates: {
        item: hitTemplate
      }
    }));
    search.addWidget(instantsearch.widgets.poweredBy({
      container: ".ni-search-poweredby",
    }));

    search.start();

    $(".ais-SearchBox-reset").on("click", function (e) {
      if (!$(".ais-SearchBox-input").val()) {
        $(".ni-navbar-item-search > a").trigger("click");
        e.preventDefault();
        e.stopPropagation();
      }
    });
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