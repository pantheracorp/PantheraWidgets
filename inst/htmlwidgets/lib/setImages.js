
//console.log("setImages.js  panwidgts");
function setCanvas(targetID,imgSrc){
    
    
    console.log('setCanvas ' + targetID);
    console.log('target id exist : ' + $('#'+targetID+' img' ).length);

    let imgId = 'currnt-img_' + targetID.substring(13, targetID.length);

    // the target div already exist
    if ( $('#'+targetID+' img' ).length ) 
    {
        console.log('div img exist');
        $('#'+targetID+' img' ).attr('src',imgSrc );
       
    }else{

        console.log('Image dont exist');

        if(targetID === 'pttrn_rcgntn_orgnl_imgs_1' || targetID === 'pttrn_rcgntn_orgnl_imgs_2'){
          console.log('In pttrn_rcgntn_orgnl_imgs_1 && pttrn_rcgntn_orgnl_imgs_2')
          //let imgId = 'currnt-img_' + targetID.substring(13, targetID.length);
          console.log('imgId ' + imgId + ' src ' + imgSrc);

          $('#'+targetID).prepend($('<img>',{id:imgId,src:imgSrc,alt:'camtrap',width:'100%',height:'200px'}));

        }else{
          //let  imgId = 'currnt-img_' + targetID.substring(14, targetID.length);
          console.log('imgId ' + imgId + ' src ' + imgSrc);
          $('#'+targetID).prepend($('<img>',{id:imgId,src:imgSrc,alt:'camtrap',width:'100%',height:'500px'}));
        }

        wheelzoom(document.querySelector("#"+imgId));
    

      }
}
