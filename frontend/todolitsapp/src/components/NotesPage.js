import React, { useState } from 'react';
import DeleteNotePopup from './DeleteNotePopup';
import AddNewNotePopup from './AddNewNotePopup';
import { useGetAllNotesQuery } from '../api/noteApi';
import NotesList from './NotesList';
import NotesGrid from './NotesGrid';

const NotesPage = () => {
    const [showDeleteNotePopup, setShowDeleteNotePopup] = useState(false);
    const [showAddNotePopup, setShowAddNotePopup] = useState(false);
    const [noteToDeleteId, setNoteToDeleteId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const {data: notes, isSuccess: allNotesSuccess, refetch: refetchAllNotes} = useGetAllNotesQuery() || [];

    const toggleDeleteNotePopup = (id) => {
        setNoteToDeleteId(id);
        setShowDeleteNotePopup(!showDeleteNotePopup);
    };

    const toggleAddNotePopup = () => {
        setShowAddNotePopup(!showAddNotePopup);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

  return (
    <div className="notes-page">
        <div className="sub-nav-container">
                <button type="button" className="btn btn-custom" onClick={() => toggleAddNotePopup()}>Add note</button>
                <div className="form-check">
                    <input className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault" 
                            checked={isChecked} 
                            onChange={handleCheckboxChange} />
                    <label className="form-check-label" for="flexCheckDefault">
                        Grid view
                    </label>
                </div>
        </div>

        {isChecked ? <NotesGrid/>
            :   <NotesList
                    notes={notes}
                    toggleDeleteNotePopup={toggleDeleteNotePopup}
                    allNotesSuccess={allNotesSuccess}
                />
        }


        {showDeleteNotePopup && (
          <DeleteNotePopup
            noteId={noteToDeleteId}
            onClose={toggleDeleteNotePopup}
            refetch={refetchAllNotes}
          />
        )}
        { showAddNotePopup && (
            <AddNewNotePopup 
                onClose={toggleAddNotePopup}
                refetch={refetchAllNotes}
            />
        )}

    </div>
  )
}

export default NotesPage