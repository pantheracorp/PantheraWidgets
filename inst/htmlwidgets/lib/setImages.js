const {
  cornflowerblue
} = require("color-name");

function setCanvas(targetID, imgSrc) {

  console.log("setCanvas -> " + "targetID -> " + targetID + "imgSrc -> " + imgSrc);
  let imgId = '';

  let img_vwr_id_pnl_arry = [
    'img_vwr_pnl_1_img',
    'img_vwr_pnl_2_img',
    'img_vwr_pnl_3_img',
    'img_vwr_pnl_4_img',
    'img_vwr_pnl_5_img',
    'img_vwr_pnl_6_img',
    'img_vwr_pnl_7_img',
    'img_vwr_pnl_8_img',
    'img_vwr_pnl_9_img',
    'img_vwr_pnl_10_img']

  if (targetID === 'pttrn_rcgntn_orgnl_imgs_1' || targetID === 'pttrn_rcgntn_orgnl_imgs_2') {

    imgId = 'currnt-img_' + targetID.substring(13, targetID.length);

  } else if (img_vwr_id_pnl_arry.includes(targetID)) {

    imgId = 'currnt-img_vwr_pnl_' + targetID.match( /\d+/g )

  } else {

    imgId = 'currnt-img_' + targetID.substring(14, targetID.length);

  }

  console.log("imgId -> " + imgId);

  // the target div already exist
  if ($('#' + targetID + ' img').length) {
    $('#' + targetID + ' img').attr('src', imgSrc);

  } else {

    if (targetID === 'pttrn_rcgntn_orgnl_imgs_1' || targetID === 'pttrn_rcgntn_orgnl_imgs_2') {

      $('#' + targetID).css('text-align', 'center');
      $('#' + targetID).prepend($('<img>', {
        id: imgId,
        src: imgSrc,
        alt: 'camtrap',
        width: '100%',
        height: 'auto'
      }));
      $('#' + imgId).css({
        'maxHeight': '100%',
        'maxWidth': '100%'
      });

    } else if (img_vwr_id_pnl_arry.includes(targetID)) {

      $('#' + targetID).css('text-align', 'center');
      $('#' + targetID).prepend($('<img>', {
        id: imgId,
        src: imgSrc,
        alt: 'camtrap',
        width: '100%',
        height: 'auto'
      }));
      $('#' + imgId).css({
        'maxHeight': '100%',
        'maxWidth': '100%'
      });

    } else if (targetID.substring(0, 16) === "pchrcm_alrts_id_") {
      $('#' + targetID).css('text-align', 'center');
      console.log('case pchrcm_alrts_id_');
      console.log("targetID -> " + targetID);
      console.log("src -> " + imgSrc);
      $('#' + targetID).prepend($('<img>', {
        id: imgId,
        src: imgSrc,
        alt: 'poachercam',
        width: '100%',
        height: 'auto'
      }));
      $('#' + imgId).css({
        'object-fit': 'cover',
        'maxWidth': '100%',
        'max-height': '100%'
      });
    } else if (targetID === 'pttrn_rcgntn_orgnl_prmry_img') {

      $('#' + targetID).css('text-align', 'center');
      $('#' + targetID).prepend($('<img>', {
        id: imgId,
        src: imgSrc,
        alt: 'camtrap',
        width: '100%',
        height: 'auto'
      }));
      $('#' + imgId).css({
        'maxHeight': '500px',
        'maxWidth': '100%'
      });
      $('#currnt-img_rgnl_prmry_img').click(function () {
        $('#pttrn_rcgntn_orgnl_prmry_img').focus();
      });

    } else {
      $('#' + targetID).css('text-align', 'center');
      $('#' + targetID).prepend($('<img>', {
        id: imgId,
        src: imgSrc,
        alt: 'camtrap',
        width: '100%',
        height: 'auto'
      }));
      $('#' + imgId).css({
        'maxHeight': '500px',
        'maxWidth': '100%'
      });
      $('#currnt-img_id_rf_2').click(function () {
        $('#spcs_idntfctn_id_rf_2').focus();
      });

      $('#currnt-img_id_rf_1').click(function () {
        $('#spcs_idntfctn_id_rf_1').focus();
      });
    }

    wheelzoom(document.querySelector("#" + imgId));

  }
}
