function UserTable({ users, onEdit, onDelete }: any) {
  return (
    <table className="w-full border border-gray-300 bg-white m-5 mx-0">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Department</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u: any, index: number) => (
          <tr key={index} className="text-center border">
            <td className="p-2 border">{u.name}</td>
            <td className="p-2 border">{u.email}</td>
            <td className="p-2 border">{u.department}</td>

            <td className="flex gap-2 justify-center p-2">
              <button
                className="p-1 text-white bg-blue-800 rounded-lg"
                onClick={() => onEdit(u)}
              >
                edit
              </button>

              <button
                className="p-1 text-white bg-red-700 rounded-lg"
                onClick={() => onDelete(u.id)}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
