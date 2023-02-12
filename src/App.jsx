import axios from "axios";
import { useEffect, useState } from "react";
import UsersForm from "./components/UsersForm";
import UsersCard from "./components/UsersCard";
import "./styles/App.css";
import Swal from "sweetalert2";


function App() {
  const [users, setusers] = useState();
  const [updateInfo, setupdateInfo] = useState();
  const [showForm, setshowForm] = useState();
const [formAnimation, setformAnimation] = useState()
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
    setshowForm(true)
  if(formAnimation === "animate__zoomInDown"){
    setformAnimation ("animate__zoomOutUp")
  } else {setformAnimation ("animate__zoomInDown") }
  
  };

  useEffect(getAllUsers, []);

  return (
    <div className="App">
      <h1>Hola Programador</h1>
      <div onClick={handleShowForm}>
        <i className="bx bx-user-plus"></i>
        <span>Create</span>
      </div>
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
      {users &&
        users.map((user) => (
          <UsersCard
            key={user.id}
            user={user}
            deleteUser={deleteUser}
            setupdateInfo={setupdateInfo}
            handleShowForm={handleShowForm}
          />
        ))}
    </div>
  );
}

export default App;
