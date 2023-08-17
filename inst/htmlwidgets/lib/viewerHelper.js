    console.log('17-08-2023 13:20');

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

      if (id === 'pttrn_rcgntn_orgnl_prmry_img_grp') {
        return ['orgnl_prmry_img_grp_prev_button',
          'orgnl_prmry_img_grp_reset_button',
          'orgnl_prmry_img_grp_next_button'
        ];
      }
    }


    function keyControls(event) {
      let cntlids = mapBttn(event.target.id);
      console.log(cntlids[0] + ' rst ' + cntlids[1] + ' nxt ' + cntlids[2]);
      switch (event.keyCode) {
        case 37:
          $('#' + cntlids[0]).trigger("click");
          break;
        case 39:
          $('#' + cntlids[2]).trigger("click");
          break;
        case 82:
          $('#' + cntlids[1]).trigger("click");
          break;
      }

    }

    async function getFile(filename) {
      
      let response = await fetch(filename, {
        cache: "no-cache"
      });
      if (response.ok) {
        let data = await response.text();
        return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
      }
      return 0;
    }