package com.example.demo;

import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataRestController{
	@CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String anything(){
        return "hello";
    }
}
