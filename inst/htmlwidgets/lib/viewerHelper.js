console.log('18:58');
console.log('viewerHelper.js');

$(document).ready(function(){

  $('#spcs_idntfctn_id_rf_1').click(function() {
    //alert('clicked spcs_idntfctn_id_rf_1');
    $('#spcs_idntfctn_id_rf_1').focus();
  });

  $('#spcs_idntfctn_id_rf_2').click(function() {
    //alert('clicked spcs_idntfctn_id_rf_2');
    $('#spcs_idntfctn_id_rf_2').focus();
  });

  $('#pttrn_rcgntn_orgnl_imgs_2').click(function() {
    //alert('clicked pttrn_rcgntn_orgnl_imgs_2');
    $('#pttrn_rcgntn_orgnl_imgs_2').focus();
  });

  $('#pttrn_rcgntn_orgnl_imgs_1').click(function() {
    //alert('clicked pttrn_rcgntn_orgnl_imgs_1');
    $('#pttrn_rcgntn_orgnl_imgs_1').focus();
  });

 });


// maps vwrs contl bttns
function mapBttn(id){
  console.log('mapBttn');
  if(id === 'pttrn_rcgntn_orgnl_imgs_2' || 'pttrn_rcgntn_orgnl_imgs_1'){
    return ['pttrn_rcgntn_orgnl_imgs_prev_button',
            'pttrn_rcgntn_orgnl_imgs_dsply_button',
            'pttrn_rcgntn_orgnl_imgs_next_button'];
  }
  if(id === 'spcs_idntfctn_id_rf_2'){
    return ['spcs_idntfctn_prev_button_rf_2',
            'spcs_idntfctn_reset_button_rf_2',
            'spcs_idntfctn_next_button_rf_2'];
  }
  if(id === 'spcs_idntfctn_id_rf_1'){
    return ['spcs_idntfctn_prev_button_rf_1',
            'spcs_idntfctn_reset_button_rf_1',
            'spcs_idntfctn_next_button_rf_1'];
  }
}


function keyControls(event){
  console.log('keyControls');
  let cntlids = mapBttn(event.target.id);
  console.log('id : ' + event.target.id);
  console.log('code : ' + event.keyCode);
  console.log(cntlids[0] + ' rst ' + cntlids[1] + ' nxt ' + cntlids[2] );
  switch (event.keyCode) {
    case 37:
        //alert('left');
        $('#'+cntlids[0]).click();
        break;
    case 39:
        //alert('right');
        $('#'+cntlids[2]).click();
        break;
    case 82:
      //alert('Reset');
      $('#'+cntlids[1]).click();
      break;
  }
  
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