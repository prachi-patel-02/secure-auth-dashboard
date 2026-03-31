import { useEffect, useState } from "react";
import UserForm from "../components/userForm";
import UserTable from "../components/userTable";
import ConfirmModel from "../components/confirmModel";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";

function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    department: "",
  });

  const fetchUsers = async () => {
    const token = localStorage.getItem("token") || "";
    const data = await getUsers(token);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //create
  // const handleCreateUser = async (e: any) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("token") || "";

  //   if (isEdit) {
  //     await updateUser(token, editId, newUser);
  //     alert("User updated successfully !");
  //   } else {
  //     await createUser(token, newUser);
  //     alert("User Added successfully !");
  //   }
  //   setShowForm(false);
  //   setIsEdit(false);
  //   setNewUser({ name: "", email: "", department: "" });
  //   fetchUsers();
  // };

  const handleCreateUser = async (data: any) => {
    const token = localStorage.getItem("token") || "";

    //  EMAIL-CHECK
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (!isEdit && emailExists) {
      alert("Email already exists ");
      return;
    }

    if (isEdit) {
      await updateUser(token, editId, data);
      alert("User updated successfully !");
    } else {
      await createUser(token, data);
      alert("User Added successfully !");
    }

    setShowForm(false);
    setIsEdit(false);
    setNewUser({ name: "", email: "", department: "" });

    fetchUsers();
  };

  //delete
  const handleDeleteBtn = async (id: string) => {
    const token = localStorage.getItem("token") || "";

    await deleteUser(token, id);
    alert("User is deleted");

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <>
      <div className="bg-blue-900 w-full p-4 flex justify-between items-center">
        <h1 className="text-xl text-white font-semibold">USER DASHBOARD</h1>

        <div className="flex gap-3">
          <button
            className="bg-pink-500 px-3 py-1 rounded text-white hover:bg-pink-600"
            onClick={() => setShowForm(!showForm)}
          >
            Create a sub user
          </button>

          <button
            className="bg-gray-500 px-3 py-1 rounded text-white hover:bg-gray-600"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-4">
        {showForm && (
          <UserForm
            newUser={newUser}
            setNewUser={setNewUser}
            onSubmit={handleCreateUser}
            isEdit={isEdit}
            users={users}
          />
        )}

        <UserTable
          users={users}
          onEdit={(u: any) => {
            setShowForm(true);
            setIsEdit(true);
            setEditId(u.id);
            setNewUser(u);
          }}
          onDelete={(id: string) => {
            setDeleteId(id);
            setShowConfirm(true);
          }}
        />

        {showConfirm && (
          <ConfirmModel
            onYes={() => {
              handleDeleteBtn(deleteId);
              setShowConfirm(false);
            }}
            onNo={() => setShowConfirm(false)}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
