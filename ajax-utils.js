// Placeholder for $ajaxUtils.sendGetRequest
var $ajaxUtils = {};
$ajaxUtils.sendGetRequest = function (url, responseHandler, isJsonResponse) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (isJsonResponse) {
        responseHandler(JSON.parse(xhr.responseText));
      } else {
        responseHandler(xhr.responseText);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send(null);
};
