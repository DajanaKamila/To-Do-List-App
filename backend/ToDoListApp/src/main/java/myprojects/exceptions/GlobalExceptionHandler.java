package myprojects.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Global exception handler class to handle exceptions thrown by controllers..
 */
@ControllerAdvice
public class GlobalExceptionHandler {

	/**
	 * Handles TaskNotFoundException and returns an appropriate HTTP response.
	 * 
	 * @param exception - TaskNotFoundException object.
	 * @return - ResponseEntity ResponseEntity with HTTP status code 404 (Not Found)
	 *         and the exception message.
	 */
	@ExceptionHandler({ TaskNotFoundException.class })
	public ResponseEntity<Object> handleTaskNotFoundException(TaskNotFoundException exception) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
	}

	/**
	 * Handles RuntimeException and returns an appropriate HTTP response.
	 * 
	 * @param exception - RuntimeException object.
	 * @return - ResponseEntity with HTTP status code 500 (Internal Server Error)
	 *         and the exception message.
	 */
	@ExceptionHandler({ RuntimeException.class })
	public ResponseEntity<Object> handleRuntimeException(RuntimeException exception) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
	}

}
