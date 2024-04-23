package myprojects.controller;

import static org.hamcrest.CoreMatchers.any;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import myprojects.model.Task;
import myprojects.service.TaskService;

@AutoConfigureMockMvc
@SpringBootTest
public class TaskControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@MockBean 
	private TaskService mockTaskService;
	
	private Task task, task2;
	
	@BeforeEach
	void setUp() {
		task = new Task();
		task.setId(1L);
		task.setTitle("First task title");
		
		task2 = new Task();
		task2.setId(2L);
		task2.setTitle("Second task title");
	}
	
	@Test
	@DisplayName("Save task - correct")
	void test_saveTask_returnsSavedTask() throws JsonProcessingException, Exception {
		given(mockTaskService.save(ArgumentMatchers.any(Task.class))).willAnswer((invocation -> invocation.getArgument(0)));
		
		ResultActions response = mockMvc.perform(post("/api/v1/tasks/")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(task)));
		
		response.andExpect(status().isCreated())
				.andExpect(jsonPath("$.title", is("First task title")));
		verify(mockTaskService, times(1)).save(ArgumentMatchers.any(Task.class));
	}
	
	@Test
	@DisplayName("Get all tasks - correct")
	void test_getAllTasksMethod_returnsListOfTasks() throws Exception {
		List<Task> tasks = new ArrayList<>(List.of(task, task2));
		when(mockTaskService.getAll()).thenReturn(tasks);
		
		ResultActions response = mockMvc.perform(get("/api/v1/tasks/"));
		
		response.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].title").value("First task title"))
				.andExpect(jsonPath("$[1].title").value("Second task title"));
		verify(mockTaskService, times(1)).getAll();
	}
	
	@Test
	@DisplayName("Get all tasks - no tasks available")
	void test_getAllTasksMethod_returnsEmptyList() throws Exception {	
		ResultActions response = mockMvc.perform(get("/api/v1/tasks/"));
		
		response.andExpect(status().isOk())
		 		.andExpect(jsonPath("$", hasSize(0)));
		
		verify(mockTaskService, times(1)).getAll();
	}
	
	@Test
	@DisplayName("Get task by id - correct id")
	void test_getByIdMethod_returnsTaskOfAGivenId() throws Exception {
		Long id = 1l;
		when(mockTaskService.getById(id)).thenReturn(task);
		
		ResultActions response = mockMvc.perform(get("/api/v1/tasks/1"));
		
		response.andExpect(status().isOk())
				.andExpect(jsonPath("$.title").value("First task title"));
		verify(mockTaskService, times(1)).getById(id);
	}
	
	@Test
	@DisplayName("Get task by id - incorrect id")
	void test_getByIdMethod_returnsStatusNotFoundIfTaskDoesNotExist() throws Exception {
		Long id = -1l;
		when(mockTaskService.getById(id)).thenReturn(null);
		
		ResultActions response = mockMvc.perform(get("/api/v1/tasks/{id}", id));
		
		response.andExpect(status().isNotFound());
		verify(mockTaskService, times(1)).getById(id);
	}
	
	@Test
    @DisplayName("Delete task by id - correct id")
    void test_deleteTaskByIdMethod_returnsDeletedTask() throws Exception {
        Long id = 1L;
        when(mockTaskService.getById(id)).thenReturn(task);
       
        ResultActions response = mockMvc.perform(delete("/api/v1/tasks/{id}", id));
        
        response.andExpect(status().isOk());
        verify(mockTaskService, times(1)).getById(id);
        verify(mockTaskService, times(1)).deleteById(id);
    }
	
    @Test
    @DisplayName("Delete task by id - incorrect id")
    void test_deleteTaskById_returnsNotFoundIfTaskDoesNotExist() throws Exception {
        Long id = -1L;
        when(mockTaskService.getById(id)).thenReturn(null);
        
        ResultActions response = mockMvc.perform(delete("/api/v1/tasks/{id}", id));
        
        response.andExpect(status().isNotFound());
        verify(mockTaskService, times(1)).getById(id);
        verify(mockTaskService, times(0)).deleteById(id);
    }

	
	@Test
	@DisplayName("Update task - correct task")
	void test_updateTask_returnsUpdatedTask() throws JsonProcessingException, Exception {
		when(mockTaskService.getById(1L)).thenReturn(task);
		when(mockTaskService.update(task)).thenReturn(task);
		
		ResultActions response = mockMvc.perform(put("/api/v1/tasks/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)));
		
		response.andExpect(status().isOk());
		
        verify(mockTaskService, times(1)).getById(1L);
        verify(mockTaskService, times(1)).update(task);
	}
	
	@Test
	@DisplayName("Update task - incorrect task")
	void test_updateTask_returnsNotFoundIfTaskDoesNotExist() throws JsonProcessingException, Exception {
		when(mockTaskService.getById(task.getId())).thenReturn(null);
		
		ResultActions response = mockMvc.perform(put("/api/v1/tasks/", task)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)));
		
		response.andExpect(status().isNotFound());
		
        verify(mockTaskService, times(1)).getById(1L);
        verify(mockTaskService, times(0)).update(task);
	}
	
	
	
}
