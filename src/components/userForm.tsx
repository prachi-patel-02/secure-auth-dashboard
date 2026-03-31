import { useEffect } from "react";
import { useForm } from "react-hook-form";

function UserForm({ newUser, onSubmit, isEdit, users }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      department: "",
    },
  });

  // Edit
  useEffect(() => {
    if (isEdit && newUser) {
      reset(newUser);
    } else {
      reset({
        name: "",
        email: "",
        department: "",
      });
    }
  }, [newUser, isEdit, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 bg-white rounded-lg border w-full max-w-sm"
    >
      <h3 className="text-lg font-medium mb-4 text-gray-700">
        {isEdit ? "Update User" : "Add User"}
      </h3>

      {/* Name */}
      <input
        placeholder="Name"
        {...register("name", {
          required: "Name required",
          minLength: { value: 2, message: "Min 2 char" },
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Only letters allowed ",
          },
        })}
        className="border p-2 w-full rounded mb-2"
      />
      {errors.name && (
        <p className="text-red-500 text-left text-sm mt-1">
          {errors.name.message as string}
        </p>
      )}

      {/* Email */}
      <input
        placeholder="Email"
        {...register("email", {
          required: "Email required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format ",
          },

          validate: (value) => {
            const exists = users?.some(
              (u: any) =>
                u.email.toLowerCase() === value.toLowerCase() &&
                u.email !== newUser?.email,
            );

            if (exists) {
              return "Email already exists ";
            }

            return true;
          },
        })}
        className="border p-2 w-full rounded mb-2"
      />
      {errors.email && (
        <p className="text-red-500 text-left text-sm mt-1">
          {errors.email.message as string}
        </p>
      )}

      {/* Department */}
      <input
        placeholder="Department"
        {...register("department", {
          required: "Department required",
        })}
        className="border p-2 w-full rounded mb-2"
      />
      {errors.department && (
        <p className="text-red-500 text-left text-sm mt-1">
          {errors.department.message as string}
        </p>
      )}

      <button
        type="submit"
        disabled={isEdit && (!isDirty || !isValid)}
        className={`w-full py-2 rounded text-white ${
          isEdit && (!isDirty || !isValid) ? "bg-gray-400" : "bg-green-500"
        }`}
      >
        {isEdit ? "Update User" : "Add User"}
      </button>
    </form>
  );
}

export default UserForm;
