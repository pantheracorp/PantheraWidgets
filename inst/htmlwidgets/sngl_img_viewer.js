HTMLWidgets.widget({

        name: 'sngl_img_viewer',

        type: 'output',

        factory: function (el, width, height) {

                return {

                        renderValue: function (x) {

                                console.log("sngl_img_viewer.js 28-08-2020 11:01");

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


                                // Poacher Cam Viewer pchrcm_alrts_ld_bttn
                                Shiny.addCustomMessageHandler("pchrcm_alrts_ld_bttn",
                                        function (mesg) {
                                                let num = parseInt(mesg);
                                                console.log("num : " + num);

                                                for (let i = 1; i <= num; i++) {
                                                        console.log("extracted " + i);
                                                        let id = "pchrcm_alrts_id_" + i;
                                                        let csvfile = "pchrcm_alrts_" + i + ".csv";
                                                        let obj = new viewerClass(id, csvfile);
                                                        obj.restart();
                                                        obj.fetchServerData(csvfile);
                                                }
                                        }
                                );

                                // Handle extract images buttons
                                Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_1",
                                        function (mesg) {
                                                //spcs_idntfctn_extrt_id_button_rf_1
                                                console.log("NEW HANDLER");
                                                let src = JSON.stringify(mesg);
                                                spcs_idntfctns_prmry_img.restart();
                                                //spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                                                spcs_idntfctns_prmry_img.readServerDataTest(src);
                                                $('#spcs_idntfctn_id_rf_1').css({
                                                        'outline': '0px solid transparent'
                                                });
                                                $('#spcs_idntfctn_id_rf_1').attr('tabindex', '0');
                                                $('#spcs_idntfctn_id_rf_1').focus();

                                                $('#currnt-img_id_rf_1').click(function () {
                                                        //console.log('clicked currnt-img_id_rf_1');
                                                        $('#spcs_idntfctn_id_rf_1').focus();
                                                });
                                        }
                                );

                                Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_2",
                                        function (mesg) {
                                                console.log("NEW HANDLER");
                                                let src = JSON.stringify(mesg);
                                                spcs_idntfctns_scndry_img.restart();
                                                //spcs_idntfctns_scndry_img.fetchServerData("img_idntfctn_scndry.csv");
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



                                // original imgs vwers

                                Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_prmry_imgs_dsply_bttn",
                                        function (mesg) {
                                                console.log("start prmry pttrn_rcgntn_vw_orgnls_button handler");
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
                                                console.log("start sec pttrn_rcgntn_vw_orgnls_button handler");
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


                                Shiny.addCustomMessageHandler("pttrn_rcgntn_orgnl_imgs_dsply_button",
                                        function (mesg) {

                                                console.log("start pttrn_rcgntn_orgnl_imgs_dsply_button handler");
                                                pttrn_rcgntn_vw_orgnls_1.restart();
                                                //let src = JSON.stringify(mesg);
                                                console.log("mesg -> " + mesg);
                                                let tmp = mesg.split(";");

                                                console.log("temp 0 -> " + tmp[0]);
                                                console.log("temp 1 -> " + tmp[1]);

                                                pttrn_rcgntn_vw_orgnls_1.readServerData(tmp[0]);
                                                //pttrn_rcgntn_vw_orgnls_1.fetchServerData("pttrn_rcgntn_fltrd_rslts_prmry.csv ");
                                                $('#pttrn_rcgntn_orgnl_imgs_1').attr('tabindex', '0');
                                                $('#pttrn_rcgntn_orgnl_imgs_1').css({
                                                        'outline': '0px solid transparent'
                                                });
                                                $('#pttrn_rcgntn_orgnl_imgs_1').focus();

                                                pttrn_rcgntn_vw_orgnls_2.restart();
                                                pttrn_rcgntn_vw_orgnls_1.readServerData(tmp[1]);
                                                //pttrn_rcgntn_vw_orgnls_2.fetchServerData("pttrn_rcgntn_fltrd_rslts_scndry.csv");
                                                $('#pttrn_rcgntn_orgnl_imgs_2').attr('tabindex', '0');
                                                $('#pttrn_rcgntn_orgnl_imgs_2').css({
                                                        'outline': '0px solid transparent'
                                                });
                                                $('#pttrn_rcgntn_orgnl_imgs_2').focus();

                                                $('#currnt-img_orgnl_imgs_2').click(function () {
                                                        //console.log('clicked pttrn_rcgntn_orgnl_imgs_2');
                                                        $('#pttrn_rcgntn_orgnl_imgs_1').focus();
                                                });

                                                $('#currnt-img_orgnl_imgs_1').click(function () {
                                                        //console.log('clicked pttrn_rcgntn_orgnl_imgs_1');
                                                        $('#pttrn_rcgntn_orgnl_imgs_1').focus();
                                                });

                                                console.log("end pttrn_rcgntn_orgnl_imgs_dsply_button handler");
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
                        },

                        resize: function (width, height) {}
                };
        }
});