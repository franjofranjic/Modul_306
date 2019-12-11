var stompClient = null;
var username = null;

function connect() {
	var socket = new SockJS('/backend');
	stompClient = Stomp.over(socket);
			
	stompClient.connect({}, function(frame) {
	console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/response', function(message) {console.log(message.body);});
	});
}
window.onload = connect();

//----------------------------------------------

function signin() {
	
	username = "Hans";
	password = "Hallo12345";
	message = "{\"username\": \""+username+"\", \"password\": \""+password+"\"}"
	console.log(message);
	
	stompClient.send("/app/signin",{}, message)
}

function kommen() {

	
	message = "{\"username\": \""+username+"\", \"time\": \""+Date.now()+"\"}"
	console.log(message);
	document.getElementById("lastAction").innerHTML = "Gekommen: " + ;
	
	stompClient.send("/app/kommen",{}, message)
}

function pause() {
	
	message = "{\"username\": \""+username+"\", \"time\": \""+Date.now()+"\"}";
	console.log(message);
	document.getElementById("lastAction").innerHTML = "Pause: " + ;
	
	stompClient.send("/app/pause",{}, message)
}

function gehen() {
	
	message = "{\"username\": \""+username+"\", \"action\": \"gehen\", \"time\": \""+Date.now()+"\"}";
	console.log(message);
	document.getElementById("lastAction").innerHTML = "Gegangen: " + ;
	
	stompClient.send("/app/gehen",{}, message)
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
});