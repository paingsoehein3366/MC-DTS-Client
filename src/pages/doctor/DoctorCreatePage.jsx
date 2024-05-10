import { useState } from "react";
import { useCreateDoctor } from "../../api/DoctorApi";
import queryClient from "../../lib/react-query";

const DoctorCreatePage = () => {
      const [doctorInputValue, setDoctorInputValue] = useState({});
      const doctorMutation = useCreateDoctor();
      const inputStyle = "border border-black mt-5 w-80 h-14 p-4 rounded border-slate-800";

      const handleOnChange = (e) => {
            const { name, value } = e.target;
            setDoctorInputValue({ ...doctorInputValue, [name]: value })
      };
      const doctorCreate = () => {
            doctorMutation.mutate(doctorInputValue, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['']
                        })
                  }
            })
      };
      return (
            <div className="flex flex-col justify-center items-center h-dvh">
                  <div className="flex flex-col justify-center items-center border p-12 rounded border-black">
                        <h1 className="text-2xl">Create Doctor</h1>
                        <input className={inputStyle} name="name" onChange={handleOnChange} type="text" placeholder="Enter Name" />
                        <input className={inputStyle} name="email" onChange={handleOnChange} type="text" placeholder="Enter Email" />
                        <input className={inputStyle} name="title" onChange={handleOnChange} type="text" placeholder="Enter Title" />
                        <input className={inputStyle} name="experience" onChange={handleOnChange} type="text" placeholder="Enter Experience" />
                        <button className="p-2 border mt-5 w-24 rounded bg-green-500 text-[#fff]" onClick={doctorCreate}>Create</button>
                  </div>
            </div>
      )
};
export default DoctorCreatePage;