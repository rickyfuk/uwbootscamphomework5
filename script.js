
$( document ).ready(function() {

    var nowDate = moment().format("dddd, MMMM Do YYYY")
    $("#currentDay").append(nowDate)

    // why this is not working?
    // var div1 = $("<div>");
    // var div2 = $("<div>")
    // var div3 = $("<div>")

    var div1 = document.createElement("div");
    div1.setAttribute("class","row time-block");
    var div2 = document.createElement("div");
    div2.setAttribute("class","input-group mb-0");
    var div3 = document.createElement("div");
    div3.setAttribute("class","input-group-prepend hour text-right pr-2")
    var textarea1 = document.createElement("textarea");
    textarea1.setAttribute('class',"form-control userinput");
    textarea1.setAttribute('aria-label',"With textarea");
    var div4 = document.createElement("div");
    div4.setAttribute("class","input-group-append")
    var button1 = document.createElement("button");
    button1.setAttribute("class","btn btn-primary saveBtn")
    button1.setAttribute("type","submit");

    // var textarea = $("<textarea>");
    // var div4 = $("<div>");
    // var button = $("<button>");
    $("#timeBlockStart").append(div1);
    div1.append(div2);
    div2.append(div3);
    div2.append(textarea1);
    div2.append(div4);
    div4.append(button1);
    button1.HTML('<img src="../uwbootscamphomework5/assets/saveicon.png" alt ="save icon"></img>')




    // why this is not working?
    // div1.attr("class","row time-block");

})

