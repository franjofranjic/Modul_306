package ch.gbssg.edu.Time4You.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

	@Autowired
	private SimpMessagingTemplate template;
	
	// heartbeat
	@Scheduled(fixedRate = 5000) 
	public void heartbeat() {
		String message = "Hallo";
		System.out.println(message);
		this.template.convertAndSend("/topic/response", message);
	}
	
//	-----------------------------------------------------------------------------
	
	@MessageMapping("/signin")
    public void signin(String message) {
		System.out.println("message: " +message);
		
		
		this.template.convertAndSend("/topic/response", message);
    }
	
	@MessageMapping("/kommen")
    public void kommen(String message) {
		this.template.convertAndSend("/topic/response", message);
    }
	
	@MessageMapping("/pause")
    public void pause(String message) {
		this.template.convertAndSend("/topic/response", message);
    }
	
	@MessageMapping("/gehen")
    public void gehen(String message) {
		this.template.convertAndSend("/topic/response", message);
    }
}