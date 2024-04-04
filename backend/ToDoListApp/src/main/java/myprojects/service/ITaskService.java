package myprojects.service;

import java.util.List;

import myprojects.model.Task;

/**
 * Interface that defines methods for managing tasks.
 */

public interface ITaskService {

	Task save(Task task);

	List<Task> getAll();

	Task getById(Long id);

	void deleteById(Long id);

	Task updateById(Task task);

}
