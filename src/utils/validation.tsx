export const validateField = (name: string, value: string, user: any) => {
  let error = "";

  if (name === "name") {
    const regex = /^[A-Za-z\s]+$/;
    if (!value) error = "Name required";
    else if (value.length < 2) error = "Min 2 char";
    else if (!regex.test(value)) error = "Only letters allowed";
  }

  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) error = "Email required";
    else if (!emailRegex.test(value)) error = "Invalid email format";
  }

  if (name === "password") {
    if (!value) error = "Password required";
    else if (value.length < 6) error = "Min 6 char";
  }

  if (name === "confirm_password") {
    if (!value) error = "Required";
    else if (value !== user.password) error = "Password do Not match";
  }

  return error;
};
