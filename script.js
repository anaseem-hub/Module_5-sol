(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl =
    "https://davids-restaurant.herokuapp.com/categories.json";
  var menuItemsUrl =
    "https://davids-restaurant.herokuapp.com/menu_items.json?category=";

  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  // STEP 0: On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML,
      true
    );
  });

  // STEP 1: Build HTML for the home page based on categories
  function buildAndShowHomeHTML(categories) {
    $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml) {
      var chosenCategoryShortName =
        categories[Math.floor(Math.random() * categories.length)].short_name;
      var finalHtml = insertProperty(homeHtml, "randomCategoryShortName", "'" + chosenCategoryShortName + "'");
      insertHtml("#main-content", finalHtml);
    }, false);
  }

  global.$dc = dc;
})(window);
