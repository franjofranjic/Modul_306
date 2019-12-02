var stompClient = null;
var name = "Stef";
var password

function signin() {
	name = document.getElementById("username").value;
	password = document.getElementById("password").value;
	window.location.href = 'time.html';
	document.getElementById("welcome").innerHTML = name;
}

function setConnected(connected) {
	$("#connect").prop("disabled", connected);
	$("#disconnected").prop("disabled", !connected);
}

function connect() {
	var socket = new SockJS('/backend');
	stompClient = Stomp.over(socket);
	
	stompClient.connect({}, function(frame) {
		setConnected(true);
		
		stompClient.subscribe('/topic/response', function(message) {
			console.log(message);
		});
	});
}

function disconnect() {
	if (stompClient !== null) {
		stompClient.disconnect();
	}
	
	setConnected(false);
	console.log("Disconnected");
}




window.onload = connect();