package myprojects.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import myprojects.model.Task;
import myprojects.repository.TaskRepository;

@Service
public class TaskService {
	
	@Autowired
	private final TaskRepository taskRepo;

	public TaskService(TaskRepository taskRepo) {
		super();
		this.taskRepo = taskRepo;
	}
	
	public Task save(Task task) {
		return this.taskRepo.save(task);
	}
	
	public List<Task> getAll() {
		return this.taskRepo.findAll();
	}
	
	public Task getById(Long id) {
		return this.taskRepo.findById(id).orElse(null);
	}
	
	public void deleteById(Long id) {
		this.taskRepo.deleteById(id);
	}
	
	public Task updateById(Task task) {
		return this.taskRepo.save(task);
	}
	

}