package ch.gbssg.edu.time4you.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

	@RequestMapping("/hallo")
    public String index() {
        return "Greetings from Spring Boot!";
    }
}
