// backend.js
import express from "express";

const app = express();
const port = 8000;
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] ===job
  );
};


const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserByID = (id) =>{
  const userIndex =users["users_list"].findIndex((user) => user["id"] === id);
  if (userIndex !== -1){
    users["users_list"].splice(userIndex,1);
    return true;
  } else{
    return false;
  }
  };




app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name && job) {
    let result = findUserByNameAndJob(name,job);
    result = {users_list: result};
    res.send(result);
  }

  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete("/users/:id", (req,res) => {
  const id = req.params["id"];
  const isDeleted = deleteUserByID(id);
  if (isDeleted) {
    res.status(200).send("The User with that ID has been deleted from the database.");
  } else{
    res.status(404).send("User is not in the database. Try a valid ID.")
  }
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});