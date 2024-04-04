import React, { useState, useEffect } from 'react';
import DeleteTaskPopup from '../popups/DeleteTaskPopup';
import AddEditTaskPopup from '../popups/AddEditTaskPopup';
import { useGetAllTasksQuery, useUpdateTaskMutation } from '../../api/taskApi';
import TasksList from '../TasksList';
import TasksGrid from '../TasksGrid';
import FinishedTasksList from '../FinishedTasksList';


const TasksPage = () => {
    const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);
    const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
    const [showEditTaskPopup, setShowEditTaskPopup] = useState(false);
    const [taskToDeleteId, setTaskToDeleteId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState({});

    const [updateTaskMutation] = useUpdateTaskMutation();
    const {data: tasks, isSuccess: allTasksSuccess, refetch: refetchAllTasks} = useGetAllTasksQuery() || [];

    const toggleDeleteTaskPopup = (id) => {
        setTaskToDeleteId(id);
        setShowDeleteTaskPopup(!showDeleteTaskPopup);
    };

    const toggleAddTaskPopup = () => {
        setShowAddTaskPopup(!showAddTaskPopup);
    };

    const toggleEditTaskPopup = (task) => {
        setTaskToEdit(task);
        setShowEditTaskPopup(!showEditTaskPopup);
    }

    const handleCheckboxChange = async (task) => {
        const updatedTask = {
            ...task,
            finished: !task.finished,
            completionDate: task.finished ? null : new Date().toISOString()
        };

        await updateTaskMutation(updatedTask);
        refetchAllTasks();
    };

    let toDoTasks = tasks && tasks.filter(task => !task.finished);
    let finishedAndSortedTasks = tasks && tasks.filter(task => task.completionDate !== null).sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate)); 


    useEffect(() => {
        if (tasks) {
            toDoTasks = tasks && tasks.filter(task => !task.finished);
            finishedAndSortedTasks = tasks && tasks.filter(task => task.completionDate !== null).sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate)); 
        }
    }, [tasks, updateTaskMutation]);

  return (
    <div className="tasks-page">
        <div className="sub-nav-container">
                <button type="button" className="btn btn-custom" onClick={() => toggleAddTaskPopup()}>Add task</button>
                <div className="form-check">
                    <input className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault" 
                            checked={isChecked} 
                            onChange={() => setIsChecked(!isChecked)}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Grid view
                    </label>
                </div>
        </div>

        {isChecked ? <TasksGrid/>
            :   <TasksList
                    tasks={toDoTasks}
                    toggleDeleteTaskPopup={toggleDeleteTaskPopup}
                    toggleEditTaskPopup={toggleEditTaskPopup}
                    allTasksSuccess={allTasksSuccess}
                    refetch={refetchAllTasks}
                    handleCheckboxChange={handleCheckboxChange}
                />
                
        }

        <div className="gap"/>

        <FinishedTasksList 
            tasks={finishedAndSortedTasks }
            toggleDeleteTaskPopup={toggleDeleteTaskPopup}
            allTasksSuccess={allTasksSuccess}
            handleCheckboxChange={handleCheckboxChange}
        />


        {showDeleteTaskPopup && (
          <DeleteTaskPopup
            taskId={taskToDeleteId}
            onClose={toggleDeleteTaskPopup}
            refetch={refetchAllTasks}
          />
        )}
        { showAddTaskPopup && (
            <AddEditTaskPopup 
                onClose={toggleAddTaskPopup}
                refetch={refetchAllTasks}
            />
        )}

        { showEditTaskPopup && (
            <AddEditTaskPopup 
                onClose={toggleEditTaskPopup}
                refetch={refetchAllTasks}
                isEditMode={true}
                taskToEdit={taskToEdit}
            />
        )}

    </div>
  )
}

export default TasksPage;