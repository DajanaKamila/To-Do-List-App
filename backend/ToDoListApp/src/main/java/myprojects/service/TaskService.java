package myprojects.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import myprojects.exceptions.TaskNotFoundException;
import myprojects.model.Task;
import myprojects.repository.TaskRepository;

/**
 * Service class for managing tasks.
 */

@Service
public class TaskService implements ITaskService {

	@Autowired
	private final TaskRepository taskRepo;

	public TaskService(TaskRepository taskRepo) {
		super();
		this.taskRepo = taskRepo;
	}

	/**
	 * Saves a task.
	 * 
	 * @param task - Task to be saved.
	 * @return - Saved task.
	 */
	@Override
	public Task save(Task task) {
		return this.taskRepo.save(task);
	}

	/**
	 * Retrieves all tasks.
	 * 
	 * @return - List of all tasks.
	 */
	@Override
	public List<Task> getAll() {
		return this.taskRepo.findAll();
	}

	/**
	 * Retrieves task by its ID.
	 * 
	 * @param id - id of the task to be found.
	 * @return - the task found or null if the task couldn't be found.
	 * @throws TaskNotFoundException - if task with the given ID was not found.
	 */
	@Override
	public Task getById(Long id) {
		return this.taskRepo.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("Task with the given ID was not found."));
	}

	/**
	 * Deletes a task with a given id.
	 * 
	 * @param id - id of a task to be deleted.
	 */
	@Override
	public void deleteById(Long id) {
		this.taskRepo.deleteById(id);
	}

	/**
	 * Updates task. 
	 * 
	 * @param task - task object with changes made. 
	 * @return - the updated task.
	 * @throws TaskNotFoundException - if task with the given ID was not found 
	 */
	@Override
	public Task updateById(Task task) {
		Task taskToBeUpdated = taskRepo.findById(task.getId()).orElse(null);
		if (taskToBeUpdated == null) {
			throw new TaskNotFoundException("Failed to update task. Task with the given ID was not found.");
		} else {
			return this.taskRepo.save(task);
		}
	}

	 /**
     * Scheduled method that deletes tasks completed more than a specified number of days ago. 
     * Task completion is based on the completionDate variable in the Task object.
     */
	@Scheduled(fixedRate = 86400000) 
	public void deleteTasksOlderThanGivenDays() {
		int daysToCut = 5;
		LocalDate dateDaysAgo = LocalDate.now().minusDays(daysToCut);
		List<Task> oldTasks = taskRepo.findByCompletionDateBeforeAndIsFinishedTrue(dateDaysAgo);
		taskRepo.deleteAll(oldTasks);
	}

}