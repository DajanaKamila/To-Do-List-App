import React from 'react';
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { getPriorityInfo, getDeadlineStyle } from './TaskFormatingUtils';
import { useUpdateTaskMutation } from '../api/taskApi';

const TasksList = ({tasks, toggleDeleteTaskPopup, toggleEditTaskPopup, allTasksSuccess, handleCheckboxChange}) => {
  const [updateTaskMutation] = useUpdateTaskMutation();

  return (
    <div className="table-wrapper">
        <table className="table-all-tasks">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Task</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Deadline</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {allTasksSuccess && tasks.map((task) => {
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
                      <td className="title-column">{task.title}</td>
                      {/* <td className="priority-column">{task.priority}</td> */}
                      <td className="priority-column">
                        <span className={`badge badge-pill ${getPriorityInfo(task)}`}>
                          {task.priority}
                        </span>
                      </td>
                      {/* <td className='deadline-column'>{task.deadline}</td> */}
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

export default TasksList;