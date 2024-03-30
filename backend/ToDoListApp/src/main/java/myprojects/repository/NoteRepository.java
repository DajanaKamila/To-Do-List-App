package myprojects.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import myprojects.model.Note;

public interface NoteRepository extends JpaRepository<Note, Long>{

}
