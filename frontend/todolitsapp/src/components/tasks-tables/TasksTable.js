import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { getPriorityInfo, getDeadlineStyle } from './TaskFormatingUtils';

const TasksTable = ({tasks, toggleDeleteTaskPopup, toggleEditTaskPopup, allTasksSuccess, handleCheckboxChange, thStyle, isFullView}) => {

  return (
    <div className="table-wrapper">
        <table className={`table-all-tasks ${thStyle}`}>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Task</th>
                    {isFullView &&
                      <th scope="col">Priority</th>
                    }
                    <th scope="col">Deadline</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            {allTasksSuccess && tasks.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No tasks available
              </td>
            </tr>
              )}
              {allTasksSuccess && tasks.length > 0 &&  tasks.map((task) => {
                  return (
                    <tr key={task.id}>
                      <td className="checkbox-column">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          value="" 
                          id="flexCheckDefault" 
                          onChange={() => handleCheckboxChange(task)}
                          checked={task.isFinished}
                        />
                      </td>
                      <td className="title-column">
                        <Link
                            to={`/${task.id}/details`}
                            className="custom-link"
                          >
                            {task.title}
                          </Link>
                      </td>
                      {isFullView &&
                        <td className="priority-column">
                          <span className={`badge badge-pill ${getPriorityInfo(task)}`}>
                            {task.priority}
                          </span>
                        </td>
                      }
                      <td className={`deadline-column ${getDeadlineStyle(task.deadline)}`}>
                          {task.deadline}
                      </td>
                      <td className='icon-column' onClick={() => toggleEditTaskPopup(task)}>
                        <BsFillPencilFill />
                      </td>
                      <td className='icon-column' onClick={() => toggleDeleteTaskPopup(task.id)}>
                        <BsFillTrash3Fill />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
        </table>
    </div>

  );
}

export default TasksTable;