HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        console.log("sngl_img_viewer.js  12-05-20");
        
        let spcs_idntfctns_scndry_img = new viewerClass(
                                            "spcs_idntfctn_id_rf_2",
                                            "img_idntfctn_scndry.csv"),
                spcs_idntfctns_prmry_img = new viewerClass(
                                            "spcs_idntfctn_id_rf_1",
                                            "img_idntfctn_prmry.csv");

        var pttrn_rcgntn_vw_orgnls_1 = new viewerClass(
                "pttrn_rcgntn_orgnl_imgs_1",
                "pttrn_rcgntn_fltrd_rslts_prmry.csv");
        var pttrn_rcgntn_vw_orgnls_2 = new viewerClass(
                "pttrn_rcgntn_orgnl_imgs_2",
                "pttrn_rcgntn_fltrd_rslts_scndry.csv")

        /*/////////////////////////////////////////////////////////////////////////////*/

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


        // Handle previous image buttons
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

        // Hanle reset buttons
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

        // Hamdle next image buttons
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


        Shiny.addCustomMessageHandler("pttrn_rcgntn_vw_orgnls_button",
                function(mesg) {
                        console.log('clicked pttrn_rcgntn_vw_orgnls_button');

                        pttrn_rcgntn_vw_orgnls_1.restart();
                        
                        pttrn_rcgntn_vw_orgnls_1.fetchServerData('pttrn_rcgntn_fltrd_rslts_prmry.csv');

                        //setTimeout(() => {
                                pttrn_rcgntn_vw_orgnls_2.restart();
                                pttrn_rcgntn_vw_orgnls_2.fetchServerData('pttrn_rcgntn_fltrd_rslts_scndry.csv');//getData();
 
                       // }, 3000);
                        //getData();
                        
                }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_next_button",
                function(mesg) {
                        console.log('pttrn_rcgntn_orgnl_imgs_next_button clicked');
                        //alert('pttrn_rcgntn_vw_orgnls_1 '+ pttrn_rcgntn_vw_orgnls_1.imgArray);
                        pttrn_rcgntn_vw_orgnls_1.next();
                        //alert('pttrn_rcgntn_vw_orgnls_2 '+ pttrn_rcgntn_vw_orgnls_2.imgArray);
                        pttrn_rcgntn_vw_orgnls_2.next();

                }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_prev_button",
                function(mesg) {
                        console.log('pttrn_rcgntn_orgnl_imgs_prev_button');
                        pttrn_rcgntn_vw_orgnls_1.prev();
                        pttrn_rcgntn_vw_orgnls_2.prev();
                }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_reset_button",
                function(mesg) {
                        console.log('pttrn_rcgntn_orgnl_imgs_reset_button');
                        pttrn_rcgntn_vw_orgnls_1.reset();
                        pttrn_rcgntn_vw_orgnls_2.reset();

                }
        );

        /*/////////////////////////////////////////////////////////////////////////////*/

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
