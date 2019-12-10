package ch.gbssg.edu.Time4You.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

	@Autowired
	private SimpMessagingTemplate template;
	
	@RequestMapping("/hallo")
    public String index() {
        return "Greetings from Spring Boot!";
    }
	
	// heartbeat
	@Scheduled(fixedRate = 5000) 
	public void heartbeat() {
		String message = "Hallo";
		System.out.println(message);
		this.template.convertAndSend("/topic/response", message);
	}
}