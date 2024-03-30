package myprojects.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import myprojects.model.Note;
import myprojects.repository.NoteRepository;

@Service
public class NoteService {
	
	@Autowired
	private final NoteRepository noteRepo;

	public NoteService(NoteRepository noteRepo) {
		super();
		this.noteRepo = noteRepo;
	}
	
	public Note save(Note note) {
		return this.noteRepo.save(note);
	}
	
	public List<Note> getAll() {
		return this.noteRepo.findAll();
	}
	
	public Note getById(Long id) {
		return this.noteRepo.findById(id).orElse(null);
	}
	
	public void deleteById(Long id) {
		this.noteRepo.deleteById(id);
	}
	
	public Note updateNote(Note note) {
		return this.noteRepo.save(note);
	}
	

}