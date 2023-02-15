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
      .then((res) => {
        setusers(res.data);
        setfiltervalue("");
        document.getElementById("filterinput__box")?.reset();
      })
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
    document.body.classList.toggle("darkmode");
  };

  const handlefilterInput = (e) => {
    e.preventDefault();
    setfiltervalue(e.target.value.trim().replace(/ /g, "").toLowerCase());
  };

  const handleLoading = () => {
    setTimeout(() => {
      if (users) setisloading(false);
    }, 3000);
  };


let printUsers = users && ( users
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
    )))



  useEffect(handleLoading, [users]);
  useEffect(getAllUsers, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="App">
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
            <>
            <form className="filterinput__box" id="filterinput__box">
              <label htmlFor="filterinput">Filter</label>
              <input
                className="filterinput__text"
                onChange={handlefilterInput}
                type="text"
                id="filterinput"
                placeholder="First Name or Last Name"
              />
            </form>
            <div className="usercounter">Showing {printUsers.length} out of {users.length} total users</div>
            </>
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
            {printUsers}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
