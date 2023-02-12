import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "animate.css";

const UsersForm = ({
  updateUser,
  createNewUser,
  updateInfo,
  defaultValue,
  users,
  setupdateInfo,
  formAnimation,
  handleShowForm,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    if (updateInfo) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          updateUser(updateInfo.id, data);
          handleShowForm();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire({
        title: `Do you want to create "${data.first_name} ${data.last_name}"?`,
        showDenyButton: true,
        confirmButtonText: "Create",
        denyButtonText: `Don't create`,
      }).then((result) => {
        if (result.isConfirmed) {
          createNewUser(data);
          handleShowForm();
        } else if (result.isDenied) {
          Swal.fire("User was not created", "", "info");
        }
      });
    }
  };

  const handleCancel = () => {
    setupdateInfo();
    reset(defaultValue);
    handleShowForm();
  };

  const setUpdateform = () => {
    if (updateInfo) reset(updateInfo);
    else {
      reset(defaultValue);
    }
  };

  useEffect(setUpdateform, [updateInfo, users]);
  return (
    <div className={`usersform__container animate__animated ${formAnimation}`}>
      <form className="usersform" onSubmit={handleSubmit(submit)}>
        <span className="userform__cancelX" onClick={handleCancel}>
          <i className="bx bx-x-circle"></i>
        </span>
        {updateInfo && <h4>Id: #{updateInfo.id}</h4>}
        <div className="userform__input">
          <label htmlFor="firstName">First name</label>
          <input
            {...register("first_name", {
              required: {
                value: true,
                message: "This field is required.",
              },
              pattern: {
                value: /[A-Za-z]/,
                message:
                  "Please enter only alphabetical letters without spaces",
              },
              maxLength: {
                value: 25,
                message: "The maximum length is 25 characters.",
              },
              minLength: {
                value: 1,
                message: "The minimum length is 1 character.",
              },
            })}
            type="text"
            id="firstName"
            placeholder="First Name"
          />
          {errors.first_name && (
            <span className="usersform__error">
              <i className="bx bx-error"></i>
              {errors.first_name.message}
            </span>
          )}
        </div>
        <div className="userform__input">
          <label htmlFor="lastName">Last name</label>
          <input
            {...register("last_name", {
              required: {
                value: true,
                message: "This field is required.",
              },
              pattern: {
                value: /[A-Za-z]/,
                message:
                  "Please enter only alphabetical letters without spaces",
              },
              maxLength: {
                value: 25,
                message: "The maximum length is 25 characters.",
              },
              minLength: {
                value: 1,
                message: "The minimum length is 1 character.",
              },
            })}
            type="text"
            id="lastName"
            placeholder="Last Name"
          />
          {errors.last_name && (
            <span className="usersform__error">
              <i className="bx bx-error"></i>
              {errors.last_name.message}
            </span>
          )}
        </div>
        <div className="userform__input">
          <label htmlFor="birthday">Birthday</label>
          <input
            {...register("birthday", {
              required: {
                value: true,
                message: "This field is required.",
              },
            })}
            type="date"
            id="birthday"
          />
          {errors.birthday && (
            <span className="usersform__error">
              <i className="bx bx-error"></i>
              {errors.birthday.message}
            </span>
          )}
        </div>
        <div className="userform__input">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "This field is required.",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email.",
              },
              maxLength: {
                value: 150,
                message: "The maximum length is 150 characters.",
              },
            })}
            type="email"
            id="email"
            placeholder="example@email.com"
          />
          {errors.email && (
            <span className="usersform__error">
              <i className="bx bx-error"></i>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="userform__input">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "This field is required.",
              },
              maxLength: {
                value: 128,
                message: "The maximum length is 128 characters.",
              },
              minLength: {
                value: 6,
                message: "The minimum length is 6 characters.",
              },
            })}
            type="password"
            id="password"
            placeholder="password"
          />
          {errors.password && (
            <span className="usersform__error">
              <i className="bx bx-error"></i>
              {errors.password.message}
            </span>
          )}
        </div>
        <button className="userform__btn">
          {updateInfo ? (
            <>
              <i className="bx bx-user-check"></i>
              <span>Update</span>
            </>
          ) : (
            <>
              <i className="bx bx-user-plus"></i>
              <span>Create</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UsersForm;
