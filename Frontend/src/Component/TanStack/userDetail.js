import axios from "axios";

export const fetchMe = async () => {
  try{
    const res = await axios.get(
      "http://localhost:3001/api/me",
      { withCredentials: true }
    );
    return res.data;
  }
  catch (err){
    console.log("Please Login")
  }
};
