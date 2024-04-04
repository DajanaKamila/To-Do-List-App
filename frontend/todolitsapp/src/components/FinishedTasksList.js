import React from 'react'
import { BsFillTrash3Fill} from "react-icons/bs";
import { getPriorityInfo, getDeadlineStyle } from './TaskFormatingUtils';

const FinishedTasksList = ({tasks, toggleDeleteTaskPopup, allTasksSuccess, handleCheckboxChange}) => {
  return (
    <div className="table-wrapper">
        <table className="table-all-tasks finished">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Finished task</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Completion</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {allTasksSuccess && tasks.map((task) => (
                    <tr key={task.id}>
                        <td className="checkbox-column">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id="flexCheckDefault" 
                                    onChange={() => handleCheckboxChange(task)}
                                    defaultChecked/>
                        </td>
                        <td className="title-column" style={{ textDecoration: 'line-through', color: '#808080' }}>{task.title}</td>
                        <td className="priority-column">
                            <span className={`badge badge-pill ${getPriorityInfo(task)}`}>
                            {task.priority}
                            </span>
                      </td>
                        <td className='deadline-column'>{task.deadline}</td>
                        <td className='deadline-column'>{task.completionDate}</td>
                        <td className='icon-column'>
                        <div className="trash-icon" onClick={() => toggleDeleteTaskPopup(task.id)}>
                            <BsFillTrash3Fill />
                        </div>                           
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default FinishedTasksList