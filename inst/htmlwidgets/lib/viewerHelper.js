console.log('viewerHelper.js 15-05-20 063:0');
/*$(document).ready(function() {
  consiole.log('in doc ready');
  $("#pttrn_rcgntn_vw_orgnls_button").click(function() {
    alert("pttrn_rcgntn_vw_orgnls_button");

  });
});

$(function() {
  $( "#pttrn_rcgntn_vw_orgnls_button" ).click(function() {
    alert( "Handler for pttrn_rcgntn_vw_orgnls_button called." );
  });
});*/


    var pttrn_rcgntn_vw_orgnls_1 = new viewerClass(
      "pttrn_rcgntn_orgnl_imgs_1",
      "pttrn_rcgntn_fltrd_rslts_prmry.csv"),
    pttrn_rcgntn_vw_orgnls_2 = new viewerClass(
      "pttrn_rcgntn_orgnl_imgs_2",
      "pttrn_rcgntn_fltrd_rslts_scndry.csv");

    // original imgs vwers
    Shiny.addCustomMessageHandler("pttrn_rcgntn_vw_orgnls_button",
        function(mesg) {
                console.log('clicked pttrn_rcgntn_vw_orgnls_button');
                console.log(pttrn_rcgntn_vw_orgnls_1.moduleId + ' b4 fsd array size  : ' +
                                pttrn_rcgntn_vw_orgnls_1.result);
                pttrn_rcgntn_vw_orgnls_1.restart();
                pttrn_rcgntn_vw_orgnls_1.fetchServerData("pttrn_rcgntn_fltrd_rslts_prmry.csv");

                console.log(pttrn_rcgntn_vw_orgnls_1.moduleId + ' aftr fsd array size  : ' +
                                pttrn_rcgntn_vw_orgnls_1.result);

                console.log(pttrn_rcgntn_vw_orgnls_2.moduleId + ' b4 fsd array size  : ' +
                pttrn_rcgntn_vw_orgnls_2.result);

                pttrn_rcgntn_vw_orgnls_2.restart();

                pttrn_rcgntn_vw_orgnls_2.fetchServerDataTest("pttrn_rcgntn_fltrd_rslts_scndry.csv");

                console.log(pttrn_rcgntn_vw_orgnls_2.moduleId + ' aftr fsd array size  : ' +
                pttrn_rcgntn_vw_orgnls_2.result);    
        }
    );

    Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_prev_button",
                    function(mesg) {
                            pttrn_rcgntn_vw_orgnls_1.prev();
                          // setTimeout(() => {
                                    pttrn_rcgntn_vw_orgnls_2.prev();  
                            //}, 1000);
                          // 
                    }
            );


      Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_reset_button",
                    function(mesg) {
                            pttrn_rcgntn_vw_orgnls_1.reset();
                                    pttrn_rcgntn_vw_orgnls_2.reset();

                    }
            );
      Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_next_button",
                    function(mesg) {
                            pttrn_rcgntn_vw_orgnls_1.next();
                            pttrn_rcgntn_vw_orgnls_2.next();
                    

                    }
            );




    //console.log("viewerHelper.js  panwidgts");
    async function getFile(filename) {
      console.log("getFile(filename)");
      let response = await fetch(filename,{cache: "no-cache"});
                //proceed once the first promise is resolved.
        if(response.ok){
          let data = await response.text();
          //console.log("In new getFile : " + data);
          return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
        }
        return 0;
    }

    async function getFileTest(filename) {
      console.log("getFile(filename)");
      let response = await fetch(filename,{cache: "no-cache"});
                //proceed once the first promise is resolved.
        if(response.ok){
          let data = await response.text();
          //console.log("In new getFile : " + data);
          return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
        }
        return 0;
    }