
console.log("setImages.js  panwidgts 15-05-20 16:54");
function setCanvas(targetID,imgSrc){
    console.log('setCanvas : ' + targetID);

    let imgId = '';
    
    if(targetID === 'pttrn_rcgntn_orgnl_imgs_1' || targetID === 'pttrn_rcgntn_orgnl_imgs_2'){
       imgId = 'currnt-img_' + targetID.substring(13, targetID.length);
    }
    else{
      imgId = 'currnt-img_' + targetID.substring(14, targetID.length);
    }
   

    console.log('imgId ' + imgId);
    console.log('target id exist : ' + $('#'+targetID+' img' ).length);

    // the target div already exist
    if ( $('#'+targetID+' img' ).length )
    {
        $('#'+targetID+' img' ).attr('src',imgSrc );
        //console.log("img exist : ");
    }else{

      if(targetID === 'pttrn_rcgntn_orgnl_imgs_1' || targetID === 'pttrn_rcgntn_orgnl_imgs_2'){

        $('#'+targetID).prepend($('<img>',{id:imgId,src:imgSrc,alt:'camtrap',width:'100%',height:'200px'}));
      }
      else{

        $('#'+targetID).prepend($('<img>',{id:imgId,src:imgSrc,alt:'camtrap',width:'100%',height:'500px'}));
      }

      wheelzoom(document.querySelector("#"+imgId));
                //$("#"+imgId).imgViewer();

      }
}
