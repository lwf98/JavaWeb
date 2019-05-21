$(function () {
   $("body").delegate(".card__link","click",function () {
       $(this.parentElement.previousElementSibling.parentElement.parentElement.firstElementChild).css({
           display:"block"
       });

      $(".delete").click(function () {
        $(this.parentElement.parentElement).css({
            display:"none"
        });
      })




   })
})