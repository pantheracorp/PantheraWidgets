HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function (el, width, height) {

    return {

      renderValue: function (x) {

        console.log("sngl_img_viewer 05/08/2023 22:50");

        let spcs_idntfctns_scndry_img = new viewerClass(
            "spcs_idntfctn_id_rf_2"),

          spcs_idntfctns_prmry_img = new viewerClass(
            "spcs_idntfctn_id_rf_1"),
          
          indvdl_prfls_rght_img = new viewerClass(
          "indvdl_prfls_id_rght"),
          
          indvdl_prfls_lft_img = new viewerClass(
            "indvdl_prfls_id_lft"),

          pttrn_rcgntn_vw_orgnls_1 = new viewerClass(
            "pttrn_rcgntn_orgnl_imgs_1"),

          pttrn_rcgntn_vw_orgnls_2 = new viewerClass(
            "pttrn_rcgntn_orgnl_imgs_2"),

          pttrn_rcgntn_assgn_indvdl_nms_img = new viewerClass(
            "pttrn_rcgntn_orgnl_prmry_img"),

          orgnl_prmry_img_grp = new viewerClass(
            "pttrn_rcgntn_orgnl_prmry_img_grp");


        if ((x.targetId).includes("pchrcm_alrts_id_")) {
          setCanvas(x.targetId, x.src)
        }

        // Handle extract images buttons
        Shiny.addCustomMessageHandler("indvdl_prfls_rght",
          function (mesg) {
            let src = JSON.stringify(mesg);

            console.log(
              "Hanlder indvdl_prfls_rght -> " + src
            ); 

            indvdl_prfls_rght_img.restart();
            indvdl_prfls_rght_img.readServerDataTest(src);

            $('#indvdl_prfls_id_rght').css({
              'outline': '0px solid transparent'
            });

            $('#indvdl_prfls_id_rght').attr('tabindex', '0');
            $('#indvdl_prfls_id_rght').focus();
            $('#currnt-img_prfls_rght').click(function () {
              $('#indvdl_prfls_id_rght').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("indvdl_prfls_lft",
          function (mesg) {
            let src = JSON.stringify(mesg);

            console.log(
              "Hanlder indvdl_prfls_lft -> " + src
            ); 

            indvdl_prfls_lft_img.restart();
            indvdl_prfls_lft_img.readServerDataTest(src);

            $('#indvdl_prfls_id_lft').css({
              'outline': '0px solid transparent'
            });

            $('#indvdl_prfls_id_lft').attr('tabindex', '0');
            $('#indvdl_prfls_id_lft').focus();
            $('#currnt-img_prfls_lft').click(function () {
              $('#indvdl_prfls_id_lft').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_1",
          function (mesg) {
            let src = JSON.stringify(mesg);
            spcs_idntfctns_prmry_img.restart();
            spcs_idntfctns_prmry_img.readServerDataTest(src);

            $('#spcs_idntfctn_id_rf_1').css({
              'outline': '0px solid transparent'
            });

            $('#spcs_idntfctn_id_rf_1').attr('tabindex', '0');
            $('#spcs_idntfctn_id_rf_1').focus();
            $('#currnt-img_id_rf_1').click(function () {
              $('#spcs_idntfctn_id_rf_1').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_2",
          function (mesg) {
            let src = JSON.stringify(mesg);
            spcs_idntfctns_scndry_img.restart();
            spcs_idntfctns_scndry_img.readServerDataTest(src);
            $('#spcs_idntfctn_id_rf_2').css({
              'outline': '0px solid transparent'
            });
            $('#spcs_idntfctn_id_rf_2').attr('tabindex', '0');
            $('#spcs_idntfctn_id_rf_2').focus();
            $('#currnt-img_id_rf_2').click(function () {
              $('#spcs_idntfctn_id_rf_2').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_reset_button_rf_1",
          function (mesg) {
            spcs_idntfctns_prmry_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_reset_button_rf_2",
          function (mesg) {
            spcs_idntfctns_scndry_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("indvdl_prfls_reset_button_rght",
          function (mesg) {
            indvdl_prfls_rght_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("indvdl_prfls_reset_button_lft",
          function (mesg) {
            indvdl_prfls_lft_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_prev_button_rf_1",
          function (mesg) {
            spcs_idntfctns_prmry_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_prev_button_rf_2",
          function (mesg) {
            spcs_idntfctns_scndry_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("indvdl_prfls_prev_button_lft",
          function (mesg) {
            indvdl_prfls_lft_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("indvdl_prfls_prev_button_rght",
          function (mesg) {
            indvdl_prfls_rght_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_next_button_rf_1",
          function (mesg) {
            spcs_idntfctns_prmry_img.next();
          }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_next_button_rf_2",
          function (mesg) {
            spcs_idntfctns_scndry_img.next();
          }
        );

        Shiny.addCustomMessageHandler("indvdl_prfls_next_button_rght",
          function (mesg) {
            indvdl_prfls_rght_img.next();
          }
        );

        Shiny.addCustomMessageHandler("indvdl_prfls_next_button_lft",
        function (mesg) {
          indvdl_prfls_lft_img.next();
        }
      );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_prmry_img_prev",
          function (mesg) {
            pttrn_rcgntn_assgn_indvdl_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_prmry_img_reset",
          function (mesg) {
            pttrn_rcgntn_assgn_indvdl_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_prmry_img_next",
          function (mesg) {
            pttrn_rcgntn_assgn_indvdl_nms_img.next();
          }
        );

        // original imgs vwrs
        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_prmry_imgs_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            pttrn_rcgntn_vw_orgnls_1.restart();
            pttrn_rcgntn_vw_orgnls_1.readServerDataTest(src);

            $('#pttrn_rcgntn_orgnl_imgs_1').attr('tabindex', '0');
            $('#pttrn_rcgntn_orgnl_imgs_1').css({
              'outline': '0px solid transparent'
            });

            $('#pttrn_rcgntn_orgnl_imgs_1').focus();
            $('#currnt-img_orgnl_imgs_1').click(function () {
              $('#pttrn_rcgntn_orgnl_imgs_1').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_scndry_imgs_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            pttrn_rcgntn_vw_orgnls_2.restart();
            pttrn_rcgntn_vw_orgnls_2.readServerDataTest(src);

            $('#pttrn_rcgntn_orgnl_imgs_2').attr('tabindex', '0');
            $('#pttrn_rcgntn_orgnl_imgs_2').css({
              'outline': '0px solid transparent'
            });

            $('#pttrn_rcgntn_orgnl_imgs_2').focus();
            $('#currnt-img_orgnl_imgs_2').click(function () {
              $('#pttrn_rcgntn_orgnl_imgs_1').focus();
            });
          }
        );


        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_rst_button",
          function (mesg) {
            pttrn_rcgntn_vw_orgnls_1.reset();
            pttrn_rcgntn_vw_orgnls_2.reset();
          }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_prev_button",
          function (mesg) {

            let option = $('#spcs_idntfctn_pttrn_rcgntn_indvdl_fltr').val();

            if(option.toLowerCase().includes(".jpg")){

              pttrn_rcgntn_vw_orgnls_2.prev();
              
            } else {

              pttrn_rcgntn_vw_orgnls_2.prev();
              pttrn_rcgntn_vw_orgnls_1.prev();

            }
            
      
          }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_reset_button",
          function (mesg) {
            pttrn_rcgntn_vw_orgnls_1.reset();
            pttrn_rcgntn_vw_orgnls_2.reset();
          }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_next_buttonn",
          function (mesg) {

            let option = $('#spcs_idntfctn_pttrn_rcgntn_indvdl_fltr').val();

            if(option.toLowerCase().includes(".jpg")){
              
              pttrn_rcgntn_vw_orgnls_2.next();

            } else {

              pttrn_rcgntn_vw_orgnls_1.next();
              pttrn_rcgntn_vw_orgnls_2.next();

            }

          }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_img_prmry",
          function (mesg) {

            let src = JSON.stringify(mesg);

            pttrn_rcgntn_assgn_indvdl_nms_img.restart();
            pttrn_rcgntn_assgn_indvdl_nms_img.readServerDataTest(src);

            $('#pttrn_rcgntn_orgnl_prmry_img').attr('tabindex', '0');
            $('#pttrn_rcgntn_orgnl_prmry_img').css({
              'outline': '0px solid transparent'
            });

            $('#pttrn_rcgntn_orgnl_prmry_img').focus();
            $('#currnt-img_rgnl_prmry_img').click(function () {
              $('#pttrn_rcgntn_orgnl_prmry_img').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_pttrn_rcgntn_splt_grp_button",
          function (mesg) {

            let src = JSON.stringify(mesg);

            orgnl_prmry_img_grp.restart();
            orgnl_prmry_img_grp.readServerDataTest(src);

            $('#spcs_idntfctn_pttrn_rcgntn_splt_grp_button').attr('tabindex', '0');
            $('#spcs_idntfctn_pttrn_rcgntn_splt_grp_button').css({
              'outline': '0px solid transparent'
            });

            $('#spcs_idntfctn_pttrn_rcgntn_splt_grp_button').focus();
            $('#currnt-img_rgnl_prmry_img_grp').click(function () {
              $('#spcs_idntfctn_pttrn_rcgntn_splt_grp_button').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("orgnl_prmry_img_grp_prev_button",
          function (mesg) {
            orgnl_prmry_img_grp.prev();
          }
        );

        Shiny.addCustomMessageHandler("orgnl_prmry_img_grp_next_button",
          function (mesg) {
            orgnl_prmry_img_grp.next();
          }
        );

      },

      resize: function (width, height) {}
    };
  }

});