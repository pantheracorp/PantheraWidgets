alert('07:53');
console.log('viewerHelper.js');

function arrowControls(targetid,nextid,resetid,previd){
  console.log('in arrowControls');
  $('#'+targetid).focus();
  $('#'+targetid).on('keydown', function(event) {
    alert(event.keyCode);
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
    if(response.ok){
      let data = await response.text();
      return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
    }
    return 0;
}