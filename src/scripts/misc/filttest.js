// var fs = require('browserify-fs');
// const path = require("path");
// const urijson = require('../../uri/URIjson.json')
// //const check = require("../../metadata/pug.json");
// //const val = require("../../uri/URIjson.json");
// //var fs = require('fs');


// function readJson(){

//    var f = 'helpful_scripts.js';
//    console.log(f);
   
//    fs.readFile(f, 'utf-8', function(err, data) {
//       console.log("Reading : ". data);
//       if(err){
//          console.log(err)
//       }
//    });
   
  

// //    fs.readFile(__dirname + '/input.txt', 'utf8', function (err, html) {
// //       console.log("Read: ", html);
// //   });
  
// //    const uriTemplet = {
// //    }

// //    let breedName = ['pug', 'brenard', 'k9']
// //    let image_to_upload = ['img1', 'img2', 'img3']

// //    let uriMetadata = uriTemplet;
// //    var fi = path.join(__dirname, '../../metadata/pug.json')

// //    if(fs.existsSync(fi)){
// //       console.log("Exists", fi)
// //    }
// //    else{
// //       console.log("Not Exists", fi)
// //    }

// //    var f = path.join(__dirname, '../comeon');
// //    // console.log(f);
// //    // fs.mkdir(f, function() {
// //    //    console.log("created at : ", f);
// //    // });

// //    if(fs.existsSync(f)){
// //       console.log("Exists", f)
// //    }
// //    else{
// //       console.log("Not Exists", f)
// //    }

// //    // uriMetadata[breedName[i]] = image_to_upload[i];
// //    //    console.log(uriMetadata)
// //    //    let URIdata = JSON.stringify(uriMetadata)
// //    //    fs.writeFile(path.join(__dirname,'../../uri/URIjson.json'), URIdata)   
// }
// //readJson()
// export default readJson;

//    async function fileTest(){
//       // Asynchronous read
//       fs.readFile('./img/pug.png', function (err, data) {
//          if (err) {
//             return console.error(err);
//          }
//          console.log("Asynchronous read: " + data.toString());
//       });

//       // Synchronous read
//       var data = fs.readFileSync('./img/pug.png');
//       console.log("Synchronous read: " + data.toString());

//       console.log("Program Ended");
//    }
//    //fileTest();