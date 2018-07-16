var error_fname = true;
var error_lname = false;
var error_email = true;
var error_mobile = true;
var error_address = false;

var rowUpdateNo =0;  var update=false; var counter=1;

$(function(){

	$("#fname_error_message").hide();
	$("#lname_error_message").hide();
	$("#mobile_error_message").hide();
	$("#address_error_message").hide();
	$("#email_error_message").hide();
	
	
	$("input[type=text]").focus(function(){
		$(this).css("background-color","#ffffcc");
	});
	
	$("input[type=text]").blur(function(){
		$(this).css("background-color","#ffffff")
	});
	
	$("input[type=text]").keydown(function(){
		$(this).css("background-color","#ffffff")
	});
	
	$("input[type=text]").keyup(function(){
		$(this).css("background-color","#ffffcc")
	});
	
	$("#fname").keyup(function(){
		check_fname();
	});

	
	$("#lname").keyup(function(){
		check_lname();
	});
	
	
	$("#email").keyup(function(){
		check_email();
	});
	
	$("#mobile").keyup(function(){
		check_mobile();
	});
	
	/*$("#address").focusout(function(){
		check_address();
	});*/
	

	function check_fname() {
		
		var pattern = /^[a-zA-Z]*$/;
		var fname = $("#fname").val();
		if (pattern.test(fname) && fname !== '') {
			$("#fname_error_message").hide();
			error_fname = false; 
			$("#fname").css("color","Dodgerblue");
		}
		else {
			$("#fname_error_message").html("Should contain only alphabets");
			$("#fname_error_message").show();
			error_fname = true; 
			$("#fname").css("color","tomato");

		}
	}
	
	
	function check_lname() {
		
		var pattern = /^[a-zA-Z]*$/;
		var fname = $("#lname").val();
		
		if(fname == ""){
			$("#lname_error_message").hide();
			error_lname = false; 
			$("#lname").css("color","Dodgerblue");
		}
		else if (pattern.test(fname)) {
			$("#lname_error_message").hide();
			error_lname = false; 
			$("#lname").css("color","Dodgerblue");
			
		}
		else {
			$("#lname_error_message").html("Should contain only alphabets");
			$("#lname_error_message").show();
			error_lname = true; 
			$("#lname").css("color","tomato");

		}
	}
	
	function check_email() {
		
		var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var email = $("#email").val();
		if(pattern.test(email) && email !== '') {
			
			var emailDuplicate = checkDuplicateEmail(email);
			
			if(emailDuplicate == false ){
				$("#email_error_message").hide();
				error_email = false;
				$("#email").css("color","Dodgerblue");
			}
			else{
				
				$("#email_error_message").html("Email already exist! Try something else");
				$("#email_error_message").show();
				error_email = true;
				$("#email").css("color","tomato");
				
			}
		}
		else {	
			$("#email_error_message").html("Invalid Email (ex. xyz@gmail.com)");
			$("#email_error_message").show();
			error_email = true;
			$("#email").css("color","tomato");
		}
	}
	
	function check_address(){
	
		var add = $("#address").val();
		if(add !== ""){
			$("#address_error_message").hide();
			error_address = false;
			$("#address").css("color","Dodgerblue");
		}
		else{
			$("#address_error_message").html("Address should not remain empty");
			$("#address_error_message").show();
			error_address = true;
			$("#address").css("color","tomato");
		}
	}
	
	function check_mobile(){
		var mob = $("#mobile").val();
		var pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
		if( pattern.test(mob) ){ 
			var mobileDuplicate = checkDuplicateMobile(mob);
			
			if(mobileDuplicate == false ){
				$("#mobile_error_message").hide();
				error_mobile = false;
				$("#mobile").css("color","Dodgerblue");
			}
			else{
				
				$("#mobile_error_message").html("Mob. No. already exist! Try something else");
				$("#mobile_error_message").show();
				mobile_email = true;
				$("#mobile").css("color","tomato");
				
			}
		}
		else{
			$("#mobile_error_message").html("Mobile must contain 10 digit numeric value");
			$("#mobile_error_message").show();
			error_mobile = true;
			$("#mobile").css("color","tomato");
		}
	}
	
});




function autoFill( rowNo, fName, lName, Email, Mobile, Address, Dept ) {
	event.preventDefault();
	
    document.getElementById('fname').value = fName;
    document.getElementById('lname').value = lName;
	document.getElementById('email').value = Email;
	document.getElementById('mobile').value = Mobile;
	document.getElementById('address').value = Address;
	document.getElementById('department').value = Dept;
	
   
}



function updateTable(r, fName, lName, Email, Mobile, Address, Dept){
	
	event.preventDefault();

	
	var x = document.getElementById("empTab").rows[r].cells;
	x[0].innerHTML = r ;
	x[1].innerHTML = fName;
	x[2].innerHTML = lName;
	x[3].innerHTML = Email ;
	x[4].innerHTML = Mobile;
	x[5].innerHTML = Address ;
	x[6].innerHTML = Dept;
	
	alert("Table updated...!");
	document.getElementById("Heading").innerHTML = "Registration Form";
	resetDet();
	
}

