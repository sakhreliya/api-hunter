import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Api.css";

const Api = () => {
  const [data, setdata] = useState([]);
  const [view, setview] = useState({});

  const name = useRef();
  const age = useRef();

  //get data
  const fetchData = () => {
    axios.get("http://localhost:3001/post").then((res) => {
      setdata(res.data);
    });
  };

  //add data
  const handleSubmit = () => {
    const dataa = {
      name: name.current.value,
      age: age.current.value,
    };

    axios.post("http://localhost:3001/post", dataa).then((res) => {
      console.log(res.data);
      setdata([...data, res.data]);
    });
  };

  //delete data
  const deleteData = (id) => {
    axios.delete(`http://localhost:3001/post/${id}`).then((res) => {
      console.log(res);
      setdata(data.filter((val) => val.id !== id));
    });
  };

  //set view
  const viewData = (index) => {
    const user = data[index];
    setview(user);
  };

  const handleView = (e) => {
    setview({ ...view, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/post/${view.id}`, view).then((res) => {
      console.log(res.data, "ressss");

      setdata(data.map((val) => (val.id === res.data.id ? res.data : val)));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="input-container">
        <input type="text" name="name" ref={name} />
        <input type="number" name="age" ref={age} />
        <button onClick={handleSubmit}>Add</button>
      </div>

      {/* update data*/}
      <div className="input-container">
        <label htmlFor="">Update Data</label>
        <input type="text" name="name" value={view.name} onChange={handleView} />
        <input type="number" name="age" value={view.age} onChange={handleView} />
        <button onClick={handleUpdate}>update</button>
        <button>cancel</button>
      </div>

      <div className="card-container">
        {data?.map((val, ind) => (
          <div key={ind} className="card">
            <h5>{val.name}</h5>
            <h6>{val.age}</h6>
            <p>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <button onClick={() => deleteData(val.id)}>Delete</button>
            <button onClick={() => viewData(ind)}>Update</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Api;
