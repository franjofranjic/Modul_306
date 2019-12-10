var stompClient = null;

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
//	versenden login daten in das Backend via Websocket
	console.log("signin");
}

function kommen() {
//	versenden message mit type kommen und timestamp
	console.log("kommen");
}

function pause() {
	console.log("pause");
}

function gehen() {
	console.log("gehen");
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