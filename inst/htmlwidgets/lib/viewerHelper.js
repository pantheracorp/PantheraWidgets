console.log('viewerHelper.js');
// $(document).ready(function() {
//   consiole.log('in doc ready');
//   $("#pttrn_rcgntn_vw_orgnls_button").click(function() {
//     alert("pttrn_rcgntn_vw_orgnls_button");

//   });
// });
//console.log("viewerHelper.js  panwidgts");
async function getFile(filename) {
  //console.log("getFile(filename)");
  let response = await fetch(filename,{cache: "no-cache"});
            //proceed once the first promise is resolved.
    if(response.ok){
      let data = await response.text();
      //console.log("In new getFile : " + data);
      return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
    }
    return 0;
}