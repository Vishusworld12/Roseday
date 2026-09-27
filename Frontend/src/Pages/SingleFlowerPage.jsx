import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import UpdateRose from "../components/UpdateRose";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosClient } from "../config/axiosClient";
import{useMainContext} from '../context/MainContext'

const SingleFlowerPage = () => {

  const params=useParams()
  const {fetchAllRose} = useMainContext()

  console.log(params);
  

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate =useNavigate()

  const fetchRose = async (id) => {
    try {
      setLoading(true);

      const response = await AxiosClient.get("/rose/get-roses/" + id);

      const data =  response.data;
      setData(data);


    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params && params.id){
      fetchRose( params.id)

    }
  }, [params])

  if (loading) {
    return <div>Loading...</div>;
  }
const DeleteRoseHandler = async () => {
  try {
    setLoading(true);

    const response = await AxiosClient.delete(
      "/rose/delete-roses/" + data.id
    );

    const datas = response.data;

    toast.success(datas.msg);

    navigate("/");

  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.error || error.message
    );

  } finally {
    setLoading(false);
  }
};
 

  return (
    <>
      <div className="w-full lg:w-[80%] my-10 rounded-md bg-green-800/80 mx-auto  lg:flex items-start overflow-hidden">

        <div className="w-full lg:h-[60vh] lg:w-1/2">
          <img
            src={data.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/2 flex flex-col items-start px-10 py-10 justify-center">

          <h1 className="text-3xl font-bold">
            {data.title}
          </h1>

          <p className="py-2">
           {data.description}
          </p>

          <div className="mb-3 flex gap-x-3 py-4">
           <UpdateRose data={data} updateHandler={() => fetchRose(params.id)}
/>
            <button onClick={DeleteRoseHandler} className="px-4 py-2 rounded-full outline-none border-2 border-red-500">
              Delete
            </button>
          </div>

        </div>

      </div>
    </>
  );
};

export default SingleFlowerPage;