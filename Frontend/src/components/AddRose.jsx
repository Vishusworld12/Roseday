import { Formik, Form,Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import {toast} from "react-toastify";
import { AxiosClient } from "../config/axiosClient";
import {FaArrowRight} from 'react-icons/fa6'
import {CgSpinner} from 'react-icons/cg'
import { useMainContext } from "../context/MainContext";
const AddRose = () => {
  let [isOpen, setIsOpen] = useState(false);

  const[loading,setLoading]= useState(false)

  const validationSchema = yup.object({
    title: yup.string().required("Title is Required"),

    desc: yup
      .string()
      .required("Description is Required")
      .min(10, "Description Length should be greater than 10 characters"),

    image: yup
      .string()
      .required("Image is required")
      .url("Image should be a valid url"),
  });

  const initialStates = {
    title: "",
    desc: "",
    image: "",
  };
  
  const onSubmitHandler = async(e,helpers)=>{
    try {
      setLoading(true)
      const response = await AxiosClient.post("/rose/add-rose",e)
      const data = await response.data;
      toast.success(data.msg)
      helpers.resetForm()
      setIsOpen(false)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }finally{
      setLoading(false)
    }
  }

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button
        onClick={open}
        className="px-4 py-2 bg-green-400  rounded-md text-sm cursor-pointer"
      >
        Add Rose
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-slate-800 backdrop-blur-2xl
               duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Add New Rose
              </DialogTitle>

              <Formik
              initialValues={initialStates}
              onSubmit={onSubmitHandler}
              validationSchema={validationSchema}>

              <Form className="py-3">
  <div className="mb-3">
    <label
      htmlFor="title"
      className="text-white text-sm"
    >
      Title
    </label>

    <Field
      name="title"
      type="text"
      id="title"
      className="w-full py-2 outline-none border-b border-b-white
       placeholder:text-gray-300 bg-primary rounded-md text-white px-3" placeholder='Enter Rose Title'
    />

    <ErrorMessage
      name='title'
      className="text-red-500 text-sm mt-1"
      component={'p'}
      
    />
  </div>
  <div className="mb-3">
    <label
      htmlFor="image"
      className="text-white text-sm"
    >
      image
    </label>

    <Field
      as="textarea"
      name="image"
      type="text"
      id="image"
      className="w-full py-2 outline-none border-b border-b-white
       placeholder:text-gray-300 bg-primary rounded-md text-white px-3" placeholder='Enter Rose image URL'
    />

    <ErrorMessage
      name='image'
      className="text-red-500 text-sm mt-1"
      component={'p'}
      
    />
  </div>
  <div className="mb-3">
    <label
      htmlFor="desc"
      className="text-white text-sm"
    >
      Discription
    </label>

    <Field
      as="textarea"
      name="desc"
      type="text"
      id="desc"
      className="w-full py-2 outline-none border-b border-b-white
       placeholder:text-gray-300 bg-primary rounded-md text-white px-3" placeholder='Enter Rose Discription'
    />

    <ErrorMessage
      name='desc'
      className="text-red-500 text-sm mt-1"
      component={'p'}
      
    />
  </div>
  <div className="mb-3">
    <button disabled={loading} className="w-full border border-green-500
     outline-none text-white flex items-center disabled:cursor-no-drop
     disabled:bg-gray-800
     justify-center gap-2 py-2 hover:bg-green-500 transition-all duration-300 cursor-pointer hover:rounded-md"
    ><span> Submit</span> 
    {
       loading?<CgSpinner className='text-xl animate-spin'/> : <FaArrowRight/>
    }
     </button>
    
  </div>
</Form>
              
              

              </Formik>

              <div className="mt-4">
                {/* <Button
                  className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold text-white"
                  onClick={close}
                >
                  Got it, thanks!
                </Button> */}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddRose;