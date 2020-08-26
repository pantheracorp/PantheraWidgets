class viewerClass {

  constructor(moduleId, csvfile) {
    this.csvfile = csvfile;
    this.moduleId = moduleId;
    this.currentIndex = 0;
    this.result = [];
    this.errorImg = '/srv/shiny-server/www/PantheraIDS_image_not_found_2.jpg';
  }
  // fetchServerData

  fetchServerData(file) {
    console.log("fetchServerData");
    getFile(file).then(data => this.readServerData(data));
  }

  fetchServerDataTest(file) {

    getFileTest(file).then(data => this.readServerData(data));
  }

  processImgSrc(arry) {
    //alert('processImgSrc : ' + this.moduleId);
    //console.log('processImgSrc');
    let tempArray = [];
    arry.forEach(function (item) {
      let src = ((item.trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm, "");
      tempArray.push(src);
    });

    return tempArray;
  }

  displayImage() {

    console.log('displayImage');
    //console.log(this.result.length);

    /*if (this.imgexist(this.result[0]) == false) {
      //alert('Alert img not exist');
      this.result[0] = this.errorImg;
    }*/
    if (this.moduleId === "spcs_idntfctn_id_rf_1") {

      setCanvas(this.moduleId, this.result[0]);
    }
    if (this.moduleId === "spcs_idntfctn_id_rf_2") {
      setCanvas(this.moduleId, this.result[0]);
    }
    if (this.moduleId === 'pttrn_rcgntn_orgnl_imgs_1') {
      //console.log('case pttrn_rcgntn_orgnl_imgs_1');
      setCanvas(this.moduleId, this.result[0]);
    }
    if (this.moduleId === 'pttrn_rcgntn_orgnl_imgs_2') {
      //console.log('case pttrn_rcgntn_orgnl_imgs_2');
      setCanvas(this.moduleId, this.result[0]);
    }

    // PoaccherCam Images

    if ((this.moduleId).includes("cmngmnt_id_rf")) {
      console.log("case poachercams : " + this.moduleId);
      console.log("image name : " + this.result[0]);
      let src = (this.result[0]).substring((this.result[0]).lastIndexOf("/") + 1, (this.result[0]).length);
      console.log("src : " + src);
      setCanvas(this.moduleId, src);
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
      //respArray = response.split(',');
      //respArray.splice(0, 1);
      console.log("response : " + response);
      respArray = response.split("\n");
      respArray.shift();


      if (respArray[respArray.length - 1] == "") {
        //console.log('pop');
        respArray.pop();
      }

      for (let i = 0; i < respArray.length; i++) {
        //respArray[i].replace(',','');
        let src = respArray[i].substring(respArray[i].indexOf('/'), respArray[i].lastIndexOf('/')) + '/' + respArray[i].substring(0, respArray[i].indexOf('/'));
        //src.replace(',','');
        //console.log(src);
        console.log(src.replace(',', ''));
        this.result.push(src.replace(',', ''));
      }
      //console.log("respArray[0] : " + respArray[0]);
      // respArray[0] = respArray[respArray.length - 1] + respArray[0];
      // respArray.splice(respArray.length - 1, 1);
      // this.result =  this.processImgSrc(respArray);
      console.log(this.moduleId + 'Total Imgs : ' + (this.result.length));
      //console.log(this.result)
      this.displayImage();

    }
  }

  reset() {
    console.log('reset ' + this.moduleId + 'indx ' + this.currentIndex);

    this.currentIndex = 0;
    console.log('img : ' + this.result[this.currentIndex]);
    this.sendDataToShinny();
    $('#' + this.moduleId + ' img').attr('src', this.result[this.currentIndex]);

  }

  next() {
    console.log('next : ' + this.moduleId + 'indx ' + this.currentIndex);


    if (this.currentIndex == (this.result).length - 1) {} else {
      if (this.imgexist(this.result[this.currentIndex + 1]) == false) {
        this.result[this.currentIndex + 1] = this.errorImg;
      }
      $('#' + this.moduleId + ' img').attr('src', this.result[this.currentIndex + 1]);
      this.currentIndex++;
      console.log('img : ' + this.result[this.currentIndex]);
      this.sendDataToShinny();
    }

  }

  prev() {
    //console.log('prev ' + this.moduleId + 'indx ' + this.currentIndex);

    if (this.currentIndex == 0) {} else {
      $('#' + this.moduleId + ' img').attr('src', this.result[this.currentIndex - 1]);
      this.currentIndex--;
      //console.log('img : ' + this.result[this.currentIndex]);
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

    if (this.moduleId == "spcs_idntfctn_id_rf_1" || this.moduleId == "spcs_idntfctn_id_rf_2") {

      let src = this.result[this.currentIndex];
      let imgname = src.substring(src.lastIndexOf("/") + 1, src.length);

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