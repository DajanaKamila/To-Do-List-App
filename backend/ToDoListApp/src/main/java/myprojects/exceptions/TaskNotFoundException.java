package myprojects.exceptions;

/**
 * Exception thrown when a task is not found.
 */
public class TaskNotFoundException extends RuntimeException {
	
    /**
     * Unique identifier for serialization.
     */
	private static final long serialVersionUID = 1L;

	/**
	 * Creates a new TaskNotFoundException with the specified message. 
	 * @param message - The detailed message. 
	 */
	public TaskNotFoundException(String message) {
		super(message);
	}
	
}
