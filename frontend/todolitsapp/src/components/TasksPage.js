import React, { useState } from 'react';
import DeleteTaskPopup from './DeleteTaskPopup';
import AddNewTaskPopup from './AddNewTaskPopup';
import { useGetAllTasksQuery } from '../api/taskApi';
import TasksList from './TasksList';
import TasksGrid from './TasksGrid';


const TasksPage = () => {
    const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);
    const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
    const [taskToDeleteId, setTaskToDeleteId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const {data: tasks, isSuccess: allTasksSuccess, refetch: refetchAllTasks} = useGetAllTasksQuery() || [];

    const toggleDeleteTaskPopup = (id) => {
        setTaskToDeleteId(id);
        setShowDeleteTaskPopup(!showDeleteTaskPopup);
    };

    const toggleAddTaskPopup = () => {
        setShowAddTaskPopup(!showAddTaskPopup);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    // const toDoTasks = tasks.filter(task => !task.isFinished);

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
                            onChange={handleCheckboxChange} />
                    <label className="form-check-label" for="flexCheckDefault">
                        Grid view
                    </label>
                </div>
        </div>

        {isChecked ? <TasksGrid/>
            :   <TasksList
                    tasks={tasks}
                    toggleDeleteTaskPopup={toggleDeleteTaskPopup}
                    allTasksSuccess={allTasksSuccess}
                />
        }


        {showDeleteTaskPopup && (
          <DeleteTaskPopup
            taskId={taskToDeleteId}
            onClose={toggleDeleteTaskPopup}
            refetch={refetchAllTasks}
          />
        )}
        { showAddTaskPopup && (
            <AddNewTaskPopup 
                onClose={toggleAddTaskPopup}
                refetch={refetchAllTasks}
            />
        )}

    </div>
  )
}

export default TasksPage;