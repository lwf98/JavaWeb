$(function () {
    var scale = 1;
    $("#upload-input").change(function () {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        $("#preview").attr({
            "src": url,
            "controls": "controls"
        });
        $("#getPoster").show();
        $(".poster").show();
        $(".uploadPoster").show();
    });

    $("#input-poster").change(function () {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        $(".poster").children("img").attr("src", url);
    });

    $("#getPoster").click(function () {
        getPoster();
    });

    function getPoster() {
        var canvas = document.createElement("canvas");
        canvas.width = $("#preview").width() * scale;
        canvas.height = $("#preview").height() * scale;
         canvas.getContext('2d').drawImage($("#preview")[0], 0, 0, canvas.width, canvas.height);
        $(".poster").children("img").attr("src", canvas.toDataURL('image/png'));
    }
});





