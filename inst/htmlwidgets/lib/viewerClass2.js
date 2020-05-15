class viewerClass2 {

      constructor(moduleId,csvfile,result,currentIndex)
      {
        this.csvfile = csvfile;
        this.moduleId =moduleId;
        this.currentIndex = currentIndex ;
        this.result = result;
        
        this.errorImg = '/srv/shiny-server/www/PantheraIDS_image_not_found_2.jpg';
      }


      fetchServerData(file)
      {
        console.log('fetchServerData');
        
         getFile(file).then(data => this.readServerData(data));
      }

      processImgSrc(arry){
     
          console.log('processImgSrc');
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

        console.log('displayImage');

        if(this.imgexist(this.result[0]) == false){
           
            this.result[0] = this.errorImg;
        }
        
        if(this.moduleId === 'pttrn_rcgntn_orgnl_imgs_1'){
          console.log('case pttrn_rcgntn_orgnl_imgs_1');
          setCanvas( this.moduleId,this.result[0]);
        }
        if(this.moduleId === 'pttrn_rcgntn_orgnl_imgs_2'){
          console.log('case pttrn_rcgntn_orgnl_imgs_2');
          setCanvas( this.moduleId,this.result[0]);
        }

       
      }

      restart(){
        console.log('restart');
        this.result.length = 0;
        this.currentIndex = 0;
      }


      readServerData(response) {
       
        console.log('readServerData');

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
      
      }

      reset(){
        console.log('reset');
         this.currentIndex = 0;
       
         $('#'+this.moduleId+' img' ).attr('src', this.result[this.currentIndex] );
      }

      next() {
        console.log('next');
        
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
      console.log('prev');
      

        if(this.currentIndex == 0){
    
        }else{
             $('#'+this.moduleId+' img' ).attr('src', this.result[this.currentIndex-1] );
             this.currentIndex--;
             //this.sendDataToShinny();

        }
       
    }

    imgexist(image_url){
      console.log('imgexist');
      //console.log('Start of imgexist : ' + this.moduleId);
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("GET", image_url, false);
          xmlhttp.send();
          if (xmlhttp.status==200) {
            return true;
          }
          return false;
      
    }

  }
