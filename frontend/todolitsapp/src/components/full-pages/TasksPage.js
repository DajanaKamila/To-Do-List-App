import React, { useState, useEffect } from 'react';
import DeleteTaskPopup from '../popups/DeleteTaskPopup';
import AddEditTaskPopup from '../popups/AddEditTaskPopup';
import { useGetAllTasksQuery, useUpdateTaskMutation } from '../../api/taskApi';
import TasksTable from '../tasks-tables/TasksTable';
import TasksGrid from '../tasks-tables/TasksGrid';
import FinishedTasksTable from '../tasks-tables/FinishedTasksTable';


const TasksPage = () => {
    const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);
    const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
    const [showEditTaskPopup, setShowEditTaskPopup] = useState(false);
    const [taskToDeleteId, setTaskToDeleteId] = useState(null);
    const [isChecked, setIsChecked] = useState(localStorage.getItem('isChecked') === 'true');;
    const [taskToEdit, setTaskToEdit] = useState({});
    const [toDoTasks, setToDoTasks] = useState([]);
    const [finishedAndSortedTasks, setFinishedAndSortedTasks] = useState([]);

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

    useEffect(() => {
        if (tasks) {
            const toDo = tasks.filter(task => !task.finished);
            const finishedSorted = tasks.filter(task => task.completionDate !== null).sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));
            setToDoTasks(toDo);
            setFinishedAndSortedTasks(finishedSorted);
        }
    }, [tasks, updateTaskMutation]);

    useEffect(() => {
        localStorage.setItem('isChecked', isChecked);
    }, [isChecked]);

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

        {isChecked ? <TasksGrid
                            tasks={toDoTasks}
                            toggleDeleteTaskPopup={toggleDeleteTaskPopup}
                            toggleEditTaskPopup={toggleEditTaskPopup}
                            allTasksSuccess={allTasksSuccess}
                            handleCheckboxChange={handleCheckboxChange}
                            isFullView={false}
                    />
                :   <TasksTable
                        tasks={toDoTasks}
                        toggleDeleteTaskPopup={toggleDeleteTaskPopup}
                        toggleEditTaskPopup={toggleEditTaskPopup}
                        allTasksSuccess={allTasksSuccess}
                        handleCheckboxChange={handleCheckboxChange}
                        thStyle="basic"
                        isFullView={true}
                    />
                
        }

        <div className="gap"/>

        <FinishedTasksTable 
            tasks={finishedAndSortedTasks }
            toggleDeleteTaskPopup={toggleDeleteTaskPopup}
            allTasksSuccess={allTasksSuccess}
            handleCheckboxChange={handleCheckboxChange}
        />

        <div className="gap"/>


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