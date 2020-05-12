//console.log("viewerClass.js panwidgts");
class viewerClass {

      constructor(moduleId,csvfile)
      {
        this.imgscpy = [];
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

      async getData() {

        console.log(this.moduleId + ' getData');
        let response = await fetch(this.csvfile,{cache: "no-cache"});
          if(response.ok){
            let data = await response.text();
            this.readServerData((data.replace(/^\s*$[\n\r]{1,}/gm, '')));
            //return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
          }else{
            console.log('failed');
          }
          //return 0;
      }

      displayImage(){

        console.log("new displayImage " + this.moduleId);
        console.log("first img exist : " + this.imgexist(this.imgArray[0]));
        //console.log((this.imgArray));

        console.log('Start of Display imgs : '  + this.moduleId + '  ' + (this.imgArray).length);

        if(this.imgexist(this.imgArray[0]) == false){
            alert('Alert img not exist');
            this.imgArray[0] = this.errorImg;
        }

         setCanvas( this.moduleId,this.imgArray[0]);
        /*if(this.moduleId === "spcs_idntfctn_id_rf_1"){

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
        }*/
        console.log('End of Display imgs : '  + this.moduleId + '  ' + (this.imgArray).length);

        this.sendDataToShinny();

      }

      restart(){
        console.log('restart');
        this.imgArray.length = 0;
        this.currentIndex = 0;
      }


      readServerData(response) {
        let respArray = [];
        this.imgscpy.length = 0;
        //console.log('In readServerData ' + this.moduleId + 'response : ' + response);
        console.log('Start of readServerData imgs : '  + this.moduleId + ' array size :' + (this.imgArray).length);
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
          this.imgArray =  [...(this.processImgSrc(respArray))];
          this.imgscpy = [...respArray];
          console.log(this.moduleId + 'Total Imgs : ' + (this.imgArray.length));
          this.displayImage();

        }

        console.log('End of readServerData imgs : '  + this.moduleId + ' array size :' + (this.imgArray).length);

        //this.imgloop(this.displayImages(this.imgNumb,0));
      }

      // $('div.event img').attr('src', '/anything');
      reset(){
        console.log('reset');
        console.log('Start of reset imgs : '  + this.moduleId + ' array size :' + (this.imgArray).length);

         this.currentIndex = 0;
         //this.displayImage();
         this.sendDataToShinny();
         console.log(this.imgArray);
         $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex] );

         console.log('End of reset imgs : '  + this.moduleId + ' array size :' + (this.imgArray).length);

         

      }

      next() {

        console.log('Start of next imgs : '  + this.moduleId + ' array size :' + (this.imgscpy).length);


        if(this.currentIndex == this.imgscpy.length-1){

          // last image

        }
        else{
            //console.log("In Next Array : " + this.imgArray);
           console.log("Before next 1 : " + $('#'+this.moduleId+' img' ).attr('src'));
           console.log(this.imgscpy);
           console.log("Before next 2 : " + this.imgscpy[this.currentIndex]);

           if(this.imgexist(this.imgscpy[this.currentIndex+1]) == false){
             this.imgscpy[this.currentIndex+1] = this.errorImg;
           }

           $('#'+this.moduleId+' img' ).attr('src', this.imgscpy[this.currentIndex+1] );
           console.log("After next 1 : " + $('#'+this.moduleId+' img' ).attr('src'));
           console.log("After next 2 : " + this.imgscpy[this.currentIndex+1]);
           this.currentIndex++;
           this.sendDataToShinny();
        }

        console.log('End of next imgs : '  + this.moduleId + ' array size :' + (this.imgscpy).length);


    }

    prev() {

      console.log('Start of prev imgs : '  + this.moduleId + ' array size :' + (this.imgArray).length);

        if(this.currentIndex == 0){
          // first image
        }else{
             console.log("Before prev 1 : " + $('#'+this.moduleId+' img' ).attr('src'));
             console.log(this.imgArray);
             console.log("Before prev 2 : " + this.imgArray[this.currentIndex]);
             $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex-1] );
             console.log("After prev 1 : " + $('#'+this.moduleId+' img' ).attr('src'));
             console.log("After prev 2 : " + this.imgArray[this.currentIndex-1]);
             this.currentIndex--;
             this.sendDataToShinny();

        }

        console.log('End of prev imgs : '  + this.moduleId + ' array size :' + (this.imgArray).length);


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
      //console.log("In  sendDataToShiny ");
      console.log('Start of sendDataToShinny imgs : '  + this.moduleId + ' array size :' + (this.imgArray).length);

      if(this.moduleId == "spcs_idntfctn_id_rf_2" || this.moduleId == "spcs_idntfctn_id_rf_1"){
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

      console.log('End of sendDataToShinny imgs : '  + this.moduleId + ' array size :' + (this.imgArray).length);

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
