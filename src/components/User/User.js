import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";
const EditUser = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const getUserApi = "https://67028a6bbd7c8c1ccd3f27a6.mockapi.io/user";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(getUserApi.concat("/") + id)
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name</td>
        <td>{user.name}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{user.email}</td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>{user.phone}</td>
      </tr>
      <tr>
        <td>Student ID</td>
        <td>{user.studentId}</td>
      </tr>
      <tr>
        <td>Major</td>
        <td>{user.major}</td>
      </tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditUser;
