import React from 'react';
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";

const NotesList = ({notes, toggleDeleteNotePopup, allNotesSuccess}) => {

  return (
    <div className="table-wrapper">
        <table className="table-all-notes">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Task</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Deadline</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {allNotesSuccess && notes.map((note) => (
                    <tr key={note.id}>
                        <td className="checkbox-column">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </td>
                        <td className="title-column">{note.title}</td>
                        <td className="priority-column">{note.priority}</td>
                        <td className='deadline-column'>{note.deadline}</td>
                        <td className='icon-column'>
                                <BsFillPencilFill />
                        </td>
                        <td className='icon-column'>
                        <div className="trash-icon" onClick={() => toggleDeleteNotePopup(note.id)}>
                            <BsFillTrash3Fill />
                        </div>                           
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default NotesList