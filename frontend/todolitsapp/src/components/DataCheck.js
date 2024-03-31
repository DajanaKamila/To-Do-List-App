import React from 'react'
import { useGetAllNotesQuery, useGetNoteByIdQuery } from '../api/noteApi' 

const DataCheck = () => {
  let id = 5;

  const {data: notes, isSuccess, refetch} = useGetAllNotesQuery() || [];
  const {data: note, isSuccess: noteSucess, refetch: noteRefetch} = useGetNoteByIdQuery(id) || [];

  console.log("All notes: " + JSON.stringify(notes, null, null));
  console.log("Note nr 5: " + JSON.stringify(note, null, null));

  return (
    <div> 
    <h2>Data check</h2>

    </div>
  )
}

export default DataCheck