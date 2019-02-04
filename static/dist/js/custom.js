$( document ).ready(function() {
	setTimeout(hidePrograms, 100);
	function hidePrograms(){
	  $('#program__interest_area').change(function(event){
	  	let currentInterestArea = this.value;
	  	$("#program__code option:not(:first-child)").each(function() {
		    //alert(this.text + ' ' + this.value);
		    //console.log($(this).data("interest-area"));
		    if($(this).data("interest-area").includes(currentInterestArea)) {
		    	$(this).show();
		    } else {
		    	$(this).hide();
		    }
		});
	  });
	}
});