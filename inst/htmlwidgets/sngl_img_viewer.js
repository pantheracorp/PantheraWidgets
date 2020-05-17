HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        console.log("sngl_img_viewer.js  17-05-20 13:32");
        
        let spcs_idntfctns_scndry_img = new viewerClass(
                                            "spcs_idntfctn_id_rf_2",
                                            "img_idntfctn_scndry.csv"),
                spcs_idntfctns_prmry_img = new viewerClass(
                                            "spcs_idntfctn_id_rf_1",
                                            "img_idntfctn_prmry.csv"),
                pttrn_rcgntn_vw_orgnls_1 = new viewerClass(
                                        "pttrn_rcgntn_orgnl_imgs_1",
                                        "pttrn_rcgntn_fltrd_rslts_prmry.csv"),
                pttrn_rcgntn_vw_orgnls_2 = new viewerClass(
                                        "pttrn_rcgntn_orgnl_imgs_2",
                                        "pttrn_rcgntn_fltrd_rslts_scndry.csv");

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
        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_dsply_button",
                function(mesg) {
                      
                        pttrn_rcgntn_vw_orgnls_1.restart();
                        pttrn_rcgntn_vw_orgnls_1.fetchServerData("pttrn_rcgntn_fltrd_rslts_prmry.csv");
                        pttrn_rcgntn_vw_orgnls_2.restart();
                        pttrn_rcgntn_vw_orgnls_2.fetchServerData("pttrn_rcgntn_fltrd_rslts_scndry.csv");

                        if($('#pttrn_rcgntn_orgnl_imgs_1').length){
                                alert('Exist');
                                $('#pttrn_rcgntn_orgnl_imgs_1').keydown(function(event){
                                        alert('clicked');
                                        var keycode = (event.keyCode ? event.keyCode : event.which);
                                        if(keycode == '37'){
                                        alert('You pressed left ');  
                                        }
                                        if(keycode == '39'){
                                        alert('You pressed left ');
                                        }
                                        event.stopPropagation();
                                    });

                                $('#pttrn_rcgntn_orgnl_imgs_2').keydown(function(event){
                                        alert('clicked');
                                        var keycode = (event.keyCode ? event.keyCode : event.which);
                                        if(keycode == '37'){
                                        alert('You pressed left ');  
                                        }
                                        if(keycode == '39'){
                                        alert('You pressed left ');
                                        }
                                        event.stopPropagation();
                                    });
                        }
                       /* $(document).onkeydown(function(event){

                                alert('target : ' + event.target.id);
                                let id = event.target.id;
                                if(id === 'shiny-modal' || id === 'pttrn_rcgntn_orgnl_imgs_1' || id === 'pttrn_rcgntn_orgnl_imgs_2'){

                                        switch (event.keyCode) {
                                                case 37:
                                                    alert('left');
                                                    break;
                                                case 38:
                                                    alert('up');
                                                    break;
                                                case 39:
                                                    alert('right');
                                                    break;
                                                case 40:
                                                    alert('down');
                                                    break;
                                                case 82:
                                                    alert('R');
                                                    break;
                                            }

                                }
                        });*/

                      

                }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_prev_button",
                function(mesg) {
                        
                        pttrn_rcgntn_vw_orgnls_1.prev();
                        pttrn_rcgntn_vw_orgnls_2.prev();  
                }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_reset_button",
                function(mesg) {
                       
                        pttrn_rcgntn_vw_orgnls_1.reset();
                        pttrn_rcgntn_vw_orgnls_2.reset();
                }
        );

        Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_next_buttonn",
                function(mesg) {
                        pttrn_rcgntn_vw_orgnls_1.next();
                        pttrn_rcgntn_vw_orgnls_2.next();
                }
        );
       

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
