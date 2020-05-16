alert('10:46');
console.log('viewerHelper.js');

// $(function() {
//   $('#mydiv').focus();
// });

function arrowControls(targetid,nextid,resetid,previd){
  $('#'+targetid).on('keydown', function(event) {
  
    switch (event.keyCode) {
        case 37:
            alert('left');
            $('#'+previd).click();
            break;
        case 39:
            alert('right');
            $('#'+nextid).click();
            break;
        case 82:
          alert('Reset');
          $('#'+resetid).click();
          break;
    }
 });

}



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