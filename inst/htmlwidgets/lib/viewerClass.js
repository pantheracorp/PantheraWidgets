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
        //alert(fetchServerData);
        console.log("In fetchServerData moduleId : " + this.moduleId);
         getFile(file).then(data => this.readServerData(data));
      }

      fetchServerDataTest(file)
      {
        //alert(fetchServerData);
        console.log("In fetchServerData moduleId : " + this.moduleId);
         getFileTest(file).then(data => this.readServerData(data));
      }

      processImgSrc(arry){
          //alert('processImgSrc : ' + this.moduleId);
          console.log(arry);
          let tempArray = [];
          arry.forEach(function(item){
            let src  = ((item.trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
              tempArray.push(src);
          });
          console.log('viewer class line 30 : ' + tempArray.length);
          console.log('End processImgSrc');
          return tempArray;
      }

      displayImage(){

        console.log(" start displayImage : " + this.moduleId);

        if(this.imgexist(this.result[0]) == false){
            //alert('Alert img not exist');
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
        //console.log('');
        console.log(" end displayImage : " + this.moduleId + ' arry size ' +  (this.result).length);

      }

      restart(){
        console.log('restart ' + this.moduleId);
        this.result.length = 0;
        this.currentIndex = 0;
      }


      readServerData(response) {
        //alert('readServerData ' + this.moduleId);
        console.log("In readServerData response : " + response);

        let respArray = [];
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
        console.log('result array : ' + (this.result).length);
        console.log('End of readServerData ' + this.moduleId);
      }

      reset(){
        console.log('reset ' + this.moduleId);
         this.currentIndex = 0;
         this.sendDataToShinny();
         $('#'+this.moduleId+' img' ).attr('src', this.result[this.currentIndex] );
      }

      next() {
          // readServerData
        getFile(this.csvfile).then(data => this.readServerData(data));
        console.log('next : ' + this.moduleId);
        console.log("In Next Array : " + (this.result).length);
        console.log("Before next : " +  this.result[this.currentIndex]);
        if(this.currentIndex == (this.result).length-1){
        }
        else{
           
           
           if(this.imgexist(this.result[this.currentIndex+1]) == false){
             this.result[this.currentIndex+1] = this.errorImg;
           }
           $('#'+this.moduleId+' img' ).attr('src', this.result[this.currentIndex+1] );
           this.currentIndex++;
           console.log();

           //this.sendDataToShinny();
        }
        console.log("In Next Array : " + (this.result).length);
        console.log("After next : " +  this.result[this.currentIndex]);
        console.log('End of next : ' + this.moduleId);
        
    }

    prev() {
      console.log('prev : ' + this.moduleId);
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
        console.log('End of prev : ' + this.moduleId);
    }

    imgexist(image_url){
      console.log('Start of imgexist : ' + this.moduleId);
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
      console.log('Array length : ' + (this.result).length);

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

      console.log("End of sendDataToShiny");

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
