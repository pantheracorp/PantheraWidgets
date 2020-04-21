console.log("viewerHelper.js  panwidgts");
async function getFile(filename) {
  console.log("getFile(filename)");
  let response = await fetch(filename,{cache: "no-cache"});
            //proceed once the first promise is resolved.
    if(response.ok){
      let data = await response.text();
      //console.log("In new getFile : " + data);
      return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
    }
    return 0;
}

/*async function getData(filename)
        {
            //await the response of the fetch call
           let response = await fetch(filename,{cache: "no-cache"});
            //proceed once the first promise is resolved.
            if(response.ok){
              let data = await response.text();
              //console.log(response.status);
              return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
            }
            return 0;


            //proceed only when the second promise is resolved

    }
//call getData function
getFile()
.then(data => console.log(data));//log t*/

