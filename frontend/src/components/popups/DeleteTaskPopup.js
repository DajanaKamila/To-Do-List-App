import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDeleteTaskByIdMutation } from '../../api/taskApi';
import { toast } from "react-toastify";

const DeleteTaskPopup = ({taskId, onClose, refetch}) => {
    const showModal = true;
    const [deleteTaskById] = useDeleteTaskByIdMutation() || {};

    const handleDelete = async () => {
        try {
          await deleteTaskById(taskId);
          toast.success("Task deleted successfully!");
          await refetch();
          onClose();
        } catch (error) {
          console.error("Error deleting task: ", error);
          toast.error("Upss! Something went wrong. " + error);
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