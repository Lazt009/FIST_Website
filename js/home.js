import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, getDocs  } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";



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


    // https://thinkspeak.com/channels/983726/charts/fieldNum?start=start_date%20start_time&end=end_date%20end_time&dynamic=true&type=graph_type&update=1
    for (var fieldNum = 1; fieldNum <= maxFieldNum; fieldNum++) 
    {
        // console.log("val of " + fieldNum);
        graphHTML +=
            `
            <div class="col-lg-6 col-sm-6" style="padding: 20px">
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
                                    `&type=`+
                                    graph_type +
                                    `&update=1"

                            width="800px"
                            height="260px"
                            frameborder="0"
                            >

                            Browser not compatible.

                        </iframe>
                    </div>
                </div>
            </div>
            `;
    }

    $("#graphDiv").html(graphHTML);
}





const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var exists = false;
        var data = null;
        
        const db = getFirestore();
        getDocs(collection(db, "channel-ids"))
        .then( (response) => {
            //check all responses 
            response.forEach( (d) => {
                // console.log(d.id, user.uid);
                if( d.id == user.uid ) {
                    data = d.data()['channelId'];
                    exists = true;
                }
            });

            //check if channel id exist
            if( exists == false ) {
                window.location.href = "profile.html";
            }
            else{
              	// we got the channel id also
              	console.log(data);
              	
              	// console.log(url);


              	// now we got the url we can now use it call the data
              	//###################################################################################
                  var temp_api = "https://api.thingspeak.com/channels/" + data + "/feeds/entry/1.json?";
                //   var temp_api = `https://api.thingspeak.com/channels/${d.val().api}/feeds/entry/1.json?`;
                        
                  $.getJSON(temp_api , function(data) {
                          var start_date = data.created_at.slice(0,16);
                          // console.log("\n\nReading was taken from : ")
                          console.log("\n\nInitial reading date : ",start_date)
                          $("#startDate").val(start_date);
                  });



                  var temp_api = "https://api.thingspeak.com/channels/983726/feeds/last.json?";

                  $.getJSON(temp_api , function(data) {
                    //   console.log(data.feeds)
                        // var myDataObjArray = data.feeds;
                        // console.log("FROM API----->>  " + JSON.stringify(myDataObjArray[0]));

                        $("#ph").text(data.field1)
                        $("#rtd").text(data.field2)
                        $("#ec").text(data.field3)
                        $("#orp").text(data.field4)
                        $("#do").text(data.field5)
                        // $("#time").text("Time Updated : " + myDataObjArray[0].created_at)
                            //2nd function
                          

                        var end_date = data.created_at.slice(0,16);
                        console.log("Final Reading date   : ",end_date,"\n\n\n")
                        
                        $("#endDate").val(end_date);
                      });




                //   $("#email").attr("value", d.val().email);
                //   $("#uid").attr("value", d.val().uid);
                //   $("#name").attr("value", d.val().name);




                    //   $("#api").attr("value", d.val().api);
                      var channelID = 983726;


                      $('#startDate').on('change',function(){
                          var start=document.getElementById("startDate").value;
                          // console.log("Start date change handler : ",start);

                          var end=document.getElementById("endDate").value;
                          var graph_type= $("#graphType option:selected" ).val();
                          renderGraph(channelID,start,end,graph_type);
                      })


                      $('#endDate').on('change',function(){
                          var end=document.getElementById("endDate").value;
                          // console.log("End date change handler : ",end);

                          var start=document.getElementById("startDate").value;
                          var graph_type= $("#graphType option:selected" ).val();
                          renderGraph(channelID,start,end,graph_type);
                      })


                      $('#graphType').on('change',function(){
                          var graph_type= $("#graphType option:selected" ).val();
                          console.log("\n\nGraph type selected",graph_type)

                          var start=document.getElementById("startDate").value;
                          var end=document.getElementById("endDate").value;
                          renderGraph(channelID,start,end,graph_type);
                      })


              
                      // place of renderGraph


                      // initial render on load
                      var start=document.getElementById("startDate").value;
                      var end=document.getElementById("endDate").value;
                      renderGraph(channelID,start,end,"line");


				  

              	//##################################################################################
        	
                    

    } 
    });
}
});