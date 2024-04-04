package myprojects.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import myprojects.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{

	List<Task> findByCompletionDateBeforeAndIsFinishedTrue(LocalDate date);
}
