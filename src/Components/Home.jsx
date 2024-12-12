import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { QedMessageAction } from "../ReduxStore/Index";
import Search from "../Components/Search";
function Home() {
  // Accessing the Redux state and dispatch
  const { message,userData } = useSelector((store) => store.QED);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  // Dispatching an action
  const handleAlert = () => {
    dispatch(QedMessageAction.checkAlert("Working fine with Redux!"));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const addUser = (e) => {
    e.preventDefault();
    dispatch(QedMessageAction.addForm(userDetails));
    setUserDetails({
        name: "",
        email: "",
      });
  };
  return (
    <div>
    <Search/>
      <h2>Home</h2>
      <p>{message ? message : "No message yet."}</p>
      <input
        type="text"
        placeholder="enter your name"
        name="name"
        value={userDetails.name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="enter your email"
        name="email"
        value={userDetails.email}
        onChange={handleChange}
      />
      <button onClick={addUser}>add user</button>
      <button onClick={handleAlert}>Click Me</button>

      User Data
      {userData.map((item)=><><p>{item.name}</p>
        <p> {item.email}</p></>
      )}
         

    </div>


  );
}

export default Home;
