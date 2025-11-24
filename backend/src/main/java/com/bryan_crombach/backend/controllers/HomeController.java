package com.bryan_crombach.backend.controllers;

import com.bryan_crombach.backend.models.Message;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/")
    public Message sayHello(){
        return new Message("Hello World!");
    }
}
