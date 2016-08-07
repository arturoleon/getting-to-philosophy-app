$(document).ready(function() {
    function success(response){
        if(response.successful == false){
            failed();
            return;
        }

        console.log(response);
        $("#responseText")
            .html("It took <strong>"+ response.elapsed +"</strong> ms get to Philosophy. It required <strong>"
                + response.hops.length +"</strong> hops to get to Philosophy.");

        for(var i = 0; response.hops.length > i; i++){
            var row = $("<tr />");
            row.append($("<td />").text(i+1));
            row.append($("<td />").text(response.hops[i].title));
            row.append($("<td />").text("https://en.wikipedia.org/wiki/" + response.hops[i].url));
            $("#hops tbody").append(row);
            $("#hops").css('visibility', 'visible');
        }

    }

    function failed(){
        $("#responseText")
            .text("Oops. Something went wrong. Either the link doesn't exist or it doesn't take you to Philosophy.");
    }

    function reset(){
        $("#hops tbody").empty();
        $("#responseText").empty();
        $("#responseContent").css('visibility', 'hidden');
        $("#hops").css('visibility', 'hidden');
    }

    function startLoading(){
        $("#submit").prepend('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> ');
        $("#responseContent").css('visibility', 'visible');
    }

    function stopLoading(){
        $("#submit").text($("#submit").text());
    }

    $('form').submit(function(event) {
        reset();
        startLoading();
        const page = $("#wikiPage").val();
        $.get("http://localhost:8080/" + page, success)
            .always(stopLoading)
            .fail(failed);
        event.preventDefault();
    });
});