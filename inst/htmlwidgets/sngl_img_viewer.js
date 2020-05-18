HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        console.log("sngl_img_viewer.js  18-05-20 09:38");
        
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
                  $('#spcs_idntfctn_id_rf_1').css({'outline': '0px solid transparent'});
                  $('#spcs_idntfctn_id_rf_1').attr('tabindex', '0');
                  $('#spcs_idntfctn_id_rf_1').focus();
                  // Arrow controls
                  


                  $('#spcs_idntfctn_id_rf_1').keydown(function(event){
                        
                        //alert('clicked');
                        var keycode = (event.keyCode ? event.keyCode : event.which);
                       
                        if(keycode == '37'){
                               
                                spcs_idntfctns_prmry_img.prev();
                        }
                        if(keycode == '39'){
                                
                                spcs_idntfctns_prmry_img.next();
                        }
                        if(keycode == '82'){
                                
                                spcs_idntfctns_prmry_img.reset();
                        }
                        event.stopPropagation();
                    });
                }
        );

         Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_2",
                function(mesg) {
                  spcs_idntfctns_scndry_img.restart();
                  spcs_idntfctns_scndry_img.fetchServerData("img_idntfctn_scndry.csv");
                  $('#spcs_idntfctn_id_rf_2').css({'outline': '0px solid transparent'});
                  $('#spcs_idntfctn_id_rf_2').attr('tabindex', '0');
                  $('#spcs_idntfctn_id_rf_2').focus();
                  // Arrow controls
                  
                  $('#spcs_idntfctn_id_rf_2').keydown(function(event){

                        var keycode = (event.keyCode ? event.keyCode : event.which);
                        if(keycode == '37'){
                                spcs_idntfctns_scndry_img.prev();
                        }
                        if(keycode == '39'){
                                spcs_idntfctns_scndry_img.next();
                        }
                        if(keycode == '82'){
                                spcs_idntfctns_scndry_img.reset();
                        }
                        event.stopPropagation();
                    });
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
                        $('#pttrn_rcgntn_orgnl_imgs_1').attr('tabindex', '0');
                        $('#pttrn_rcgntn_orgnl_imgs_1').css({'outline': '0px solid transparent'});
                        //$('#pttrn_rcgntn_orgnl_imgs_1').focus();
                        
                        pttrn_rcgntn_vw_orgnls_2.restart();
                        pttrn_rcgntn_vw_orgnls_2.fetchServerData("pttrn_rcgntn_fltrd_rslts_scndry.csv");
                        $('#pttrn_rcgntn_orgnl_imgs_2').attr('tabindex', '0');
                        $('#pttrn_rcgntn_orgnl_imgs_2').css({'outline': '0px solid transparent'});
                        $('#pttrn_rcgntn_orgnl_imgs_2').focus();

                        if($('#pttrn_rcgntn_orgnl_imgs_2').length){
                
                                /*$('#pttrn_rcgntn_orgnl_imgs_1').keydown(function(event){
                                        console.log('keydown pttrn_rcgntn_orgnl_imgs_1');
                                        var keycode = (event.keyCode ? event.keyCode : event.which);
                                        if(keycode == '37'){
                                                pttrn_rcgntn_vw_orgnls_1.prev();
                                                pttrn_rcgntn_vw_orgnls_2.prev(); 
                                        }
                                        if(keycode == '39'){
                                                pttrn_rcgntn_vw_orgnls_1.next();
                                                pttrn_rcgntn_vw_orgnls_2.next(); 
                                        }
                                        if(keycode == '82'){
                                                pttrn_rcgntn_vw_orgnls_1.reset();
                                                pttrn_rcgntn_vw_orgnls_2.reset(); 
                                        }
                                        event.stopPropagation();
                                    });*/

                                $('#pttrn_rcgntn_orgnl_imgs_2').keydown(function(event){
                                        console.log('keydown pttrn_rcgntn_orgnl_imgs_2');
                                        var keycode = (event.keyCode ? event.keyCode : event.which);
                                        if(keycode == '37'){
                                                console.log('prev');
                                                pttrn_rcgntn_vw_orgnls_1.prev();
                                                pttrn_rcgntn_vw_orgnls_2.prev(); 
                                        }
                                        if(keycode == '39'){
                                                console.log('nxt');
                                                pttrn_rcgntn_vw_orgnls_1.next();
                                                pttrn_rcgntn_vw_orgnls_2.next(); 
                                        }
                                        if(keycode == '82'){
                                                console.log('rst');
                                                pttrn_rcgntn_vw_orgnls_1.reset();
                                                pttrn_rcgntn_vw_orgnls_2.reset(); 
                                        }
                                        event.stopPropagation();
                                    });
                        }
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
