//console.log("viewerClass.js panwidgts");
class viewerClass {

      constructor(moduleId,csvfile)
      {
        this.csvfile = csvfile;
        this.moduleId =moduleId;
        this.imgArray = [];
        this.currentIndex = 0;
        this.result = [];
        this.errorImg = '/srv/shiny-server/www/PantheraIDS_image_not_found_2.jpg';
      }
      // fetchServerData

      fetchServerData(file)
      {
        console.log("In fetchServerData moduleId : " + this.moduleId);
         getFile(file).then(data => this.readServerData(data));
      }


      processImgSrc(arry){

          let tempArray = [];
          arry.forEach(function(item){
            //console.log("item : " + item);
            let src  = ((item.trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
            //console.log("item src : " + src);
              tempArray.push(src);
          });

          return tempArray;
      }

      displayImage(){

        console.log("new displayImage");

        //$.fn.cropper.noConflict();
        //Cropper.noConflict();
        /*if (typeof  $.fn.cropper != "undefined") {
          alert(" $.fn.cropper Exist");
        }
        else{
          alert(" $.fn.cropper NOT Exist");
        }
        console.log("first img exist : " + this.imgexist(this.imgArray[0]));*/
        if(this.imgexist(this.imgArray[0]) == false){
            alert('Alert img not exist');
            this.imgArray[0] = this.errorImg;
        }
        if(this.moduleId === "spcs_idntfctn_id_rf_1"){

          setCanvas( this.moduleId,this.imgArray[0]);
          //console.log("ModuleID : " + $('.rf_1_container').attr('id'));
        }
        if(this.moduleId === "spcs_idntfctn_id_rf_2"){
          setCanvas( this.moduleId,this.imgArray[0]);
          //console.log("ModuleID : " + $('.rf_2_container').attr('id'));
        }
        if(this.moduleId === 'pttrn_rcgntn_orgnl_imgs_1'){
          console.log('case pttrn_rcgntn_orgnl_imgs_1');
          setCanvas( this.moduleId,this.imgArray[0]);
        }
        if(this.moduleId === 'pttrn_rcgntn_orgnl_imgs_2'){
          console.log('case pttrn_rcgntn_orgnl_imgs_2');
          setCanvas( this.moduleId,this.imgArray[0]);
        }

        this.sendDataToShinny();

      }

      restart(){
        console.log('restart');
        this.imgArray.length = 0;
        this.currentIndex = 0;
      }


      readServerData(response) {
        let respArray = [];
        console.log("In readServerData response : " + response);
        if(response === null )
        {
          console.log(" Error in reading your images.Please check if all requirements are provided.");
        }
        else{
          respArray = response.split(',');
          respArray.splice(0, 1);
          respArray[0] = respArray[0].replace("Source", "");
          respArray[0] = respArray[respArray.length - 1] + respArray[0];
          respArray.splice(respArray.length - 1, 1);
          this.imgArray =  this.processImgSrc(respArray);
          console.log(this.moduleId + 'Total Imgs : ' + (this.imgArray.length));
          this.displayImage();

        }
        //this.imgloop(this.displayImages(this.imgNumb,0));
      }

      // $('div.event img').attr('src', '/anything');
      reset(){
         this.currentIndex = 0;
         //this.displayImage();
         this.sendDataToShinny();
         $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex] );

      }

      next() {

        console.log("In Next Array : " + (this.imgArray).length);
        console.log("Before next : " +  this.imgArray[this.currentIndex]);
        if(this.currentIndex == this.imgArray.length-1){
        }
        else{
           
           
           if(this.imgexist(this.imgArray[this.currentIndex+1]) == false){
             this.imgArray[this.currentIndex+1] = this.errorImg;
           }
           $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex+1] );
           this.currentIndex++;
           this.sendDataToShinny();
        }
        console.log("In Next Array : " + (this.imgArray).length);
        console.log("After next : " +  this.imgArray[this.currentIndex]);
        
    }

    prev() {

      console.log("In Prev Array : " + (this.imgArray).length);
      console.log("Before Prev : " +  this.imgArray[this.currentIndex]);

        if(this.currentIndex == 0){
          // first image
        }else{
             //console.log("Before prev : " + $('#'+this.moduleId+' img' ).attr('src'));
             $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex-1] );
             //console.log("After prev : " + $('#'+this.moduleId+' img' ).attr('src'));
             this.currentIndex--;
             this.sendDataToShinny();

        }
        console.log("In Prev Array : " + (this.imgArray).length);
        console.log("After Prev : " +  this.imgArray[this.currentIndex]);

    }

    imgexist(image_url){

     //console.log("In imgexist : " +  image_url);
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("GET", image_url, false);
          xmlhttp.send();
          if (xmlhttp.status==200) {
            //console.log("In imgexist : " +  image_url + "true");
            return true;
          }
          //console.log("In imgexist : " +  image_url + "false");
          return false;
    }

    sendDataToShinny(){
      console.log("In  sendDataToShiny ");
      if(this.moduleId == "spcs_idntfctn_id_rf_1" || this.moduleId == "spcs_idntfctn_id_rf_2" ){

          console.log(this.imgArray);
          let src = this.imgArray[this.currentIndex];
          let imgname = src.substring(src.lastIndexOf("/") + 1, src.length );
    
          if(this.moduleId == "spcs_idntfctn_id_rf_1"){
            //console.log("matched spcs_idntfctn_id_rf_1");
            Shiny.setInputValue("spcs_idntfctn_id_rf_1_curr_img", imgname);
          }
          if(this.moduleId == "spcs_idntfctn_id_rf_2"){
            //console.log("matched spcs_idntfctn_id_rf_2");
            Shiny.setInputValue("spcs_idntfctn_id_rf_2_curr_img", imgname);
          }
      }
      
      /*if(this.moduleId == "pttrn_rcgntn_orgnl_imgs_1"){
        //console.log("Conditions not met ");
        Shiny.setInputValue("pttrn_rcgntn_orgnl_imgs_1_curr_img", imgname);
      }
      if(this.moduleId == "pttrn_rcgntn_orgnl_imgs_2"){
        Shiny.setInputValue("pttrn_rcgntn_orgnl_imgs_2_curr_img", imgname);
        //console.log("Conditions not met ");
      }*/
      //Shiny.setInputValue(this.moduleId+'_curr_img', imgname);
      //console.log("Equal : " + "spcs_idntfctn_id_rf_1_curr_img" == this.moduleId+'_curr_img');
      //Shiny.onInputChange(""+this.moduleId+"_curr_img", imgname);

    }


    resetHandlers(msg)
    {
      if(msg === 'noImages'){
        Shiny.setInputValue('no_srv_imgs', null);
      }
      else{
        Shiny.setInputValue('mssng_srv_imgs', null);
      }
    }



  }
