HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

       console.log('sngl_img_viewer 15-05-20 18:00');

       let spcs_idntfctns_scndry_img = new viewerClass(
                                        "spcs_idntfctn_id_rf_2",
                                        "img_idntfctn_scndry.csv"),
        spcs_idntfctns_prmry_img = new viewerClass(
                                        "spcs_idntfctn_id_rf_1",
                                        "img_idntfctn_prmry.csv");
        let pttrn_rcgntn_orgnl_imgs_1 = new viewerClass(
                                        moduleId = 'pttrn_rcgntn_orgnl_imgs_1',
                                        csvfile = 'pttrn_rcgntn_fltrd_rslts_scndry.csv');

        let pttrn_rcgntn_orgnl_imgs_2 = new viewerClass(
                                        moduleId = 'pttrn_rcgntn_orgnl_imgs_2',
                                        csvfile = 'pttrn_rcgntn_fltrd_rslts_scndry.csv');

        // constructor(moduleId,csvfile,result,currentIndex)
        // Handle extract images buttons 
        Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_1",
                function(mesg) {
                        spcs_idntfctns_prmry_img.restart();
                        spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_2",
                function(mesg) {
                        spcs_idntfctns_scndry_img.restart();
                        spcs_idntfctns_scndry_img.fetchServerData("img_idntfctn_scndry.csv");
                }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_reset_button_rf_1",
                function(mesg) {
                        spcs_idntfctns_prmry_img.reset();

                }
        );
        Shiny.addCustomMessageHandler("spcs_idntfctn_reset_button_rf_2",
                function(mesg) {
                        spcs_idntfctns_scndry_img.reset();
                }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_prev_button_rf_1",
                function(mesg) {
                        spcs_idntfctns_prmry_img.prev();
                }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_prev_button_rf_2",
                function(mesg) {
                        spcs_idntfctns_scndry_img.prev();
                }
        );

        Shiny.addCustomMessageHandler("spcs_idntfctn_next_button_rf_1",
                function(mesg) {
                        spcs_idntfctns_prmry_img.next();

                }
        );
        Shiny.addCustomMessageHandler("spcs_idntfctn_next_button_rf_2",
                function(mesg) {
                        spcs_idntfctns_scndry_img.next();

                }
        );

        /*/////////////////////////////////////////////////////////////////////////////*/
        // original imgs vwers
        Shiny.addCustomMessageHandler("pttrn_rcgntn_vw_orgnls_button",
                function(mesg) {
                        console.log("1 "+ pttrn_rcgntn_orgnl_imgs_1.result.length);
                        console.log('clicked pttrn_rcgntn_vw_orgnls_button');
                        console.log(pttrn_rcgntn_orgnl_imgs_1.moduleId + ' array size 1 : ' +
                        pttrn_rcgntn_orgnl_imgs_1.result);
                        //pttrn_rcgntn_orgnl_imgs_1.restart();
                        pttrn_rcgntn_orgnl_imgs_1.displayImage();
                        //fetchServerData("pttrn_rcgntn_fltrd_rslts_prmry.csv");

                        console.log(pttrn_rcgntn_orgnl_imgs_1.moduleId + ' array size 2 : ' +
                        pttrn_rcgntn_orgnl_imgs_1.result.length);
                }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_prev_button",
                function(mesg) {
                        console.log("2 "+(pttrn_rcgntn_orgnl_imgs_1.result).length);
                        pttrn_rcgntn_orgnl_imgs_1.prev();
                       // pttrn_rcgntn_orgnl_imgs_1.result =  getRecoImgs('pttrn_rcgntn_orgnl_imgs_1');
                        pttrn_rcgntn_orgnl_imgs_2.prev();  
                }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_reset_button",
                function(mesg) {
                        //pttrn_rcgntn_orgnl_imgs_1.result =  getRecoImgs('pttrn_rcgntn_orgnl_imgs_1');
                        console.log("3 "+ ((pttrn_rcgntn_orgnl_imgs_1.result).length));
                        pttrn_rcgntn_orgnl_imgs_1.reset();
                        pttrn_rcgntn_orgnl_imgs_2.reset();
                }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_next_button",
                function(mesg) {
                        console.log("4 "+ (pttrn_rcgntn_orgnl_imgs_1.result).length);
                        //pttrn_rcgntn_orgnl_imgs_1.result =  getRecoImgs('pttrn_rcgntn_orgnl_imgs_1');
                        pttrn_rcgntn_orgnl_imgs_1.next();
                        pttrn_rcgntn_orgnl_imgs_2.next();
                }
        );

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
