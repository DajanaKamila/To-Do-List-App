package myprojects.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import myprojects.model.EPriority;

/**
 * Controller class for managing priorities.
 */

@RestController
@RequestMapping("/api/v1/priorities")
public class PriorityController {

	/**
	 * Endpoint to get all priorities.
	 * 
	 * @return List of EPriority values.
	 */
    @Operation(summary = "Retrieves all priorities.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "All priorities successfully retrieved."),
        @ApiResponse(responseCode = "204", description = "No content. There are no priorities available.")
    })
	@GetMapping("/")
	public List<EPriority> getPriorities() {
		List<EPriority> priorities = Arrays.stream(EPriority.values()).collect(Collectors.toList());
		return priorities;
	}

}
