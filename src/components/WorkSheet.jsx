import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/AuthContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const WorkSheet = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [task,setTask]=useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks", {
        params: { email: `${user.email}` },
      })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {});
  }, [tasks]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const date = watch("date");

  const onSubmit = async (data) => {
    const taskData = {
      taskType: data.taskType,
      hourWorked: data.hourWorked,
      date: data.date.toLocaleDateString("en-CA"),
      email: user.email,
    };
    // adding user data to database
    axios
      .post("http://localhost:5000/tasks", taskData)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Task Added",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {});
  };

  const getTaskData=(id)=>{
    axios.get('http://localhost:5000/tasks',{
      params: {id: `${id}`}
    }).then(res=>setTask(res.data));
  }
  
  const handleUpdate=()=>{

  }

  return (
    <div>
      <h2 className="text-center text-3xl font-bold">Work Sheet</h2>
      <div className="p-3 md:grid md:grid-cols-12">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body md:col-span-4"
        >
          {/* task field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Type</span>
            </label>
            <select
              {...register("taskType", { required: true })}
              className="select select-bordered"
              defaultValue={"Select Task"}
            >
              <option value="" disabled>
                Select Task
              </option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Content">Conten</option>
              <option value="Paper-Work">Paper-Work</option>
            </select>
          </div>
          {/* work hour field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hour Wokred</span>
            </label>
            <input
              type="number"
              {...register("hourWorked", { required: true })}
              placeholder="Hour Worked"
              className="input input-bordered"
              required
            />
          </div>
          {/* Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <DatePicker
              selected={watch("date") || null}
              onChange={(date) => setValue("date", date)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-neutral">Add</button>
          </div>
        </form>

        {/* Table */}
        <div className="overflow-x-auto mt-5 md:col-span-8">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Task</th>
                <th>Hours Worked</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.taskType}</td>
                  <td>{task.hourWorked}</td>
                  <td>{task.date}</td>
                  <td>
                    <div className="flex">
                      <button
                        onClick={() => {
                          document.getElementById("edit_modal").showModal();
                          getTaskData(task._id);
                        }}
                        className="btn btn-xs md:btn-sm btn-warning mr-2"
                      >
                        <FaEdit /> <p className="hidden md:block">Edit</p>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="btn btn-xs md:btn-sm btn-error"
                      >
                        <MdDelete /> <p className="hidden md:block">Delete</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* modal */}
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
        <form
          onSubmit={handleUpdate}
          className="card-body md:col-span-4"
        >
          {/* task field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Type</span>
            </label>
            <select
              className="select select-bordered"
              defaultValue={"Select Task"}
            >
              <option value="" disabled>
                Select Task
              </option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Content">Conten</option>
              <option value="Paper-Work">Paper-Work</option>
            </select>
          </div>
          {/* work hour field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hour Wokred</span>
            </label>
            <input
              type="number"
              placeholder="Hour Worked"
              className="input input-bordered"
              required
            />
          </div>
          {/* Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <DatePicker
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-neutral">Add</button>
          </div>
        </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default WorkSheet;
