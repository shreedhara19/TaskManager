import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TaskModal = ({
  show,
  onHide,
  newTask,
  handleInputChange,
  handleSaveTask,
  editTaskIndex,
  isSaveDisabled,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editTaskIndex !== null ? "Edit Task" : "Add Task"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={newTask.endDate}
              onChange={handleInputChange}
              placeholder="Enter end date"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="text"
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              placeholder="Enter task priority"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              value={newTask.assignedTo}
              onChange={handleInputChange}
              placeholder="Enter assignee"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveTask}
          disabled={isSaveDisabled}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
