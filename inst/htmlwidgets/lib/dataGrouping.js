  function getGroupings(obj) {
      let arry = [];
      let size = Object.keys(obj).length;
      for(let i = 0 ; i < size ; i++) {
        arry.push(getObject(obj, i));
      }
      return arry;
  }

  function getObject(object, index){
    let tempArray = [];
    for (const property in object[Object.keys(object)[index]]) {
        tempArray.push( `${object[Object.keys(object)[index]][property]}`);
    }
   return tempArray;
  }
