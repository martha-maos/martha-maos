
import './App.css';
import {useState, useEffect } from "react";
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [descrption, setDescription] = useState("");
  const [ListOfFriends,setListOfFriends] = useState([]);


//Funcion para guardar los datos del formulario desde el frontend al backend
const addFriend = () => {
  Axios.post("https://martha-maos.herokuapp.com/addFriend",{
    name : name,
    age : age,
    descrption : descrption
  }).then((response) => {
    alert('Datos Registrados! Success!! =D');
    setListOfFriends([...ListOfFriends,{_id: response.data._id, name : name, age : age, descrption : descrption}]);
  }).catch(() => {
    alert('No se Registraron los datos! Fail! =( F en el chat')
  });
};


//Funcion para actualizar datos del formulario desde el frontend al backend
const updateFriend = (id) => {

  const newName = prompt("Ingresa nuevo nombre: ");
  const newAge = prompt("Ingresa nueva edad: ");
  const newDescription = prompt("Ingresa nueva descripción: ");

  Axios.put("https://martha-maos.herokuapp.com/update", {newName: newName, newAge: newAge, newDescription : newDescription, id : id}).then(() => {
    alert('Datos Actualizados! Success! =D');
    setListOfFriends(ListOfFriends.map((val) =>{
      return val._id ===id
      ? { _id: id, name: val.name, age: newAge, descrption: newDescription}
      :val;
    }));
  }).catch(() => {
    alert('No se Actualizaron los Datos! Fail =( Bien triste');
  });
};

//Funcion para borrar datos desde el frontend al backend
const deleteFriend = (id) => {
  Axios.delete(`https://martha-maos.herokuapp.com/delete/${id}` ).then(() => {
    alert('Datos eliminados! Sucess! =D');
    setListOfFriends(ListOfFriends.filter((val) => {
      return val._id !==id;
    }));
  }).catch(() => {
    alert ('No se eliminaron los datos! Fail!!! =(');
  });
};

  //Funcion para cargar los datos desde el backend al frontend
  //useEffect es una funcion que se ejecuta al cargar la App
  useEffect(() => {
    Axios.get("https://martha-maos.herokuapp.com/read")
    .then((response) => {
      setListOfFriends(response.data);
    }).catch(() => {
      console.log("No response");
    });
  }, []);

  return(
    <div className="App">
      <div className="inputs">
        REGISTRO DE AMIGOS

          <input
            type = "text"
            placeholder = "Nombre..."
            onChange = {(event) => {setName(event.target.value)}}
            /> 
            <input
            type="number"
            placeholder="Edad..."
            onChange = { (event) => { setAge(event.target.value)}}
            />

            <input 
            type="text"
            placeholder="Descripcion..."
            onChange = {(event) => { setDescription(event.target.value)}}
            />

            <button onClick = {addFriend}>Agregar</button>
      </div>
      <p aling="center">LISTADO DE AMIGOS </p>
      <div className="ListOfFriends">
        { ListOfFriends.map((val) => {
          return (
              <div className="FriendContainer">
                <div className="Friend">
                <h3>Nombre: {val.name}</h3>
                <h3>Edad: {val.age}</h3>
                <h3>Descripcion: {val.descrption}</h3>
                </div>
                <button
                  id="updateBtn"
                  onClick = { () => { updateFriend(val._id)}}
                  ><b>M</b></button>
                  <button
                  id="removeBtn"
                  onClick = { () => { deleteFriend(val._id)}}
                  ><b>E</b></button>
                  </div>
                  );
        })}
      </div>
    </div>
    );
}

export default App;
