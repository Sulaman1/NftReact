const path = require("path");
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI({ host: 'ipfs.infura.io', port:5001, protocol: 'https' });
const fs = require('fs');

function fileExists(fpath){
    console.log("FileS : ", fpath)
    if (fs.existsSync(fpath)) {
        console.log('The Metadata file Exists ')
        return true
    }
    else{
        return false
    } 
}

function writefile(path, data){
    fs.writeFileSync(path , data)
}

async function upload_to_ipfs(image_path){
    //image_path2 = '../../img/pug.png'
    console.log("Started Uploading to IPFS...", image_path)

    var img = fs.readFileSync(path.join(__dirname, image_path))
    console.log(img)
    var imghash
    var filename
    try {
        var res = await ipfs.add(img);
        if(res){
            imghash = res[0].hash;
        } 
    } catch(err) {
        console.log("error while uploading", err);
    }
    
    filename = path.basename(image_path);
    let uri = 'https://ipfs.io/ipfs/'+ imghash +'?filename='+ filename;

    console.log(uri)
    return uri;
}


module.exports = { writefile, fileExists, upload_to_ipfs };