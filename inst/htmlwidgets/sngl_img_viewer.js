HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function (el, width, height) {

    return {

      renderValue: function (x) {

        console.log("sngl_img_viewer 01/03/2021 06:25");

        let spcs_idntfctns_scndry_img = new viewerClass(
            "spcs_idntfctn_id_rf_2"),

          spcs_idntfctns_prmry_img = new viewerClass(
            "spcs_idntfctn_id_rf_1"),

          pttrn_rcgntn_vw_orgnls_1 = new viewerClass(
            "pttrn_rcgntn_orgnl_imgs_1"),

          pttrn_rcgntn_vw_orgnls_2 = new viewerClass(
            "pttrn_rcgntn_orgnl_imgs_2"),

          pttrn_rcgntn_assgn_indvdl_nms_img = new viewerClass(
            "pttrn_rcgntn_orgnl_prmry_img");

        // pchrcm_alrts = new viewerClass(
        //   "pttrn_rcgntn_orgnl_prmry_img");

        if ((x.targetId).includes("pchrcm_alrts_id_")) {
          console.log('Includes pchrcm_alrts_id_')
          console.log(x.targetId);
          console.log(x.src);
          setCanvas(x.targetId, x.src)
        }




        // Poacher Cam Viewer pchrcm_alrts_ld_bttn
        // Shiny.addCustomMessageHandler("pchrcm_alrts_ld_bttn",
        //   function (mesg) {
        //     console.log("pchrcm_alrts_ld_bttn handler");
        //     console.log("start pchrcm_alrts_ld_bttn");

        //     let img_arry = mesg;
        //     console.log(img_arry);

        //     for (let i = 0; i < img_arry.length; i++) {

        //       let j = i;
        //       let id_num = "pchrcm_alrts_id_".concat(j + 1);
        //       let obj_nm = new viewerClass(id_num);
        //       obj_nm.restart();
        //       obj_nm.result.push(img_arry[i]);
        //       obj_nm.displayImage();

        //     }

        //     /* let prchr_alrts = new viewerClass(
        //        "pchrcm_alrts_id_1");

        //      let src = JSON.stringify(mesg);
        //      prchr_alrts.restart();
        //      prchr_alrts.readServerDataTest(src);
        //      for (let i = 1; i <= num; i++) {
        //              console.log("extracted " + i);
        //              let id = "pchrcm_alrts_id_" + i;
        //              let csvfile = "pchrcm_alrts_" + i + ".csv";
        //              let obj = new viewerClass(id, csvfile);
        //              obj.restart();
        //              obj.fetchServerData(csvfile);
        //      }*/
        //     console.log("end pchrcm_alrts_ld_bttn");
        //   }
        // );

        // Handle extract images buttons
        Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_1",
          function (mesg) {
            //console.log("spcs_idntfctn_extrt_id_button_rf_1 19/01/2021");
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
            //console.log("start prmry pttrn_rcgntn_vw_orgnls_button handler");
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
            //console.log("start sec pttrn_rcgntn_vw_orgnls_button handler");
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
            pttrn_rcgntn_vw_orgnls_1.prev();
            pttrn_rcgntn_vw_orgnls_2.prev();
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
            pttrn_rcgntn_vw_orgnls_1.next();
            pttrn_rcgntn_vw_orgnls_2.next();
          }
        );

        // 
        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_img_prmry",
          function (mesg) {
            //console.log("start prmry pttrn_rcgntn_orgnl_img_prmry handler");
            //console.log("pttrn_rcgntn_orgnl_img_prmry");
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
      },

      resize: function (width, height) {}
    };
  }

});