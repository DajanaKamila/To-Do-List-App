import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDeleteNoteByIdMutation } from '../api/noteApi';

const DeleteNotePopup = ({noteId, onClose, refetch}) => {
    const [showModal, setShowModal] = useState(true);
    const [deleteNoteById] = useDeleteNoteByIdMutation() || {};

    const handleDelete = async () => {
        try {
          await deleteNoteById(noteId);
          await refetch();
        } catch (error) {
          console.error("Error deleting note: ", error);
        }
      };

  return (
    <>
        <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
            Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
            Delete
        </Button>
        </Modal.Footer>
    </Modal>
  </>
  )
}

export default DeleteNotePopup