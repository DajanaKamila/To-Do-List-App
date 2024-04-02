import React, { useState } from 'react';
import  { useAddNewNoteMutation } from '../api/noteApi';
import { useDispatch } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { toast } from "react-toastify";
import { useGetAllPrioritiesQuery } from '../api/priorityApi'; 

const AddNewNotePopup = ({onClose, refetch}) => {
    const showModal = true;
    const [addNewNote] = useAddNewNoteMutation() || {};
    const { data: priorities, isSuccess: prioritySuccess, isLoading: priorityLoading, isError: priorityError } = useGetAllPrioritiesQuery(); 

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!title) {
            errors.title = 'Title is required!';
        }
        if (!priority) {
            errors.priority = 'Priority is required!';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddNote = async () => {
        try {

          if (!validateForm()) {
            return;
          }

          const newNote = {
            title: title,
            details: details,
            priority: priority,
            deadline: deadline,
          };
          const response = await addNewNote(newNote).unwrap();
          // toast.success("Note added successfully!");
          refetch();
          onClose();
        } catch (error) {
          console.error('Error adding note: ', error);
          // toast.error("Upss! Something went wrong. " + error);
        }
      };

  return (
    <> 
        <Modal show={showModal} onHide={onClose}>
        
        <Modal.Header closeButton>
            <Modal.Title>
                Add new note
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
            <Form.Group controlId="formTitle" className="mt-2">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={300}   
                isInvalid={errors.title}   
              />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDetails" className="mt-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                maxLength={3000}
              />
            </Form.Group>
            {prioritySuccess && (
                <Form.Group controlId="formPriority" className="mt-3">
                <Form.Label>Priority *</Form.Label>
                <Form.Control
                    as="select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                    isInvalid={errors.priority}  
                >
                    <option value="">Select priority</option>

                    {priorities.map((priorityOption) => (
                    <option key={priorityOption.id} value={priorityOption}>
                        {priorityOption}
                    </option>
                    ))} 
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.priority}</Form.Control.Feedback>
                </Form.Group>
            )}
            <Form.Group controlId="formDeadline" className="mt-3 mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button className="btn btn-custom" onClick={handleAddNote}>
                Add Note
            </Button>
        </Modal.Footer>
    </Modal>

  </>
  )
}


export default AddNewNotePopup