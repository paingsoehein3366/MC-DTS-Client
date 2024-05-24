import React from 'react';
import {
      Select,
      SelectContent,
      SelectTrigger,
      SelectValue,
      SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import DoctorDelete from './doctor-delete';
import { toast, ToastContainer } from 'react-toastify';
import { useDoctorUpdate } from '../api/doctor-update-api';
import { queryClient } from '@/lib/react-query';
import { updateDoctorSchema } from '../schema/doctor-update-schema';

const DoctorSetting = ({ doctorValue, doctorId }) => {
      console.log("doctorId: ", doctorId);
      const [doctorInputValue, setDoctorInputValue] = useState(doctorValue);
      console.log("doctorInputValue: ", doctorInputValue);
      const [errorMessage, setErrorMessage] = useState({});
      const [open, setOpen] = useState(false);

      const useDoctorUpdateMutation = useDoctorUpdate();

      const inputStyle = "border border-gray-300 mt-2 w-48 h-10 p-4 rounded focus:outline-none focus:border-blue-500";
      const inputContainer = "flex flex-col mt-5";
      const inputContainerTwo = "flex justify-around w-[550px]";

      const handleOnChange = (e) => {
            const { name, value } = e.target;
            setDoctorInputValue({ ...doctorInputValue, [name]: value });
      };

      const doctorUpdate = async () => {
            console.log("doctorInputValue: ", doctorInputValue);
            const { message, key } = await updateDoctorSchema.validate(doctorInputValue).catch(err => {
                  return { message: err.errors, key: err.path }
            });
            setErrorMessage({ [key]: message });
            if (message) return;
            useDoctorUpdateMutation.mutate({ id: doctorId, data: doctorInputValue }, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['slots']
                        }),
                              toast('Doctor update success')
                        console.log("success");
                  },
                  onError: (err) => {
                        console.log("Error: ", err);
                  }
            })
            console.log("doctorUpdate");
      }

      return (
            <div>
                  <div>
                        <div className='flex justify-end mt-6'>
                              <Button
                                    onClick={() => setOpen(true)}
                                    className='bg-red-500 text-white rounded-[7px] hover:bg-red-600'
                              >
                                    Delete
                              </Button>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                              <div className={inputContainerTwo}>
                                    <div className={inputContainer}>
                                          <Label>
                                                Name <span className="text-red-500">*</span>
                                          </Label>
                                          <input
                                                className={inputStyle}
                                                name="name"
                                                defaultValue={doctorValue.name}
                                                onChange={handleOnChange}
                                                type="text"
                                                placeholder="Name"
                                          />
                                          <span className="text-red-500 text-sm ml-4">
                                                {errorMessage.name}
                                          </span>
                                    </div>
                                    <div className={inputContainer}>
                                          <Label>
                                                Experiences <span className="text-red-500">*</span>
                                          </Label>
                                          <input
                                                className={inputStyle}
                                                name="experiences"
                                                defaultValue={doctorValue.experiences}
                                                onChange={handleOnChange}
                                                type="text"
                                                placeholder="1 year 2 months"
                                          />
                                          <span className="text-red-500 text-sm ml-4">
                                                {errorMessage.experiences}
                                          </span>
                                    </div>
                              </div>
                              <div className={inputContainerTwo}>
                                    <div className={inputContainer}>
                                          <Label>
                                                Email <span className="text-red-500">*</span>
                                          </Label>
                                          <input
                                                className={inputStyle}
                                                name="email"
                                                defaultValue={doctorValue.email}
                                                onChange={handleOnChange}
                                                type="text"
                                                placeholder="Email"
                                          />
                                          <span className="text-red-500 text-sm ml-4">
                                                {errorMessage.email}
                                          </span>
                                    </div>
                                    <div className={inputContainer}>
                                          <Label>
                                                Gender <span className="text-red-500">*</span>
                                          </Label>
                                          <Select
                                                defaultValue={doctorValue.gender}
                                                onValueChange={(value) =>
                                                      setDoctorInputValue({
                                                            ...doctorInputValue,
                                                            gender: value,
                                                      })
                                                }
                                          >
                                                <SelectTrigger className={inputStyle}>
                                                      <SelectValue placeholder="Gender" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#fff]">
                                                      <SelectItem value="Male">Male</SelectItem>
                                                      <SelectItem value="Female">Female</SelectItem>
                                                </SelectContent>
                                          </Select>
                                          <span className="text-red-500 text-sm ml-4">
                                                {errorMessage.gender}
                                          </span>
                                    </div>
                              </div>
                              <div className="w-[80%]">
                                    <div className={inputContainer}>
                                          <Label>
                                                Specialist <span className="text-red-500">*</span>
                                          </Label>
                                          <Select
                                                defaultValue={doctorValue.specialist}
                                                onValueChange={(value) =>
                                                      setDoctorInputValue({
                                                            ...doctorInputValue,
                                                            specialist: value,
                                                      })
                                                }
                                          >
                                                <SelectTrigger className={inputStyle}>
                                                      <SelectValue placeholder="Specialist" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#fff]">
                                                      <SelectItem value="eyecare">Eye Care</SelectItem>
                                                      <SelectItem value="Gynecologist">Gynecologist</SelectItem>
                                                      <SelectItem value="Psychotherapist">
                                                            Psychotherapist
                                                      </SelectItem>
                                                      <SelectItem value="Orthopedic">Orthopedic</SelectItem>
                                                      <SelectItem value="Gasttologist">Gasttologist</SelectItem>
                                                      <SelectItem value="Urologist">Urologist</SelectItem>
                                                      <SelectItem value="Neurologist">Neurologist</SelectItem>
                                                </SelectContent>
                                          </Select>
                                          <span className="text-red-500 text-sm ml-4">
                                                {errorMessage.specialist}
                                          </span>
                                    </div>
                              </div>
                              <div className={inputContainer}>
                                    <Label>Your Bio Here</Label>
                                    <textarea
                                          className="mt-2 border w-[470px] h-24 px-4 py-2 rounded-[7px] border-gray-300 text-sm focus:outline-none focus:border-blue-500"
                                          placeholder="Bio:"
                                          name="bio"
                                          defaultValue={doctorValue.bio}
                                          onChange={handleOnChange}
                                    />
                              </div>
                              <Button
                                    className=" px-4 border mt-5 rounded-[7px] bg-blue-500 text-[#fff] hover:bg-blue-600"
                                    onClick={doctorUpdate}
                              >
                                    Update
                              </Button>
                        </div>
                  </div>
                  <DoctorDelete open={open} setOpen={() => setOpen(false)} doctorId={doctorId} />
                  <ToastContainer />
            </div>
      )
}

export default DoctorSetting