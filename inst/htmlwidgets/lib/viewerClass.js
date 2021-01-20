class viewerClass {

  constructor(moduleId) {
    this.moduleId = moduleId;
    this.currentIndex = 0;
    this.result = [];
    this.errorImg = '/srv/shiny-server/www/PantheraIDS_image_not_found_2.jpg';
  }

  fetchServerData(file) {
    getFile(file).then(data => this.readServerData(data));
  }

  fetchServerDataTest(file) {
    getFileTest(file).then(data => this.readServerData(data));
  }

  processImgSrc(arry) {
    let tempArray = [];
    arry.forEach(function (item) {
      let src = ((item.trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm, "");
      tempArray.push(src);
    });

    return tempArray;
  }

  displayImage() {

    if (this.imgexist(this.result[0]) == false) {
      console.log('img does not exist');
      this.result[0] = this.errorImg;
    }
    if (this.moduleId === "spcs_idntfctn_id_rf_1") {

      setCanvas(this.moduleId, this.result[0]);
    }
    if (this.moduleId === "spcs_idntfctn_id_rf_2") {
      setCanvas(this.moduleId, this.result[0]);
    }
    if (this.moduleId === 'pttrn_rcgntn_orgnl_imgs_1') {
      setCanvas(this.moduleId, this.result[0]);
    }
    if (this.moduleId === 'pttrn_rcgntn_orgnl_imgs_2') {
      setCanvas(this.moduleId, this.result[0]);
    }

    // PoaccherCam Images
    if ((this.moduleId).includes("pchrcm_alrts_id_")) {
      setCanvas(this.moduleId, this.result[0]);
    }


    // pttrn_rcgntn_orgnl_prmry_img
    if ((this.moduleId === 'pttrn_rcgntn_orgnl_prmry_img')) {
      setCanvas(this.moduleId, this.result[0]);
    }

    this.sendDataToShinny();

  }

  restart() {
    this.result.length = 0;
    this.currentIndex = 0;
  }

  readServerData(response) {

    let respArray = [];
    if (response === null) {
      console.log(" Error in reading your images.Please check if all requirements are provided.");
    } else {

      respArray = response.split(",");

      if (respArray[respArray.length - 1] == "") {

        respArray.pop();
      }

      for (let i = 0; i < respArray.length; i++) {
        let src = respArray[i].substring(respArray[i].indexOf('/'), respArray[i].lastIndexOf('/')) + '/' + respArray[i].substring(0, respArray[i].indexOf('/'));
        console.log(src.replace(',', ''));
        this.result.push(src.replace(',', ''));
      }
      this.displayImage();
    }

  }

  readServerDataTest(response) {

    let respArray = [];
    if (response === null) {
      console.log(" Error in reading your images.Please check if all requirements are provided.");
    } else {
      console.log("Response -> " + response);
      respArray = response.split(",");
      for (let i = 0; i < respArray.length; i++) {

        let src = ((respArray[i].trim()).replace(/[\[\]'"]+/g, '')).replace(/(\r\n|\n|\r)/gm, "");
        console.log("src -> " + src);
        this.result.push(src);
      }
      this.displayImage();
    }

  }

  reset() {
    this.currentIndex = 0;
    this.sendDataToShinny();
    $('#' + this.moduleId + ' img').attr('src', this.result[this.currentIndex]);

  }

  next() {
    if (this.currentIndex == (this.result).length - 1) {} else {
      if (this.imgexist(this.result[this.currentIndex + 1]) == false) {
        this.result[this.currentIndex + 1] = this.errorImg;
      }
      $('#' + this.moduleId + ' img').attr('src', this.result[this.currentIndex + 1]);
      this.currentIndex++;
      this.sendDataToShinny();
    }

  }

  prev() {
    if (this.currentIndex == 0) {} else {
      $('#' + this.moduleId + ' img').attr('src', this.result[this.currentIndex - 1]);
      this.currentIndex--;
      this.sendDataToShinny();
    }
  }

  imgexist(image_url) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", image_url, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
      return true;
    }
    return false;
  }

  sendDataToShinny() {

    let src = this.result[this.currentIndex];
    let imgname = src.substring(src.lastIndexOf("/") + 1, src.length);

    if (this.moduleId == "pttrn_rcgntn_orgnl_prmry_img") {
      Shiny.setInputValue("pttrn_rcgntn_orgnl_prmry_curr_img", imgname);
    }

    if (this.moduleId == "spcs_idntfctn_id_rf_1" || this.moduleId == "spcs_idntfctn_id_rf_2") {

      if (this.moduleId == "spcs_idntfctn_id_rf_1") {
        Shiny.setInputValue("spcs_idntfctn_id_rf_1_curr_img", imgname);
      }
      if (this.moduleId == "spcs_idntfctn_id_rf_2") {
        Shiny.setInputValue("spcs_idntfctn_id_rf_2_curr_img", imgname);
      }
    }

  }

  resetHandlers(msg) {
    console.log('resetHandlers');
    if (msg === 'noImages') {
      Shiny.setInputValue('no_srv_imgs', null);
    } else {
      Shiny.setInputValue('mssng_srv_imgs', null);
    }
  }

}