function updateRow( indexThis, fName, lName, Email, Mobile, Address, Dept){
	
	update =true;	
	
	var rowNo = indexThis.parentNode.parentNode.rowIndex ;
	
	rowUpdateNo = rowNo;
	alert("Row Update Row: "+rowUpdateNo);
	
	
	autoFill(rowNo, fName, lName, Email, Mobile, Address, Dept);
	
	document.getElementById("Heading").innerHTML = "Update Employee Details";
	$("#Heading").html("Update Employee Details");
	
	error_fname = error_email = error_mobile= false;
	error_lname = error_address = false;
	
}

function checkDuplicateEmail( emailInput){
	if(update == false){
		for(var i=1; i<counter; i++){
			var x = document.getElementById("empTab").rows[i].cells;

			if( emailInput == x[3].innerHTML){
				alert("Row: "+i+"  "+x[3].innerHTML+ " Matches");
				return true;
			}
		}
	}
	else{
		
		for(var i=1; i<counter; i++){
			var x = document.getElementById("empTab").rows[i].cells;

			if( emailInput == x[3].innerHTML && i!=rowUpdateNo){
				alert("Row: "+i+"  "+x[3].innerHTML+ " Matches");
				return true;
			}
		}
		
	}
	return false;
	
	
}

function checkDuplicateMobile( mobileInput ){
	
	if(update == false ){
		for(var i=1; i<counter; i++){
			var x = document.getElementById("empTab").rows[i].cells;

			if( mobileInput == x[4].innerHTML){
				alert("Row: "+i+"  "+x[4].innerHTML+ " Matches");
				return true;
			}
		}
	}
	else{
		for(var i=1; i<counter; i++){
			var x = document.getElementById("empTab").rows[i].cells;

			if( mobileInput == x[4].innerHTML && i!=rowUpdateNo){
				alert("Row: "+i+"  "+x[4].innerHTML+ " Matches");
				return true;
			}
		}	
	}
	return false;
	
}

function updateAfterdel(rowNo){
	
	
	for(var i=rowNo; i<counter; i++){
		var x = document.getElementById("empTab").rows[i].cells;
		x[0].innerHTML = i;
	}
}

function deleteRow(index){
		event.preventDefault();
		resetDet();
		
		var rowNum = index.parentNode.parentNode.rowIndex ;
		alert("Do you want to delete row: "+ rowNum);
		
		document.getElementById("empTab").deleteRow( rowNum );
		counter--;
		
		updateAfterdel( rowNum);
		
		alert("Row: "+ rowNum +" deleted..!");
}




function addToTable(fName, lName, Email, Mobile, Address, Dept){

	
	var table = document.getElementById("empTab");
	var row = table.insertRow( counter );
		
	row.insertCell(0).innerHTML= counter;
	row.insertCell(1).innerHTML= fName;
	row.insertCell(2).innerHTML= lName;
	row.insertCell(3).innerHTML= Email;
	row.insertCell(4).innerHTML= Mobile;
	row.insertCell(5).innerHTML= Address;
	row.insertCell(6).innerHTML= Dept;
	
	
	//Update Button
	var btnUpdate = document.createElement("button");
	btnUpdate.setAttribute("name","buttonUpdate");
	btnUpdate.setAttribute("value","updateBtn");
	btnUpdate.setAttribute("class","newButtonUpdate");
	btnUpdate.onclick= function(){
		event.preventDefault();
		updateRow( this , fName, lName, Email, Mobile, Address, Dept);
	}
	row.insertCell(7).appendChild(btnUpdate);
	
	
	//Delete Button
	var btnDel = document.createElement("button");
	btnDel.setAttribute("name","buttonDel");
	btnDel.setAttribute("value","delete");
	btnDel.setAttribute("class","newButtonDelete");
	btnDel.onclick= function(){
	
		deleteRow(this);
		event.preventDefault();
	}
	row.insertCell(8).appendChild(btnDel);
	
	alert("All details are validated and  inserted inside the table.!");
	
	counter++;	
		 
}




function validateFormJQuery(){
	
	if( error_fname == false && error_lname == false && error_email == false && error_mobile== false && error_address == false){
		return true;
	}
	else{
		return false;
	}
}



function resetDet(){
	
	update = false;
	document.getElementById("Heading").innerHTML="Registration Form";
	
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
	document.getElementById('email').value = "";
	document.getElementById('mobile').value = "";
	document.getElementById('address').value = "";
	
	error_fname = error_email = error_mobile = true;
	erro_address = error_lname = false;

	
	
}

function myFunction() {

	
		var fName= document.getElementById("fname").value;
		var lName= document.getElementById("lname").value;
		var Email= document.getElementById("email").value;
		var Mobile = document.getElementById("mobile").value;
		
		var Address = document.getElementById("address").value;
		var Dept = document.getElementById("department").value;
	
	
		var statusFinal = validateFormJQuery();
	
		if( statusFinal == true ){
		
			if(update == true){
				update=false;
				updateTable(rowUpdateNo, fName, lName, Email, Mobile, Address, Dept);
		
			}
			else{
			
				addToTable(fName, lName, Email, Mobile, Address, Dept);
				resetDet();
			}
		}
		else{
			alert("Please fill the form correctly..!")
		}
	

}

