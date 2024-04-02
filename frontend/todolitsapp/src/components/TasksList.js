import React from 'react';
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";

const TasksList = ({tasks, toggleDeleteTaskPopup, allTasksSuccess}) => {

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
                {allTasksSuccess && tasks.map((task) => (
                    <tr key={task.id}>
                        <td className="checkbox-column">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </td>
                        <td className="title-column">{task.title}</td>
                        <td className="priority-column">{task.priority}</td>
                        <td className='deadline-column'>{task.deadline}</td>
                        <td className='icon-column'>
                            <BsFillPencilFill />
                        </td>
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
  );
}

export default TasksList;