package myprojects.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import myprojects.exceptions.TaskNotFoundException;
import myprojects.model.Task;
import myprojects.repository.TaskRepository;

@SpringBootTest
class TaskServiceTest {
	
	@InjectMocks
	TaskService taskService;
	
	@Mock 
	TaskRepository mockTaskRepo;
	
	@Mock 
	Task mockTask, mockTask2;
	
	@Mock
	List<Task> mockTasksList;

	@BeforeEach
	void setUp() throws Exception {
		mockTask = new Task();
		mockTask.setTitle("Mock task");
		mockTask.setId(1L);
		mockTask2 = new Task();
		mockTasksList = new ArrayList<>();
		mockTasksList.add(mockTask);
		mockTasksList.add(mockTask2);
	}

	@Test
	@DisplayName("Save task.")
	void test_saveTask_callsSaveMethodFromRepo_returnsSavedTask() {
		when(mockTaskRepo.save(mockTask)).thenReturn(mockTask);
		
		Task actual = taskService.save(mockTask);
		
		assertThat(actual).isEqualTo(mockTask);
		verify(mockTaskRepo, times(1)).save(mockTask);
	}
	
	@Test
	@DisplayName("Get all tasks.")
	void test_getAllTasks_callsFindAllMethodFromRepo_returnsListOfLengthTwo() {
		when(mockTaskRepo.findAll()).thenReturn(mockTasksList);
		List<Task> actual = taskService.getAll();
		
		verify(mockTaskRepo, times(1)).findAll();
		assertThat(actual).isEqualTo(mockTasksList);
	}
	
	@Test
	@DisplayName("Get all tasks - empty list.")
	void test_getAllTasks_callsFindAllMethodFromRepo_returnsEmptyListIfNoTasksAvailable() {
		List<Task> emptyList = new ArrayList<>();
		when(mockTaskRepo.findAll()).thenReturn(emptyList);
		List<Task> actual = taskService.getAll();
		
		verify(mockTaskRepo, times(1)).findAll();
		assertThat(actual).isEqualTo(emptyList);
	}
	
	@Test
	@DisplayName("Find by id - correct id.")
	void test_findById_callsFindIdMethodFromRepo_returnsTaskWithGivenId() {
		Long id = 1L;
		when(mockTaskRepo.findById(id)).thenReturn(Optional.of(mockTask));
		
		Task actual = taskService.getById(id);
		
		verify(mockTaskRepo, times(1)).findById(id);
		assertThat(actual).isEqualTo(mockTask);
	}
	
	@Test
	@DisplayName("Find by id - incorrect id.")
	void test_findById_callsFindIdMethodFromRepo_returnsNullIfTaskDoesNotExist() {
		Long id = -1L;
		when(mockTaskRepo.findById(id)).thenReturn(Optional.empty());
		
		Task actual = taskService.getById(id);
		
		verify(mockTaskRepo, times(1)).findById(id);
		assertThat(actual).isNull();
	}
	
	@Test
	@DisplayName("Delete by id.")
	void test_deleteById_callsDeleteByIdMethodFromRepo() {
		Long id = 1L;
		taskService.deleteById(id);
		verify(mockTaskRepo, times(1)).deleteById(id);
	}
	
	@Test
	@DisplayName("Delete by id - incorrect id.")
	void test_deleteById_callsDeleteByIdMethodFromRepo_returnsTaskNotFoundExceptionIfTaskDoesNotExist() {
	    Long id = 1L;
	    when(mockTaskRepo.existsById(id)).thenReturn(false);
	    verify(mockTaskRepo, times(0)).deleteById(id);
	}
	
	@Test
	@DisplayName("Update.")
	void test_update_callsSaveMethodFromRepo_returnsUpdatedTask() {
		when(mockTaskRepo.existsById(mockTask.getId())).thenReturn(true);
		when(mockTaskRepo.save(mockTask)).thenReturn(mockTask);
		Task updatedTask = taskService.update(mockTask);
		
		verify(mockTaskRepo, times(1)).save(mockTask);
		assertThat(updatedTask).isEqualTo(mockTask);
	}
	
	@Test
	@DisplayName("Update - empty task.")
	void test_update_emptyTaskAsInput_throwsTaskNotFoundException() {
	    Task emptyTask = new Task();
	    assertThrows(TaskNotFoundException.class, () -> taskService.update(emptyTask));
	    verify(mockTaskRepo, times(0)).save(emptyTask);
	}
	

	@Test
	@DisplayName("Delete tasks older than given days.")
	void test_deleteTasksOlderThanGivenDays_callsfindByCompletionDateBeforeAndIsFinishedTruMethod_andDeleteAllMethod() {
	    int daysToCut = 5;
	    LocalDate dateDaysAgo = LocalDate.now().minusDays(daysToCut);
	    List<Task> oldTasks = new ArrayList<>();
	    oldTasks.add(mockTask);
	    when(mockTaskRepo.findByCompletionDateBeforeAndIsFinishedTrue(dateDaysAgo)).thenReturn(oldTasks);
	    taskService.deleteTasksOlderThanGivenDays();
	    
	    verify(mockTaskRepo, times(1)).findByCompletionDateBeforeAndIsFinishedTrue(dateDaysAgo);
	    verify(mockTaskRepo, times(1)).deleteAll(oldTasks);
	}
	
	@Test
	@DisplayName("Delete tasks older than given days - no old tasks.")
	void test_deleteTasksOlderThanGivenDays_doesNotCallDeleteMethod_ifThereAreNoOldTasks() {
	    int daysToCut = 5;
	    LocalDate dateDaysAgo = LocalDate.now().minusDays(daysToCut);
	    when(mockTaskRepo.findByCompletionDateBeforeAndIsFinishedTrue(dateDaysAgo)).thenReturn(Collections.emptyList());
	    taskService.deleteTasksOlderThanGivenDays();
	    
	    verify(mockTaskRepo, times(1)).findByCompletionDateBeforeAndIsFinishedTrue(dateDaysAgo);
	    verify(mockTaskRepo, times(0)).deleteAll();
	}

}
