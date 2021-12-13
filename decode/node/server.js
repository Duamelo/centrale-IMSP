const http = require("http");
const fs = require("fs");
var path = "fichier.txt";


var filePtr = {}
var fileBuffer = {}
var buffer = new Buffer.alloc(4096)

 var fopen = function(path, mode) {
  var handle = fs.openSync(path, mode)
  filePtr[handle] = 0
  fileBuffer[handle]= []
  return handle
}

var fclose = function(handle) {
  fs.closeSync(handle)
  if (handle in filePtr) {
    delete filePtr[handle]
    delete fileBuffer[handle]
  } 
  return
}

var fgets = function(handle) { 
  if(fileBuffer[handle].length == 0)
  {
    var pos = filePtr[handle]
    var br = fs.readSync(handle, buffer, 0, 4096, pos)
    if(br < 4096) {
      delete filePtr[handle]
      if(br == 0)  return false
    }
    var lst = buffer.slice(0, br).toString().split("\n")
    var minus = 0
    if(lst.length > 1) {
      var x = lst.pop()
      minus = x.length
    } 
    fileBuffer[handle] = lst 
    filePtr[handle] = pos + br - minus
  }
  return fileBuffer[handle].shift()
}

var eof = function(handle) {
  return (handle in filePtr) == false && (fileBuffer[handle].length == 0) 
}



/*
var server = http.createServer( (req, res)=>{
    res.writeHead(200, {"Content-Type": "text/html; charset=utf8"})
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) throw err;
        console.log(data)
        res.write(data);
        res.end()
    })
})



console.log('Connected');
server.listen(1988);
*/



//var readline = require("file.js");

var source="fichier.txt";
var target="cible.txt";

var r=fopen(source,"r");
if(r===false)
{
   console.log("Error, can't open ", source);
   process.exit(1);
} 

var w = fs.openSync(target,"w")
var count=0;
do
{
   var line=fgets(r)
   console.log(line)
   if( count == 5)
   break
   fs.writeSync(w, line + "\n", null, 'utf8')
   count+=1;
}
while (!eof(r))
fclose(r)
fs.closeSync(w)

console.log(count, " lines read.")


