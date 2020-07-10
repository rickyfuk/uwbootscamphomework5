
$( document ).ready(function() {

    // var nowDate = moment().format("dddd, MMMM Do YYYY");
    // var nowHour = moment().hour();
    // $("#currentDay").append(nowDate)
    
    
    var nowDateTime = new Date('August 19, 1975 15:15:30');
    var nowHour = moment(nowDateTime).hour();
    console.log(nowHour);
    var nowDate = moment(nowDateTime).format("dddd, MMMM Do YYYY");
    console.log(nowDate);
    var nowDateSave = moment(nowDateTime).format("MMMM Do YYYY");

    $("#currentDay").append(nowDate);
    
    // console.log(moment());
    // console.log(moment().hour());
    // console.log(moment(testTimeDate));
    // console.log(moment(testTimeDate).fromNow());
    // console.log(moment(testTimeDate).diff(moment(), "hour"));
    // console.log((nowDate>testnowDate))


    function createHourBlock(hourCount){
        // create div for the row
        var div1 = document.createElement("div");
        div1.setAttribute("class","row time-block");
        div1.setAttribute("hourRow", hourCount);
        // create div for grouping the hour-block / textarea / submit button
        var div2 = document.createElement("div");
        div2.setAttribute("class","input-group mb-0");
        div2.setAttribute("group", hourCount);
        // create div for the hour-block
        var div3 = document.createElement("div");
        div3.setAttribute("class","input-group-prepend hour align-items-center justify-content-end pr-2")
        // create the textarea for the user to input the day plan
        var textarea1 = document.createElement("textarea");
        textarea1.setAttribute('class',"form-control userinput textareaStyle");
        textarea1.setAttribute('id',"textarea"+ hourCount);
        textarea1.setAttribute('aria-label',"With textarea");
        textarea1.setAttribute('hourTextArea',hourCount);
        // create the div for the submit button
        var div4 = document.createElement("div");
        div4.setAttribute("class","input-group-append")
        var button1 = document.createElement("button");
        button1.setAttribute("type","submit");

        // append the element
        $("#timeBlockStart").append(div1);
        div1.append(div2);
        div2.append(div3);
        // console.log(moment(hourCount, ["HH"]).format("hh A"));
        $(div3).text(moment(hourCount, ["HH"]).format("h A"));
        div2.append(textarea1);
        // console.log(nowHour);
        // console.log(hourCount);
        div2.append(div4);
        div4.append(button1);
        // set the button class and add the image for save icon
        $(button1).attr("class","btn btn-primary saveBtn");
        $(button1).html('<img src="../uwbootscamphomework5/assets/saveicon.png" alt ="save icon"></img>');
    }

    let hourCount = 9;
    for (let i=0;i<9;i++){
        createHourBlock(hourCount);
        hourCount++;   
    }

    $(".textareaStyle").each(function(j){
        if(parseInt(nowHour)>parseInt($("#textarea"+(j+9)).attr("hourTextArea"))){
            $("#textarea"+(j+9)).addClass("past");
        }
        else if(parseInt(nowHour) === parseInt($("#textarea"+(j+9)).attr("hourTextArea"))){
            $("#textarea"+(j+9)).addClass("present");
        }
        else {
            $("#textarea"+(j+9)).addClass("future");
        }
    })

   

})


