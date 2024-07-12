import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";

const TaskManager = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    inProcess: [],
    completed: [],
  });
  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    endDate: "",
    priority: "",
    assignedTo: "",
  });
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskStatus, setEditTaskStatus] = useState(null);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they are updated
  //   useEffect(() => {
  //     localStorage.setItem("tasks", JSON.stringify(tasks));
  //   }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = () => {
    setShowPopup(true);
    setNewTask({
      title: "",
      description: "",
      endDate: "",
      priority: "",
      assignedTo: "",
    });
    setEditTaskIndex(null);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    const updatedTasks = { ...tasks };
    if (editTaskIndex !== null && editTaskStatus !== null) {
      updatedTasks[editTaskStatus][editTaskIndex] = newTask;
    } else {
      updatedTasks.pending.push(newTask);
    }
    console.log(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    setNewTask({
      title: "",
      description: "",
      endDate: "",
      priority: "",
      assignedTo: "",
    });
    setShowPopup(false);
  };

  const handleEditTask = (status, index) => {
    setShowPopup(true);
    setNewTask(tasks[status][index]);
    setEditTaskIndex(index);
    setEditTaskStatus(status);
  };

  const handleDeleteTask = (status, index) => {
    const updatedTasks = { ...tasks };
    updatedTasks[status].splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDragStart = (e, status, index) => {
    e.dataTransfer.setData("status", status);
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, newStatus) => {
    const status = e.dataTransfer.getData("status");
    const index = e.dataTransfer.getData("index");
    const task = tasks[status][index];
    const updatedTasks = { ...tasks };
    updatedTasks[status].splice(index, 1);
    updatedTasks[newStatus] = [...updatedTasks[newStatus], task];
    setTasks(updatedTasks);
    console.log(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const isSaveDisabled = !(
    newTask.title &&
    newTask.description &&
    newTask.endDate &&
    newTask.priority &&
    newTask.assignedTo
  );

  const totalTasks =
    tasks.pending.length + tasks.inProcess.length + tasks.completed.length;
  const completedPercentage = totalTasks
    ? Math.round((tasks.completed.length / totalTasks) * 100)
    : 0;

  return (
    <div className="App">
      <div className="header">
        <h1>Task Manager</h1>
      </div>
      <div className="button-container">
        <Button variant="outline-primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      <TaskModal
        show={showPopup}
        onHide={() => setShowPopup(false)}
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleSaveTask={handleSaveTask}
        editTaskIndex={editTaskIndex}
        isSaveDisabled={isSaveDisabled}
      />
      <div className="task-sections">
        {["pending", "inProcess", "completed"].map((status) => (
          <TaskList
            key={status}
            tasks={tasks[status]}
            status={status}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            allowDrop={allowDrop}
            completedPercentage={completedPercentage}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
