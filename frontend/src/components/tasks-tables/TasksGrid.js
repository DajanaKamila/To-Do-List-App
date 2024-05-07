import React from 'react';
import TaskTable from './TasksTable';

const TasksGrid = ({tasks, toggleDeleteTaskPopup, toggleEditTaskPopup, allTasksSuccess, handleCheckboxChange, isFullView}) => {

  let highAndUrgent = tasks && tasks.filter(task => task.priority === "High & Urgent" && !task.finished);
  let lowAndUrgent = tasks && tasks.filter(task => task.priority === "Low & Urgent" && !task.finished);
  let highAndNotUrgent = tasks && tasks.filter(task => task.priority === "High & Not Urgent" && !task.finished);
  let lowAndNotUrgent = tasks && tasks.filter(task => task.priority === "Low & Not Urgent" && !task.finished);

  return (
          <div className="container-fluid">
            <div className="row justify-content-between">
              <div className="col-6">
                <TaskTable tasks={highAndUrgent} 
                            toggleDeleteTaskPopup={toggleDeleteTaskPopup}
                            toggleEditTaskPopup={toggleEditTaskPopup}
                            allTasksSuccess={allTasksSuccess}
                            handleCheckboxChange={handleCheckboxChange}
                            thStyle="high-urgent"
                            isFullView={isFullView}/>
              </div>
              <div className="col-6">
                <TaskTable tasks={lowAndUrgent} 
                            toggleDeleteTaskPopup={toggleDeleteTaskPopup}
                            toggleEditTaskPopup={toggleEditTaskPopup}
                            allTasksSuccess={allTasksSuccess}
                            handleCheckboxChange={handleCheckboxChange}
                            thStyle="low-urgent"
                            isFullView={isFullView}/>
              </div>
            </div>

            <div className="row justify-content-between mt-4">
              <div className="col-6">
                <TaskTable tasks={highAndNotUrgent} 
                            toggleDeleteTaskPopup={toggleDeleteTaskPopup}
                            toggleEditTaskPopup={toggleEditTaskPopup}
                            allTasksSuccess={allTasksSuccess}
                            handleCheckboxChange={handleCheckboxChange}
                            thStyle="high-not-urgent"
                            isFullView={isFullView}/>
              </div>
              <div className="col-6">
                <TaskTable tasks={lowAndNotUrgent} 
                            toggleDeleteTaskPopup={toggleDeleteTaskPopup}
                            toggleEditTaskPopup={toggleEditTaskPopup}
                            allTasksSuccess={allTasksSuccess}
                            handleCheckboxChange={handleCheckboxChange}
                            thStyle="low-not-urgent"
                            isFullView={isFullView}/>
              </div>
            </div>
          </div>
  );
};

export default TasksGrid;
