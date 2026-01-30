import axios from "axios";

export const fetchRegisterStatus = async () => {
  const res = await axios.get(
    "http://localhost:3001/api/register/status",
    {
      withCredentials: true,
    }
  );
  return res.data;
};
