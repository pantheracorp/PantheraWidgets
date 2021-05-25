HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function (el, width, height) {

    return {

      renderValue: function (x) {

        console.log("sngl_img_viewer 01/04/2021 06:25");

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

          img_vwr_pnl_1_nms_img = new viewerClass(
            "img_vwr_pnl_1");

          img_vwr_pnl_2_nms_img = new viewerClass(
            "img_vwr_pnl_2");

          img_vwr_pnl_3_nms_img = new viewerClass(
            "img_vwr_pnl_3");

          img_vwr_pnl_4_nms_img = new viewerClass(
            "img_vwr_pnl_4");

          img_vwr_pnl_5_nms_img = new viewerClass(
            "img_vwr_pnl_5");

          img_vwr_pnl_6_nms_img = new viewerClass(
            "img_vwr_pnl_6");

          img_vwr_pnl_7_nms_img = new viewerClass(
            "img_vwr_pnl_7");

          img_vwr_pnl_8_nms_img = new viewerClass(
            "img_vwr_pnl_8");

          img_vwr_pnl_9_nms_img = new viewerClass(
            "img_vwr_pnl_9");

          img_vwr_pnl_10_nms_img = new viewerClass(
            "img_vwr_pnl_10");

        if ((x.targetId).includes("pchrcm_alrts_id_")) {
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




        Shiny.addCustomMessageHandler("img_vwr_pnl_1_prev",
          function (mesg) {
            img_vwr_pnl_1_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_1_reset",
          function (mesg) {
            img_vwr_pnl_1_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_1_next",
          function (mesg) {
            img_vwr_pnl_1_nms_img.next();
          }
        );

        // -----------------------------------------------------

        Shiny.addCustomMessageHandler("img_vwr_pnl_2_prev",
          function (mesg) {
            img_vwr_pnl_2_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_2_reset",
          function (mesg) {
            img_vwr_pnl_2_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_2_next",
          function (mesg) {
            img_vwr_pnl_2_nms_img.next();
          }
        );

        // -----------------------------------------------------

        Shiny.addCustomMessageHandler("img_vwr_pnl_3_prev",
          function (mesg) {
            img_vwr_pnl_3_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_3_reset",
          function (mesg) {
            img_vwr_pnl_3_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_3_next",
          function (mesg) {
            img_vwr_pnl_3_nms_img.next();
          }
        );

        // -----------------------------------------------------

        Shiny.addCustomMessageHandler("img_vwr_pnl_4_prev",
          function (mesg) {
            img_vwr_pnl_4_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_4_reset",
          function (mesg) {
            img_vwr_pnl_4_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_4_next",
          function (mesg) {
            img_vwr_pnl_4_nms_img.next();
          }
        );

        // -----------------------------------------------------

        Shiny.addCustomMessageHandler("img_vwr_pnl_5_prev",
          function (mesg) {
            img_vwr_pnl_5_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_5_reset",
          function (mesg) {
            img_vwr_pnl_5_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_5_next",
          function (mesg) {
            img_vwr_pnl_5_nms_img.next();
          }
        );

        // -----------------------------------------------------

        Shiny.addCustomMessageHandler("img_vwr_pnl_6_prev",
          function (mesg) {
            img_vwr_pnl_6_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_6_reset",
          function (mesg) {
            img_vwr_pnl_6_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_6_next",
          function (mesg) {
            img_vwr_pnl_6_nms_img.next();
          }
        );

        // -----------------------------------------------------

        Shiny.addCustomMessageHandler("img_vwr_pnl_7_prev",
          function (mesg) {
            img_vwr_pnl_7_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_7_reset",
          function (mesg) {
            img_vwr_pnl_7_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_7_next",
          function (mesg) {
            img_vwr_pnl_7_nms_img.next();
          }
        );

        // -----------------------------------------------------

        Shiny.addCustomMessageHandler("img_vwr_pnl_8_prev",
          function (mesg) {
            img_vwr_pnl_8_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_8_reset",
          function (mesg) {
            img_vwr_pnl_8_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_8_next",
          function (mesg) {
            img_vwr_pnl_8_nms_img.next();
          }
        );

        // -----------------------------------------------------

        Shiny.addCustomMessageHandler("img_vwr_pnl_9_prev",
          function (mesg) {
            img_vwr_pnl_9_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_9_reset",
          function (mesg) {
            img_vwr_pnl_9_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_9_next",
          function (mesg) {
            img_vwr_pnl_9_nms_img.next();
          }
        );

        // -----------------------------------------------------

        Shiny.addCustomMessageHandler("img_vwr_pnl_10_prev",
          function (mesg) {
            img_vwr_pnl_10_nms_img.prev();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_10_reset",
          function (mesg) {
            img_vwr_pnl_10_nms_img.reset();
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_10_next",
          function (mesg) {
            img_vwr_pnl_10_nms_img.next();
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
              $('#pttrn_rcgntn_orgnl_imgs_2').focus();
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

        Shiny.addCustomMessageHandler("img_vwr_pnl_1_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_1_nms_img.restart();
            img_vwr_pnl_1_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_1').attr('tabindex', '0');
            $('#img_vwr_pnl_1').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_1').focus();
            $('#currnt-img_vwr_pnl_1').click(function () {
              $('#img_vwr_pnl_1').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_2_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_2_nms_img.restart();
            img_vwr_pnl_2_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_2').attr('tabindex', '0');
            $('#img_vwr_pnl_2').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_2').focus();
            $('#currnt-img_vwr_pnl_2').click(function () {
              $('#img_vwr_pnl_2').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_3_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_3_nms_img.restart();
            img_vwr_pnl_3_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_3').attr('tabindex', '0');
            $('#img_vwr_pnl_3').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_3').focus();
            $('#currnt-img_vwr_pnl_3').click(function () {
              $('#img_vwr_pnl_3').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_4_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_4_nms_img.restart();
            img_vwr_pnl_4_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_4').attr('tabindex', '0');
            $('#img_vwr_pnl_4').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_4').focus();
            $('#currnt-img_vwr_pnl_4').click(function () {
              $('#img_vwr_pnl_4').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_5_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_5_nms_img.restart();
            img_vwr_pnl_5_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_5').attr('tabindex', '0');
            $('#img_vwr_pnl_5').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_5').focus();
            $('#currnt-img_vwr_pnl_5').click(function () {
              $('#img_vwr_pnl_5').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_6_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_6_nms_img.restart();
            img_vwr_pnl_6_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_6').attr('tabindex', '0');
            $('#img_vwr_pnl_6').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_6').focus();
            $('#currnt-img_vwr_pnl_6').click(function () {
              $('#img_vwr_pnl_6').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_7_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_7_nms_img.restart();
            img_vwr_pnl_7_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_7').attr('tabindex', '0');
            $('#img_vwr_pnl_7').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_7').focus();
            $('#currnt-img_vwr_pnl_7').click(function () {
              $('#img_vwr_pnl_7').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_8_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_8_nms_img.restart();
            img_vwr_pnl_8_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_8').attr('tabindex', '0');
            $('#img_vwr_pnl_8').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_8').focus();
            $('#currnt-img_vwr_pnl_8').click(function () {
              $('#img_vwr_pnl_8').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_9_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_9_nms_img.restart();
            img_vwr_pnl_9_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_9').attr('tabindex', '0');
            $('#img_vwr_pnl_9').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_9').focus();
            $('#currnt-img_vwr_pnl_9').click(function () {
              $('#img_vwr_pnl_9').focus();
            });
          }
        );

        Shiny.addCustomMessageHandler("img_vwr_pnl_10_dsply_bttn",
          function (mesg) {
            let src = JSON.stringify(mesg);
            img_vwr_pnl_10_nms_img.restart();
            img_vwr_pnl_10_nms_img.readServerDataTest(src);

            $('#img_vwr_pnl_10').attr('tabindex', '0');
            $('#img_vwr_pnl_10').css({
              'outline': '0px solid transparent'
            });

            $('#img_vwr_pnl_10').focus();
            $('#currnt-img_vwr_pnl_10').click(function () {
              $('#img_vwr_pnl_10').focus();
            });
          }
        );

      },

      resize: function (width, height) {}
    };
  }

});
