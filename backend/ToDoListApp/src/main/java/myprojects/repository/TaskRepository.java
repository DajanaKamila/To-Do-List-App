package myprojects.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import myprojects.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{

}
