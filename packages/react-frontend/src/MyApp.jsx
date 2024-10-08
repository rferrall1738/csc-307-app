import React, { useState,useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {

  const [characters, setCharacters] = useState([]);

  function fetchUsers(){
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201){
          return res.json();
    }     else{
          throw new Error("Did not create user");
    }
  })
      .then((person) => {
        setCharacters([...characters, person]);
  })
      .catch((error) => {
        console.log(error);
    });
  }


  function postUser(person){
    const promise = fetch("http://localhost:8000/users",{
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  useEffect(() => {
    fetchUsers()
          .then((res) => res.json())
          .then((json) => setCharacters(json["users_list"]))
          .catch((error) => { console.log(error); })
  }, [] );

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`,{method: "DELETE"})
    .then((res) => {
      if(res.status == 204){
        setCharacters(characters.filter((character)=> character.id !== id));
      } else{
        throw new Error("Did not delete User");
      }
    })
    .catch((error) => {
      console.log(error)
    });

    
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;