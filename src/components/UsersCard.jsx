import React from "react";
import Swal from "sweetalert2";

const UsersCard = ({ user, deleteUser, setupdateInfo, handleShowForm }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user.id, user.first_name, user.last_name);
      }
    });
  };
  const handleUpdate = () => {
    setupdateInfo(user);
    handleShowForm();
  };

  return (
    <div>
      <ul>
        <li>{user.id}</li>
        <li>{user.first_name}</li>
        <li>{user.last_name}</li>
        <li>{user.email}</li>
        <li>{user.password}</li>
        <li>{user.birthday.split("-").reverse().join("-")}</li>
      </ul>
      <button onClick={handleDelete}>
        <i className="bx bx-user-minus"></i>
        <span>Delete</span>
      </button>
      <button onClick={handleUpdate}>
        <i className="bx bx-user-voice"></i>
        <span>Update</span>
      </button>
    </div>
  );
};

export default UsersCard;
