console.log('- viewerHelper.js');

//console.log("viewerHelper.js  panwidgts");
async function getFile(filename) {

  let response = await fetch(filename,{cache: "no-cache"});
    if(response.ok){
      let data = await response.text();
      return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
    }
    return 0;
}