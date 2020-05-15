console.log('viewerHelper.js 15-05-20 15:17');
/*$(function() {
  $( "#pttrn_rcgntn_vw_orgnls_button" ).click(function() {
    alert( "Handler for pttrn_rcgntn_vw_orgnls_button called." );
  });
});*/

 // TODO: code to render the widget, e.g.
 //console.log("sngl_img_viewer.js  15-05-20 15:17");

 let reco1Arry =[],
     reco2Arry = [],
     imgIndex = 0;


function setImgIndex(){

}

function getIndex(){
  return ;
}
function setRecoImgs(id,arry){
  if(id === 'pttrn_rcgntn_orgnl_imgs_1'){
    reco1Arry.length = 0;
    reco1Arry = arry;
  }
  if(id === 'pttrn_rcgntn_orgnl_imgs_2'){
    reco2Arry.length = 0;
    reco2Arry = arry;
  }
}

/*function resetRecoImgs(id){
    if(id === 'pttrn_rcgntn_orgnl_imgs_1'){
      reco1Arry.length = 0;
    }
    if(id === 'pttrn_rcgntn_orgnl_imgs_2'){
      reco2Arry.length = 0;
    }
}*/

function getRecoImgs(id){
  if(id === 'pttrn_rcgntn_orgnl_imgs_1'){
    return [reco1Arry,imgIndex];
  }
  if(id === 'pttrn_rcgntn_orgnl_imgs_1'){
    return [reco2Arry,imgIndex];
  }
}


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