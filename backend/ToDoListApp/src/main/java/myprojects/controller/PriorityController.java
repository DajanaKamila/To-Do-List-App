package myprojects.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import myprojects.model.EPriority;

@RestController
@RequestMapping("/api/v1/priorities")
public class PriorityController {

    @GetMapping("/")
    public List<EPriority> getPriorities() {       
        List<EPriority> priorities = Arrays.stream(EPriority.values()).collect(Collectors.toList());
        return priorities;
    }
    
}
