var stompClient = null;
var username = null;

function connect() {
	var socket = new SockJS('/backend');
	stompClient = Stomp.over(socket);
			
	stompClient.connect({}, function(frame) {
	console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/response', function(message) {
				onmessage(message.body);
			});
	});
}
window.onload = connect();

//----------------------------------------------

function onmessage(message) {
	if (message === "failure") {
		document.getElementById("failure").innerHTML = "falscher Benutzername oder falsches Passwort!";
	}else if(message === "succes"){
		document.getElementById("failure").innerHTML = "";
		window.location.href = "time.html";
	}
}

function signin() {
	
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;
	message = "{\"username\": \""+username+"\", \"password\": \""+password+"\"}";
	stompClient.send("/app/signin",{}, message);

}

function kommen() {

	
	message = "{\"username\": \""+username+"\", \"time\": \""+Date.now()+"\"}";
	console.log(message);
	var today = new Date();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	if (minutes < 10 ) {
		minutes = "0" + minutes;
	}
	
	document.getElementById("lastAction").innerHTML = "Gekommen: " +hours +":"+minutes;
	
	stompClient.send("/app/kommen",{}, message)
}

function pause() {
	
	message = "{\"username\": \""+username+"\", \"time\": \""+Date.now()+"\"}";
	console.log(message);
	var today = new Date();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	if (minutes < 10 ) {
		minutes = "0" + minutes;
	}
	
		
	document.getElementById("lastAction").innerHTML = "Pause: " +hours +":"+minutes;
	
	stompClient.send("/app/pause",{}, message)
}

function gehen() {
	
	message = "{\"username\": \""+username+"\", \"action\": \"gehen\", \"time\": \""+Date.now()+"\"}";
	console.log(message);
	var today = new Date();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	if (minutes < 10 ) {
		minutes = "0" + minutes;
	}
	
	document.getElementById("lastAction").innerHTML = "Gegangen: " +hours +":"+minutes;
	
	stompClient.send("/app/gehen",{}, message)
}

function projekte() {
	window.location.href = "projekte.html";
}

//----------------------------------------------

$(function() {
	$("#signin").click(function() {
		signin();
	});
	$("#kommen").click(function() {
		kommen();
	});
	$("#pause").click(function() {
		pause();
	});
	$("#gehen").click(function() {
		gehen();
	});
	$("#projekte").click(function() {
		projekte();
	});
});