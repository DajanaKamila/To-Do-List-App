package myprojects.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import myprojects.model.Task;
import myprojects.service.TaskService;


@RestController
@RequestMapping("api/v1/tasks")
public class TaskController {
	
	@Autowired
	private TaskService taskService; 
	
	public TaskController(TaskService taskService) {
		super();
		this.taskService = taskService;
	}

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody Task task) {
		return new ResponseEntity<>(this.taskService.save(task), HttpStatus.CREATED);
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getAll() {
		List<Task> tasks = this.taskService.getAll();
		if (tasks == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		return new ResponseEntity<>(tasks, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Task taskDB = taskService.getById(id);
		if (taskDB == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		return new ResponseEntity<>(taskDB, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
		Task taskDB = taskService.getById(id);
		if (taskDB == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		taskService.deleteById(id);
		return new ResponseEntity<>(taskDB, HttpStatus.OK);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateById(@RequestBody Task task) {
		Task taskDB = this.taskService.getById(task.getId());

		if (taskDB == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(this.taskService.updateById(task), HttpStatus.OK);
	} 
	
}

