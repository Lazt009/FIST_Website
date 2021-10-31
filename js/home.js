function renderGraph( channelID,start,end,graph_type){

    var temp;

    temp=start.split("T");
    var start_date=temp[0];
    var start_time=temp[1]+":00";

    temp=end.split("T");
    var end_date=temp[0];
    var end_time=temp[1]+":00";

    console.log("\n\nGraph Rendering : \nfrom : ", start_date,start_time,"\nto   : ",end_date,end_time,"\n\n\n");


    var fieldNum = 1;
    var graphHTML = "";

 
    

    //hardcoded ------ to be fetched dynamically from user input
    const maxFieldNum = 5;
    for (var fieldNum = 1; fieldNum <= maxFieldNum; fieldNum++) {
        // console.log("val of " + fieldNum);
        graphHTML +=
`
<div class="col-lg-6 col-sm-6" style="padding: 25px">
      <div class="card" style="border-radius: 10px">
        <div class="row">
          <iframe
            style="border-radius: 10px"
            src="https://thingspeak.com/channels/` +
                            channelID +
                            `/charts/` +
                            fieldNum +
                            // `?start=`+start_date+
                            // `&end=`+"2021-03-10T13:00"+
                            `?start=`+
                            start_date+
                            `%20`+
                            start_time+
                            `&end=`+
                            end_date+
                            `%20`+
                            end_time +
                            `&dynamic=true`+
                            `&type=`+
                            graph_type +
                            `&update=1"
            width="100%"
            height="250px"
            frameborder="0"
            >Browser not compatible.</iframe
          >
        </div>
      </div>
    </div>
  `;
                    }


$("#graphDiv").html(graphHTML);
}

