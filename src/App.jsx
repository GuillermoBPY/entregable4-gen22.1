import axios from "axios";
import { useEffect, useState } from "react";
import UsersForm from "./components/UsersForm";
import UsersCard from "./components/UsersCard";
import "./styles/App.css";
import Swal from "sweetalert2";
import Loading from "./components/Loading";

function App() {
  const [users, setusers] = useState();
  const [updateInfo, setupdateInfo] = useState();
  const [formAnimation, setformAnimation] = useState();
  const [darkmode, setdarkmode] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [filtervalue, setfiltervalue] = useState("");
  const [defaultValue, setdefaultValue] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
  });
  const url = "https://users-crud.academlo.tech/users/";

  const getAllUsers = () => {
    axios
      .get(url)
      .then((res) => setusers(res.data))
      .catch((err) => console.log(err));
  };

  const createNewUser = (data) => {
    axios
      .post(url, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: `${data.first_name} ${data.last_name} was created successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id, first_name, last_name) => {
    const urlId = `${url}${id}/`;
    axios
      .delete(urlId)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: `${first_name} ${last_name} was deleted successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (id, data) => {
    const urlId = `${url}${id}/`;
    axios
      .put(urlId, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: `${data.first_name} ${data.last_name} was updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        getAllUsers();
        setupdateInfo();
      })
      .catch((err) => console.log(err));
  };

  const handleShowForm = () => {
    if (formAnimation === "animate__zoomInDown") {
      setformAnimation("animate__zoomOutUp");
    } else {
      setformAnimation("animate__zoomInDown");
    }
  };

  const handleDarkMode = () => {
    !darkmode ? setdarkmode("darkmode") : setdarkmode(false);
  };

  const handlefilterInput = (e) => {
    e.preventDefault();
    setfiltervalue(e.target.value.replace(/ /g, "").toLowerCase());
  };

  const handleLoading = () => {
    setTimeout(() => {
      if (users) setisloading(false);
    }, 3000);
  };

  useEffect(handleLoading, [users]);
  useEffect(getAllUsers, []);

  return (
    <div className={`App ${darkmode}`}>
      {isloading && <Loading />}

      <header className="header">
        <h1>User Manager</h1>
        <div className="header__btn">
          <div onClick={handleDarkMode} className="header__darkmodebtn">
            {darkmode === "darkmode" ? (
              <i className="bx bx-sun"></i>
            ) : (
              <i className="bx bx-moon"></i>
            )}
          </div>
          <button onClick={handleShowForm}>
            <i className="bx bx-user-plus"></i>
            <span>Create</span>
          </button>
        </div>
      </header>
      {users && (
        <div className="filterinput">
          <label htmlFor="filterinput">Filter</label>
          <input
            className="filterinput__text"
            onChange={handlefilterInput}
            type="text"
            id="filterinput"
            placeholder="First Name or Last Name"
          />
        </div>
      )}

      <UsersForm
        updateUser={updateUser}
        createNewUser={createNewUser}
        updateInfo={updateInfo}
        defaultValue={defaultValue}
        users={users}
        setupdateInfo={setupdateInfo}
        formAnimation={formAnimation}
        handleShowForm={handleShowForm}
      />
      <div className="userscard__grid">
        {users &&
          users
            .filter((user) =>
              (user.first_name + user.last_name)
                .toLowerCase()
                .replace(/ /g, "")
                .includes(filtervalue)
            )
            .map((user) => (
              <UsersCard
                key={user.id}
                user={user}
                deleteUser={deleteUser}
                setupdateInfo={setupdateInfo}
                handleShowForm={handleShowForm}
              />
            ))}
      </div>
    </div>
  );
}

export default App;
