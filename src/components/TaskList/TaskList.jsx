import { useState, useEffect } from "react";

import TaskInput from "../TaskInput/TaskInput";

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  function addTask(task) {
    const newTask = {
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(index) {
    const updateTask = tasks.filter((_, i) => i !== index);
    setTasks(updateTask);
  }

  function toggleCompleteTask(index) {
    const updateTask = tasks.map((t, i) => {
      if (i === index) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(updateTask);
  }

  function editTask(index, newText) {
    const updateTask = tasks.map((t, i) => {
      if (i === index) {
        return { ...t, text: newText };
      }
      return t;
    });
    setTasks(updateTask);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) => task.text.toLowerCase().includes(search.toLowerCase()));

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  function clearAllTask() {
    const confirmDelete = window.confirm("Are you sure ?");
    if (confirmDelete) {
      setTasks([]);
    }
  }

  return (
    <div>
      <h5 className="text-3xl text-white font-bold max-w-max m-auto ">
        My Task List
      </h5>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-10 justify-center mt-2 font-medium">
          <span>Total : {total}</span>
          <span>Completed : {completed}</span>
          <span>Pending : {total - completed}</span>
        </div>
        <div>
          <button
            onClick={clearAllTask}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>
      <hr className="mb-5 mt-3" />
      <TaskInput addTask={addTask} />
      {/* <hr className="mb-5 "/> */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`bg-gray-200 text-black px-3 py-1 border  rounded-2xl hover:bg-gray-500 cursor-pointer ${
    filter === "all" ? "bg-gray-700 text-white" : "bg-gray-200"
  }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`bg-gray-200 text-black px-3 py-1 border  rounded-2xl hover:bg-gray-500 cursor-pointer ${
    filter === "completed" ? "bg-gray-700 text-white" : "bg-gray-200"
  }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`bg-gray-200 text-black px-3 py-1 border rounded-2xl hover:bg-gray-500 cursor-pointer ${
    filter === "pending" ? "bg-gray-700 text-white" : "bg-gray-200"
  }`}
          >
            Pending
          </button>
        </div>
        <div>
          <input
            className="border p-2 rounded-2xl w-52 my-2 "
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ul>
        {filteredTasks.length === 0 ? (
      <p className="text-gray-500 text-center mt-4">
        No tasks available 😴
      </p>
    ):filteredTasks.map((t, index) => (
          <li
            className="flex justify-between items-center border-b-2 p-2 rounded m-4"
            key={index}
          >
            {editIndex === index ? (
              <>
                <input
                  className="border p-2 rounded-2xl w-60"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 cursor-pointer"
                  onClick={() => {
                    editTask(index, editValue);
                    setEditIndex(null);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleCompleteTask(index)}
                >
                  {t.text}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => deleteTask(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditValue(t.text);
                    }}
                    className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                </div>
              

              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TaskList;
