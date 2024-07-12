import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const TaskList = ({
  status,
  tasks,
  handleEditTask,
  handleDeleteTask,
  handleDragStart,
  handleDrop,
  allowDrop,
  completedPercentage,
}) => {
  const getPercentageColor = (percentage) => {
    if (percentage === 0) return "black";
    if (percentage === 100) return "green";
    return "orange";
  };

  return (
    <div
      className="task-section"
      onDrop={(e) => handleDrop(e, status)}
      onDragOver={allowDrop}
    >
      <h2>
        {status === "pending" && "Pending"}
        {status === "inProcess" && "In Process"}
        {status === "completed" && "Completed"}
        {status === "completed" && (
          <span
            style={{
              color: getPercentageColor(completedPercentage),
              fontSize: "0.8em",
            }}
          >
            {" "}
            ({completedPercentage}%)
          </span>
        )}
      </h2>
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`task ${status}`}
          draggable
          onDragStart={(e) => handleDragStart(e, status, index)}
        >
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <div className="task-actions">
            {(status === "pending" || status === "inProcess") && (
              <Button
                variant="light"
                onClick={() => handleEditTask(status, index)}
              >
                <FaEdit />
              </Button>
            )}
            <Button
              variant="light"
              onClick={() => handleDeleteTask(status, index)}
            >
              <FaTrashAlt />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
