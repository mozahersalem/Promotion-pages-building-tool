$(document).ready(function () {
  checkHE();
  $('#subBtn').on("click", function (e) {
      var subBtn = $(this);

      if (subBtn.hasClass('subButton')) {
          subBtn.addClass("confirmButton").removeClass("subButton").text("Confirm");
      } else {
          subUser();
      }
  })
});
