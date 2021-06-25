"use strict";
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
});