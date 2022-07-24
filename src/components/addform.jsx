import React from "react"

export function AddForm(props) {
    return (
        <form className="add-form">
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" placeholder="Add Day & Time" value />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" value={false} />
            </div>
            <input className="btn add-btn" type="submit" value={SaveTask} />
        </form>

    )
}