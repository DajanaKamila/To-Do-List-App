package myprojects.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import myprojects.model.Note;
import myprojects.service.NoteService;


@RestController
@RequestMapping("api/v1/notes")
public class NoteController {
	
	@Autowired
	private NoteService noteService; 
	
	public NoteController(NoteService noteService) {
		super();
		this.noteService = noteService;
	}

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody Note note) {
		return new ResponseEntity<>(this.noteService.save(note), HttpStatus.CREATED);
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getAll() {
		List<Note> notes = this.noteService.getAll();
		if (notes == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		return new ResponseEntity<>(notes, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Note noteDB = noteService.getById(id);
		if (noteDB == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		return new ResponseEntity<>(noteDB, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
		Note noteDB = noteService.getById(id);
		if (noteDB == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		noteService.deleteById(id);
		return new ResponseEntity<>(noteDB, HttpStatus.OK);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateNote(@RequestBody Note note) {
		Note noteDB = this.noteService.getById(note.getId());

		if (noteDB == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(this.noteService.updateNote(note), HttpStatus.OK);
	}
	
}

