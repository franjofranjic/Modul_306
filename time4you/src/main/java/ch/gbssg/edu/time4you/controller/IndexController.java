package ch.gbssg.edu.Time4You.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Service
public class IndexController {

	private double time = 8.4;
	private double kommen = 8.5;
	private double pause = 12;
	private double gehen = 17.0;
	
	
	@Autowired
	private SimpMessagingTemplate template;
	
	// heartbeat
	@Scheduled(initialDelay=0, fixedRate=5000) 
	public void heartbeat() {
		System.out.println("Hallo");
		double percent;
		percent = (time - (gehen - kommen)) * 100;
		String message = "{\"timeleft\": \""+percent+"\"}";
		
		this.template.convertAndSend("/topic/response", message);
	}
	
//	-----------------------------------------------------------------------------
	
	@MessageMapping("/signin")
    public String signin(String message) {
		JSONObject myJson = new JSONObject(message);
		String us = new String("Max");
		String pass = new String("Hallo1234");
		String password = myJson.getString("password");
		String username = myJson.getString("username");
		System.out.println(password + username);
		if(us.equals(new String(username)) && (pass.equals(new String(password)))) {
			System.out.println("Password und Benutzername korrekt bitte weiterleiten");
			this.template.convertAndSend("/topic/response", "succes");
			return "/time.html";
		}else {
			System.out.println("Password oder Benutzername nicht korrekt nicht weiterleiten Fehler anzeigen");
			this.template.convertAndSend("/topic/response", "failure");
			return "static/index.html";
		}
    }
	
	@MessageMapping("/kommen")
    public void kommen(String message) {
		JSONObject myJson = new JSONObject(message);
		int kommen = myJson.getInt("time");
		System.out.println(time);
		
		this.template.convertAndSend("/topic/response", message);
    }
	
	@MessageMapping("/pause")
    public void pause(String message) {
		JSONObject myJson = new JSONObject(message);
		int pause = myJson.getInt("time");
		System.out.println(time);
		
		this.template.convertAndSend("/topic/response", message);
    }
	
	@MessageMapping("/gehen")
    public void gehen(String message) {
		JSONObject myJson = new JSONObject(message);
		int gehen = myJson.getInt("time");
		System.out.println(time);
		
		this.template.convertAndSend("/topic/response", message);
    }

}