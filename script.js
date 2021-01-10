
document.getElementById("myButton").addEventListener("click", myFunction);

function myFunction(){
   var src="https://apis.google.com/js/api.js";
   handleClientLoad();
   if (this.readyState === 'complete'){
    this.onload();
   };
}