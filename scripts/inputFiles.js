function dump(fileName) {
   $.get(fileName, function (data) {
      console.log("Probanbo probando");
      $("#INPUT").val(data);
   },dataType='text');
};

function handleFileSelect(evt) {
   evt.stopPropagation();
   evt.preventDefault();
   var files = evt.dataTransfer.files; // FileList object.
   var reader = new FileReader();
   reader.readAsText(files[0], "UTF-8");
   reader.onload = function(e){
   
      var textoTmp = "";
      textoTmp += e.target.result;
      $("#INPUT").val(textoTmp);
      //console.log("Probando drag/drop -> " + textoTmp);
   }
   
   
   
  
   
   // files is a FileList of File objects. List some properties.
   //var template = _.template(usageList.innerHTML);
   //document.getElementById('list').innerHTML = template({ files : files});
   //evt.target.style.background = "black";
}

function handleDragOver(evt) {
   evt.stopPropagation();
   evt.preventDefault();
   evt.target.style.background = "purple";
}

function setupFileList () {

// Setup the drag and drop listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

}