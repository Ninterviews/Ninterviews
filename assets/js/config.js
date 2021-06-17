(function () {
  $(`input[type='radio'][name='ni-config-youtube'][value='${!!niLocalStorage.youtube}']`).attr("checked", true);
  $(`input[type='radio'][name='ni-config-han'][value='${!!niLocalStorage.han}']`).attr("checked", true);
  $(".ni-config-form").on("submit", function (e) {
    e.preventDefault();
    niLocalStorage.youtube = !($(`input[type='radio'][name='ni-config-youtube']`).toArray().filter(x => x.checked)[0].value === "false");
    niLocalStorage.han = !($(`input[type='radio'][name='ni-config-han']`).toArray().filter(x => x.checked)[0].value === "false");
    localStorage["niLocalStorage"] = JSON.stringify(niLocalStorage);
    location.reload();
  });
})();