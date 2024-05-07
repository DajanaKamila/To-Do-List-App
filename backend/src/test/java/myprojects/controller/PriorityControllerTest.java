package myprojects.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import myprojects.model.EPriority;

@AutoConfigureMockMvc
@SpringBootTest
class PriorityControllerTest {
	
    @Autowired
    private MockMvc mockMvc;

    private List<EPriority> priorities;

    @BeforeEach
    void setUp() {
        priorities = Arrays.asList(EPriority.values());
    }

    @Test
    @DisplayName("Get priorities - correct priorities")
    void test_getPriorities_returnsListOfPrioritiesWithValidValues_whenThereArePriorities() throws Exception {
        mockMvc.perform(get("/api/v1/priorities/")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$[0]").value(priorities.get(0).getLabel()));
    }

}

