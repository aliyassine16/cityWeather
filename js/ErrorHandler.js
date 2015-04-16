
function ErrorHandler(message) {


    this.showError = function() {
    	
       var objCarier=document.getElementById('errorMessage');
      
       if(objCarier!=null){
       	objCarier.innerHTML="<h2>"+message+"</h2>";
       }

    }

}

