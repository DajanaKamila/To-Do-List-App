package myprojects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ToDoListAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToDoListAppApplication.class, args);
	}

}
