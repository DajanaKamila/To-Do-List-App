import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetTaskByIdQuery } from '../../api/taskApi';
import { getPriorityInfo, getDeadlineStyle } from '../tasks-tables/TaskFormatingUtils';
import { VscArrowLeft } from "react-icons/vsc";

const TaskDetailsPage = () => {

    const { id } = useParams();
    const {data: task, isSuccess} = useGetTaskByIdQuery(id) || {};

    if (!isSuccess) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <div className="row double">
                    <div className="col-12">
                        <div className="label">Title:</div>
                        <div className="value">{task?.title}</div>
                    </div>
                </div>
                <div className="row double">
                    <div className="col-12">
                        <div className="label">Priority:</div>
                        <div className={`value badge badge-pill ${getPriorityInfo(task)}`}>{task?.priority}</div>
                    </div>
                </div>
                <div className="row double">
                    <div className="col-12">
                        <div className="label">Description:</div>
                        <div className="value">{task?.description || "No description provided"}</div>
                    </div>
                </div>
                <div className="row single">
                    <div className="col-4">
                        <div className="label">Deadline:</div>
                        <div className="value">{task?.deadline || "No deadline"}</div>
                    </div>
                    <div className="col-4">
                        <div className="label">Is finished:</div>
                        <div className="value">{task?.finished ? "True" : "False"}</div>
                    </div>
                    <div className="col-4">
                        <div className="label">Completion date:</div>
                        <div className="value">{task?.completionDate || "Not finished yet"}</div>
                    </div>
                </div>
            </div>
            <Link to={'/'} className="custom-link">
                <button type="button" className="btn-back"><VscArrowLeft /> Back</button>
            </Link>
        </>
        
    );
}

export default TaskDetailsPage