#!/usr/bin/env node

let fs = require("fs");
(function () {
  let cmd = process.argv.slice(2);

  let options = [];
  let files = [];
  let str = ``;

  for (i = 0; i < cmd.length; i++) {
    if (cmd[i].startsWith("-")) {
      options.push(cmd[i]);
    } else {
      files.push(cmd[i]);
    }
  }

  for (let j = 0; j < files.length; j++) {
    if (fs.existsSync(files[j])) {
      str += fs.readFileSync(files[j]).toString();
    } else {
      console.log("invalid file");
      return;
    }

    str = str.split("\n");

    if (options.includes("-s")) {
      str = removeLargeSpaces(str);
    }

    if(options.includes("-n")&&options.includes("-b")){
      if(options.indexOf("-n")>options.indexOf("-b")){
        //use -b
        str = addNonTextNum(str);
      }else{
        //use -n
        str = addNumText(str);
      }
    }else{
      if(options.includes("-n")){
        //use -n
        str = addNumText(str);
      }
      if(options.includes("-b")){
        //use -b
        str = addNonTextNum(str);
      }
    }

    str = str.join("\n");

    console.log(str);
  }
})();

// console.log(options);
// console.log(files);
function removeLargeSpaces(x) {
  let y = [];
  let flag = false;
  for (let i = 0; i < x.length; i++) {
    if (x[i] === "" || x[i] === "\r") {
      if (flag === true) {
        continue;
      } else {
        y.push(x[i]);
        flag = true;
      }
    } else {
      y.push(x[i]);
      flag = false;
    }
  }
  return y;
}


function addNumText(arr){
  for(i=1;i<=arr.length;i++){
    arr[i-1] = i + " " + arr[i-1];
  }
  return arr;
}

function addNonTextNum(arr){
  let lineNum = 1;
  for(i=0;i<arr.length;i++){
    if(arr[i] !== "" && arr[i] !== "\r"){
      arr[i] = lineNum + " " + arr[i];
      lineNum++;
    }
  }
  return arr;
}