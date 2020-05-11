
//console.log("setImages.js  panwidgts");
function setCanvas(targetID,imgSrc){
  console.log('setCanvas');

  let imgId = 'currnt-img_' + targetID.substring(14, targetID.length);

  console.log('imgId ' + imgId)

  if ( $('#'+targetID+' img' ).length ) 
  {
      $('#'+targetID+' img' ).attr('src',imgSrc );
      //console.log("img exist : ");
  }else{

      console.log('Image already exist');

      $('#'+targetID).prepend($('<img>',{id:imgId,src:imgSrc,alt:'camtrap',width:'100%',height:'500px'}));


        wheelzoom(document.querySelector("#"+imgId));
              //$("#"+imgId).imgViewer();

    }
}
