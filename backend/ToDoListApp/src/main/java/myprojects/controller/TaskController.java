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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import myprojects.model.Task;
import myprojects.service.TaskService;

/**
 * Controller class for managing tasks.
 */

@RestController
@RequestMapping("api/v1/tasks")
public class TaskController {
	
	@Autowired
	private TaskService taskService; 
	
	public TaskController(TaskService taskService) {
		super();
		this.taskService = taskService;
	}

	/**
	 * Endpoint to save a new task.
	 * @param task - Task object to be saved.
	 * @return - Response Entity with the saved task and HTTP status code 201 (CREATED).
	 */
	@Operation(summary = "Creates a new task.")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Task successfully created."),
			@ApiResponse(responseCode = "400", description = "Task with this id already exists.") })
	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody Task task) {
		return new ResponseEntity<>(this.taskService.save(task), HttpStatus.CREATED);
	}
	
	 /**
     * Endpoint to get all tasks.
     * @return - ResponseEntity with the list of all tasks and HTTP status code 200 (OK). If the task doesn't exist, returns HTTP status 404 (NOT_FOUOND). 
     */
	@Operation(summary = "Retreives all tasks.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "List of tasks successfully retrieved."),
			@ApiResponse(responseCode = "404", description = "Tasks not found.") })
	@GetMapping("/")
	public ResponseEntity<?> getAll() {
		List<Task> tasks = this.taskService.getAll();
		if (tasks == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		return new ResponseEntity<>(tasks, HttpStatus.OK);
	}
	
    /**
     * Endpoint to get a task by its ID.
     * @param id - ID of the task to retrieve.
     * @return - ResponseEntity with the retrieved task and HTTP status code 200 (OK). If the task doesn't exist, returns HTTP status 404 (NOT_FOUOND). 
     */
	@Operation(summary = "Retreives task by its id.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Task successfully retrieved"),
			@ApiResponse(responseCode = "404", description = "Task not found.") })
	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Task taskDB = taskService.getById(id);
		if (taskDB == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		return new ResponseEntity<>(taskDB, HttpStatus.OK);
	}
	
    /**
     * Endpoint to delete a task by ID.
     * @param id - ID of the task to delete.
     * @return - ResponseEntity with the deleted task and HTTP status code 200 (OK). If the task doesn't exist, returns HTTP status 404 (NOT_FOUOND). 
     */
	@Operation(summary = "Deletes task by its id.")
	@ApiResponses(value = { @ApiResponse(responseCode = "204", description = "No content. Successfully deleted."),
			@ApiResponse(responseCode = "404", description = "Task not found.") })
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
		Task taskDB = taskService.getById(id);
		if (taskDB == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		taskService.deleteById(id);
		return new ResponseEntity<>(taskDB, HttpStatus.OK);
	}
	
	 /**
     * Endpoint to update a task.
     * @param task - Task object with updated information.
     * @return - ResponseEntity with the updated task and HTTP status code 200 (OK). If the task doesn't exist, returns HTTP status 404 (NOT_FOUOND). 
     */
	@Operation(summary = "Updates task.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Task successfully updated."),
			@ApiResponse(responseCode = "404", description = "Task not found.")})
	@PutMapping("/")
	public ResponseEntity<?> updateById(@RequestBody Task task) {
		Task taskDB = this.taskService.getById(task.getId());
		if (taskDB == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(this.taskService.updateById(task), HttpStatus.OK);
	} 
	
}

