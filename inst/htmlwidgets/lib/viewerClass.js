class viewerClass {

      constructor(moduleId,csvfile)
      {
        this.csvfile = csvfile;
        this.moduleId =moduleId;
        //this.result = [];
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
            let src  = ((item.trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
              tempArray.push(src);
          });

          return tempArray;
      }

      displayImage(){

        console.log("new displayImage");

        if(this.imgexist(this.result[0]) == false){
            alert('Alert img not exist');
            this.result[0] = this.errorImg;
        }
        if(this.moduleId === "spcs_idntfctn_id_rf_1"){

          setCanvas( this.moduleId,this.result[0]);
        }
        if(this.moduleId === "spcs_idntfctn_id_rf_2"){
          setCanvas( this.moduleId,this.result[0]);
        }
        if(this.moduleId === 'pttrn_rcgntn_orgnl_imgs_1'){
          console.log('case pttrn_rcgntn_orgnl_imgs_1');
          setCanvas( this.moduleId,this.result[0]);
        }
        if(this.moduleId === 'pttrn_rcgntn_orgnl_imgs_2'){
          console.log('case pttrn_rcgntn_orgnl_imgs_2');
          setCanvas( this.moduleId,this.result[0]);
        }

        this.sendDataToShinny();

      }

      restart(){
        console.log('restart');
        this.result.length = 0;
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
          this.result =  this.processImgSrc(respArray);
          console.log(this.moduleId + 'Total Imgs : ' + (this.result.length));
          this.displayImage();

        }
      }

      reset(){
         this.currentIndex = 0;
         this.sendDataToShinny();
         $('#'+this.moduleId+' img' ).attr('src', this.result[this.currentIndex] );

      }

      next() {

        console.log("In Next Array : " + (this.result).length);
        console.log("Before next : " +  this.result[this.currentIndex]);
        if(this.currentIndex == this.result.length-1){
        }
        else{
           
           
           if(this.imgexist(this.result[this.currentIndex+1]) == false){
             this.result[this.currentIndex+1] = this.errorImg;
           }
           $('#'+this.moduleId+' img' ).attr('src', this.result[this.currentIndex+1] );
           this.currentIndex++;
           this.sendDataToShinny();
        }
        console.log("In Next Array : " + (this.result).length);
        console.log("After next : " +  this.result[this.currentIndex]);
        
    }

    prev() {

      console.log("In Prev Array : " + (this.result).length);
      console.log("Before Prev : " +  this.result[this.currentIndex]);

        if(this.currentIndex == 0){
          // first image
        }else{
             $('#'+this.moduleId+' img' ).attr('src', this.result[this.currentIndex-1] );
             this.currentIndex--;
             this.sendDataToShinny();

        }
        console.log("In Prev Array : " + (this.result).length);
        console.log("After Prev : " +  this.result[this.currentIndex]);

    }

    imgexist(image_url){

          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("GET", image_url, false);
          xmlhttp.send();
          if (xmlhttp.status==200) {
            return true;
          }
          return false;
    }

    sendDataToShinny(){
      console.log("In  sendDataToShiny ");
      if(this.moduleId == "spcs_idntfctn_id_rf_1" || this.moduleId == "spcs_idntfctn_id_rf_2" ){

          console.log(this.result);
          let src = this.result[this.currentIndex];
          let imgname = src.substring(src.lastIndexOf("/") + 1, src.length );
    
          if(this.moduleId == "spcs_idntfctn_id_rf_1"){
            Shiny.setInputValue("spcs_idntfctn_id_rf_1_curr_img", imgname);
          }
          if(this.moduleId == "spcs_idntfctn_id_rf_2"){
            Shiny.setInputValue("spcs_idntfctn_id_rf_2_curr_img", imgname);
          }
      }

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
