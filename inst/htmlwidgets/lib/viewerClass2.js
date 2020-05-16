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





  /*class viewerClass{
    
    constructor(moduleId,csvfile){
        this.csvfile = csvfile;
        this.moduleId =moduleId;
        this.currentIndex = 0;
        this.result = fetchData(csvfile);
        this.errorImg = '/srv/shiny-server/www/PantheraIDS_image_not_found_2.jpg';
    }
    
    restart(){
      console.log('restart');
      console.log(this.result.length);
      this.result.length = 0;
      this.currentIndex = 0;
    }

    resetHandlers(msg)
    {
      console.log('resetHandlers');
      if(msg === 'noImages'){
        Shiny.setInputValue('no_srv_imgs', null);
      }
      else{
        Shiny.setInputValue('mssng_srv_imgs', null);
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

    reset(){
      console.log('reset');
      console.log(this.result.length);
       this.currentIndex = 0;
       this.sendDataToShinny();
       $('#'+this.moduleId+' img' ).attr('src', this.result[this.currentIndex] );
    }

    next() {
      console.log('next');
      console.log(this.result.length);
        // readServerData
      // getFile(this.csvfile).then(data => this.readServerData(data));
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
      console.log(this.result.length);

      if(this.currentIndex == 0){
          // first image
      }else{
          $('#'+this.moduleId+' img' ).attr('src', this.result[this.currentIndex-1] );
          this.currentIndex--;
          this.sendDataToShinny();

      }
    }

    sendDataToShinny(){
      console.log('sendDataToShinny');

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

    displayImage(){

      console.log('displayImage');
      console.log(this.result.length);

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
      console.log('displayImage end');
      console.log(" end displayImage : " + this.moduleId + ' arry size ' +  (this.result).length);

    }

  }
  
  function fetchData(file){
  return getFile(file).then(data => readServerData(data));
}

function readServerData(response){
  // console.log('readServerData');
  //   console.log(this.result.length);

    let respArray = [];
    if(response === null)
    {
      console.log(" Error in reading your images.Please check if all requirements are provided.");

    }
    else{
      respArray = response.split(',');
      respArray.splice(0, 1);
      respArray[0] = respArray[0].replace("Source", "");
      respArray[0] = respArray[respArray.length - 1] + respArray[0];
      respArray.splice(respArray.length - 1, 1);
      //console.log(this.moduleId + 'Total Imgs : ' + (this.result.length));
      return (processImgSrc(respArray));
      //this.displayImage();

    }
}

function processImgSrc(arry){
      //('processImgSrc : ' + this.moduleId);
      console.log('processImgSrc');
      //console.log(this.result.length);
      let tempArray = [];
      arry.forEach(function(item){
        let src  = ((item.trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
          tempArray.push(src);
      });
      console.log('viewer class line 30 : ' + tempArray.length);
      console.log('End processImgSrc');
      return tempArray;
}

async function getFile(filename) {
  //alert(getFile);
  console.log("getFile() + " + filename);
  let response = await fetch(filename,{cache: "no-cache"});
            //proceed once the first promise is resolved.
    if(response.ok){
      let data = await response.text();
      //console.log("In new getFile : " + data);
      return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
    }
    return 0;
}
  
  
  
  
  */