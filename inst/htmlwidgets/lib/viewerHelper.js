console.log('viewerHelper.js 15-05-20 08:50');
// $(document).ready(function() {
//   consiole.log('in doc ready');
//   $("#pttrn_rcgntn_vw_orgnls_button").click(function() {
//     alert("pttrn_rcgntn_vw_orgnls_button");

//   });
// });

/*$(function() {
  $( "#pttrn_rcgntn_vw_orgnls_button" ).click(function() {
    alert( "Handler for pttrn_rcgntn_vw_orgnls_button called." );
  });
});*/


//console.log("viewerHelper.js  panwidgts");
async function getFile(filename) {
  //alert(getFile);
  console.log("getFile() + " + filename);
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
  //alert(getFile);
  console.log("getFile() Test + " + filename);
  let response = await fetch(filename,{cache: "no-cache"});
            //proceed once the first promise is resolved.
    if(response.ok){
      let data = await response.text();
      //console.log("In new getFile : " + data);
      return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
    }
    return 0;
}