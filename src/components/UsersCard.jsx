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
    <div className="usercard">
      <ul>
        <li>
          <i className="bx bx-id-card"></i> {user.id}
        </li>
        <li>
          <i className="bx bx-user-circle"></i> {user.first_name}{" "}
          {user.last_name}
        </li>
        <li>
          <i className="bx bx-envelope"></i> {user.email}
        </li>
        <li>
          <i className="bx bx-cake"></i>{" "}
          {user.birthday.split("-").reverse().join("-")}
        </li>
      </ul>
      <div className="userscard__btn">
        <button onClick={handleDelete}>
          <i className="bx bx-user-minus"></i>
          <span>Delete</span>
        </button>
        <button onClick={handleUpdate}>
          <i className="bx bx-user-voice"></i>
          <span>Update</span>
        </button>
      </div>
    </div>
  );
};

export default UsersCard;
