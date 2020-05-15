console.log('viewerHelper.js 15-05-20 23:34');
alert('viewerHelper.js');

function fetchData(file){
  return getFile(file).then(data => readServerData(data));
}

function readServerData(response){
  // console.log('readServerData');
  //   console.log(this.result.length);

    let respArray = [];
    if(response === null)
    {
      console.log(" Error in reading your images.Please check if all requirements are provided.");

    }
    else{
      respArray = response.split(',');
      respArray.splice(0, 1);
      respArray[0] = respArray[0].replace("Source", "");
      respArray[0] = respArray[respArray.length - 1] + respArray[0];
      respArray.splice(respArray.length - 1, 1);
      //console.log(this.moduleId + 'Total Imgs : ' + (this.result.length));
      return (processImgSrc(respArray));
      //this.displayImage();

    }
}

function processImgSrc(arry){
      //('processImgSrc : ' + this.moduleId);
      console.log('processImgSrc');
      //console.log(this.result.length);
      let tempArray = [];
      arry.forEach(function(item){
        let src  = ((item.trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
          tempArray.push(src);
      });
      console.log('viewer class line 30 : ' + tempArray.length);
      console.log('End processImgSrc');
      return tempArray;
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












/*************************************************************** */
/*$('#spcs_idntfctn_id_rf_1').on('keydown', function(event) {
      
  console.log('arrows');
  switch(event.keyCode){
    
    case 37:
      $('#spcs_idntfctn_prev_button_rf_1').click();  //Left key is pressed
      console.log('left arrow');
      break;
    case 39:
      $('#spcs_idntfctn_next_button_rf_1').click(); //disp('Right key is pressed') // right
      console.log('right arrow');
      break;
    case 82:
      $('#spcs_idntfctn_reset_button_rf_1').click();
      console.log('R');
      break;
    
  }
});

$('#spcs_idntfctn_id_rf_2').on('keydown', function(event) {

console.log('arrows');
switch(event.keyCode){
  
  case 37:
    $('#spcs_idntfctn_prev_button_rf_2').click();  //Left key is pressed
    console.log('left arrow');
    break;
  case 39:
    $('#spcs_idntfctn_next_button_rf_2').click(); //disp('Right key is pressed') // right
    console.log('right arrow');
    break;
  case 82:
    $('#spcs_idntfctn_reset_button_rf_2').click();
    console.log('R');
  
}
});*/
 // TODO: code to render the widget, e.g.
//  $( document ).ready(function() {

     
// });
 

 /*let reco1Arry =[],
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
}*/

/*function resetRecoImgs(id){
    if(id === 'pttrn_rcgntn_orgnl_imgs_1'){
      reco1Arry.length = 0;
    }
    if(id === 'pttrn_rcgntn_orgnl_imgs_2'){
      reco2Arry.length = 0;
    }
}

function getRecoImgs(id){
  if(id === 'pttrn_rcgntn_orgnl_imgs_1'){
    return [reco1Arry,imgIndex];
  }
  if(id === 'pttrn_rcgntn_orgnl_imgs_1'){
    return [reco2Arry,imgIndex];
  }
}
*/


// async function getFile(filename) {
//   //alert(getFile);
//   console.log("getFile() + " + filename);
//   let response = await fetch(filename,{cache: "no-cache"});
//             //proceed once the first promise is resolved.
//     if(response.ok){
//       let data = await response.text();
//       //console.log("In new getFile : " + data);
//       return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
//     }
//     return 0;
// }

/*async function getFileTest(filename) {
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
}*/