import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDeleteTaskByIdMutation } from '../api/taskApi';

const DeleteTaskPopup = ({taskId, onClose, refetch}) => {
    const showModal = true;
    const [deleteTaskById] = useDeleteTaskByIdMutation() || {};

    const handleDelete = async () => {
        try {
          await deleteTaskById(taskId);
          await refetch();
          onClose();
        } catch (error) {
          console.error("Error deleting task: ", error);
        }
      };

  return (
    <>
        <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
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

export default DeleteTaskPopup