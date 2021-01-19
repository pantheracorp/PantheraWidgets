    console.log('19-01-2021 14:35');
    console.log('viewerHelper.js');

    // maps vwrs contl bttns
    function mapBttn(id) {
      console.log('mapBttn : ' + id);
      if (id === 'pttrn_rcgntn_orgnl_imgs_2' || id === 'pttrn_rcgntn_orgnl_imgs_1') {
        return ['pttrn_rcgntn_orgnl_imgs_prev_button',
          'pttrn_rcgntn_orgnl_imgs_dsply_button',
          'pttrn_rcgntn_orgnl_imgs_next_button'
        ];
      }

      if (id === 'spcs_idntfctn_id_rf_2') {
        return ['spcs_idntfctn_prev_button_rf_2',
          'spcs_idntfctn_reset_button_rf_2',
          'spcs_idntfctn_next_button_rf_2'
        ];
      }

      if (id === 'spcs_idntfctn_id_rf_1') {
        return ['spcs_idntfctn_prev_button_rf_1',
          'spcs_idntfctn_reset_button_rf_1',
          'spcs_idntfctn_next_button_rf_1'
        ];
      }

      if (id === 'pttrn_rcgntn_orgnl_prmry_img') {
        return ['pttrn_rcgntn_orgnl_prmry_img_prev',
          'pttrn_rcgntn_orgnl_prmry_img_reset',
          'pttrn_rcgntn_orgnl_prmry_img_next'
        ];
      }
    }


    function keyControls(event) {
      console.log('keyControls');
      let cntlids = mapBttn(event.target.id);
      console.log(cntlids[0] + ' rst ' + cntlids[1] + ' nxt ' + cntlids[2]);
      switch (event.keyCode) {
        case 37:
          $('#' + cntlids[0]).trigger("click"); // .trigger( "click" );
          console.log('keyControls case left arrow');
          break;
        case 39:
          $('#' + cntlids[2]).trigger("click");
          console.log('keyControls case right arrow');
          break;
        case 82:
          $('#' + cntlids[1]).trigger("click");
          console.log('keyControls case r key');
          break;
      }

    }

    async function getFile(filename) {
      console.log("getFile(filename)");
      let response = await fetch(filename, {
        cache: "no-cache"
      });
      if (response.ok) {
        let data = await response.text();
        return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
      }
      return 0;
    }