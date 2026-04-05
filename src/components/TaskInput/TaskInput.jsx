import { useState } from "react";

const TaskInput = ({addTask}) => {
    const [task, setTask] = useState("");
    function handleTask(){
        addTask(task);
        setTask("");
    }
    return(
        <div className="flex gap-4 mt-4 mb-4">
            <input 
                className="border p-2 rounded-2xl w-md"
                type="text" 
                value={task}
                placeholder="Enter Task"
                onChange={(e) => setTask(e.target.value)}
            />
            <button 
                onClick={handleTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 cursor-pointer"
                >Add Task</button>

        </div>
    )
}
export default TaskInput;