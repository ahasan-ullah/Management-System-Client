import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const taskData = {
      name: data.name,
      email: data.email,
      role: data.role,
      bankAcc: data.bankAcc,
      salary: data.salary,
      designation: data.designation,
    };

    // adding user data to database
    // axios
    //   .post("http://localhost:5000/users", userData)
    //   .then((res) => console.log(res))
    //   .catch((error) => {
    //     Swal.fire({
    //       position: "center",
    //       icon: "error",
    //       title: "Email Already Exists",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    // Mock API call to delete from DB
    console.log("Task deleted from DB:", id);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleUpdateTask = () => {
    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
    );
    setModalOpen(false);
    // Mock API call to update in DB
    console.log("Task updated in DB:", editingTask);
  };

  return (
    <div className="mt-20">
      <h2 className="text-center text-3xl font-bold">Work Sheet</h2>
      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="p-5 col-span-10">
          <div className="border p-3 grid grid-cols-12">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="card-body col-span-4">
              {/* task field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
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
                  selected={Date.now()}
                  {...register("hourWorked", { required: true })}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-neutral">Add</button>
              </div>
            </form>

            {/* Table */}
            <div className="overflow-x-auto mt-5 col-span-8">
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
                  {/* {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.taskType}</td>
                    <td>{task.hoursWorked}</td>
                    <td>{task.date.toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => openEditModal(task)}
                        className="btn btn-sm btn-warning mr-2"
                      >
                        🖊 Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="btn btn-sm btn-error"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))} */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
        {/* {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Edit Task</h3>

              <div className="space-y-4 mt-4">
                <select
                  name="taskType"
                  value={editingTask.taskType}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, taskType: e.target.value })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Content">Content</option>
                  <option value="Paper-work">Paper-work</option>
                </select>

                <input
                  type="number"
                  name="hoursWorked"
                  value={editingTask.hoursWorked}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      hoursWorked: e.target.value,
                    })
                  }
                  placeholder="Hours Worked"
                  className="input input-bordered w-full"
                />

                <DatePicker
                  selected={editingTask.date}
                  onChange={(date) => setEditingTask({ ...editingTask, date })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button onClick={handleUpdateTask} className="btn btn-primary">
                  Update
                </button>
                <button onClick={() => setModalOpen(false)} className="btn">
                  Close
                </button>
              </div>
            </div>
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
