import React from 'react';
import {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAppointmentCreate } from '../api';
import { createAppointmentValidate } from '../schema/appointment-create-schema';

const AppointmentCreateRoute = ({ open, setOpen }) => {
      const [appointmentData, setAppointmentData] = useState({
            name: "",
            email: "",
            doctor: "",
            phone: "",
            time: "",
            date: "",
            comments: "",
            gender: ""
      });
      const [errorMessage, setErrorMessage] = useState({})
      const createMutation = useAppointmentCreate();

      const inputStyle = "border border-gray-300 w-48 h-10 px-3 rounded-[7px] mt-2 text-sm focus:outline-none focus:border-blue-500";
      const inputContainer = "flex flex-col";
      const selectStyle = "w-48 rounded-[7px] mt-2 border-gray-300 focus:outline-none focus:border-blue-500";

      const handleOnchange = (e) => {
            const { name, value } = e.target;
            setAppointmentData({ ...appointmentData, [name]: value })
      };

      const bookAppointment = async () => {
            const { message, key } = await createAppointmentValidate(appointmentData);
            setErrorMessage({ [key]: message });
            if (message) return;
            const checkTime = appointmentData.time.split('-');
            const startTime = parseInt(checkTime[0]);
            const endTime = parseInt(checkTime[1]);
            const date = appointmentData.date;
            const setHourStartTime = new Date(date).setHours(startTime);
            const startDate = new Date(setHourStartTime).toISOString();
            const setHourEndTime = new Date(date).setHours(endTime);
            const endDate = new Date(setHourEndTime).toISOString();
            const data = { name: appointmentData.name, email: appointmentData.email, doctor: appointmentData.doctor, phone: appointmentData.phone, startDate, endDate, comments: appointmentData.comments, gender: appointmentData.gender }
            // createMutation.mutate(data, {
            //       onSuccess: () => {
            //             setOpen()
            //       },
            //       onError: (error) => {
            //             window.alert(error.message)
            //       }
            // })
            setOpen();
      };
      return (
            <Dialog open={open} onOpenChange={setOpen} >
                  <DialogContent className="bg-[#fff] sm:max-w-[750px] px-10 py-8">
                        <DialogHeader>
                              <DialogTitle className="mb-5 font-sans text-xl text-[#4c4b4b]">Book an Appointment</DialogTitle>
                              <div className='w-full bg-gray-400 h-[1px]'></div>
                        </DialogHeader>
                        <div>
                              <div className='mt-3'>
                                    <Label>Patient Name <span className='text-red-500'>*</span></Label>
                                    <input
                                          type="text"
                                          className='border w-full h-10 px-4 border-gray-300 rounded-[7px] mt-2 text-sm focus:outline-none focus:border-blue-400'
                                          placeholder='Patient Name:'
                                          name='name'
                                          onChange={handleOnchange}
                                    />
                                    <span className="text-red-500 text-sm ml-4">{errorMessage.name}</span>
                              </div>
                              <div className='flex justify-between mt-5'>
                                    <div className={inputContainer}>
                                          <Label>Doctor <span className='text-red-500'>*</span></Label>
                                          <Select onValueChange={(value) => setAppointmentData({ ...appointmentData, doctor: value })} >
                                                <SelectTrigger className={selectStyle} >
                                                      <SelectValue
                                                            placeholder="Dr.Paing"
                                                      />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#fff]">
                                                      <SelectItem value="paing">Dr.Paing</SelectItem>
                                                      <SelectItem value="soe">Dr.Soe</SelectItem>
                                                      <SelectItem value="hein">Dr.Hein</SelectItem>
                                                </SelectContent>
                                          </Select>
                                          <span className="text-red-500 text-sm ml-4">{errorMessage.doctor}</span>
                                    </div>
                                    <div className={inputContainer}>
                                          <Label>Your Email </Label>
                                          <input
                                                type="text"
                                                className={inputStyle}
                                                placeholder='Your Email'
                                                name='email'
                                                onChange={handleOnchange}
                                          />
                                          <span className="text-red-500 text-sm ml-4">{errorMessage.email}</span>
                                    </div>
                                    <div className={inputContainer}>
                                          <Label>Your Phone <span className='text-red-500'>*</span><span className='text-red-500'></span></Label>
                                          <input
                                                type="text"
                                                className={inputStyle}
                                                placeholder='Your Phone'
                                                name='phone'
                                                onChange={handleOnchange}
                                          />
                                          <span className="text-red-500 text-sm ml-4">{errorMessage.phone}</span>
                                    </div>
                              </div>
                              <div className='flex mt-5 justify-between'>
                                    <div className={inputContainer}>
                                          <Label>Time <span className='text-red-500'>*</span></Label>
                                          <Select onValueChange={(value) => setAppointmentData({ ...appointmentData, time: value })} name="time">
                                                <SelectTrigger className={selectStyle}>
                                                      <SelectValue
                                                            placeholder="10:00AM - 11:00AM"
                                                            name='Time'
                                                            onChange={handleOnchange}
                                                      />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#fff]">
                                                      <SelectItem value="10:00 - 11:00">10:00AM - 11:00AM</SelectItem>
                                                      <SelectItem value="12:00 - 13:00">12:00PM - 13:00PM</SelectItem>
                                                </SelectContent>
                                          </Select>
                                          <span className="text-red-500 text-sm ml-4">{errorMessage.time}</span>
                                    </div>
                                    <div className="flex flex-col">
                                          <Label>Date <span className='text-red-500'>*</span></Label>
                                          <input
                                                type="date"
                                                className={inputStyle}
                                                placeholder=''
                                                name='date'
                                                onChange={handleOnchange}
                                          />
                                          <span className="text-red-500 text-sm ml-4">{errorMessage.date}</span>
                                    </div>
                                    <div className={inputContainer}>
                                          <Label>Gender <span className='text-red-500'>*</span></Label>
                                          <Select onValueChange={(value) => setAppointmentData({ ...appointmentData, gender: value })}>
                                                <SelectTrigger className={inputStyle} >
                                                      <SelectValue
                                                            placeholder="Gender"
                                                      />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#fff]">
                                                      <SelectItem value="Male">Male</SelectItem>
                                                      <SelectItem value="Female">Female</SelectItem>
                                                </SelectContent>
                                          </Select>
                                          <span className="text-red-500 text-sm ml-4">{errorMessage.gender}</span>
                                    </div>
                              </div>
                              <div className='mt-5'>
                                    <Label>Comments</Label>
                                    <textarea
                                          className='border w-full mt-2 h-32 px-4 py-2 rounded-[7px] border-gray-300 text-sm focus:outline-none focus:border-blue-500'
                                          placeholder='Your Message:'
                                          name='comments'
                                          onChange={handleOnchange}
                                    ></textarea>
                              </div>
                              <DialogFooter>
                                    <Button
                                          className="bg-[#386cf0] text-[#fff] w-full mt-6 rounded-[7px] hover:bg-[#7497f1] active:bg-[#386cf0]"
                                          onClick={bookAppointment}
                                    >Book An Appointment</Button>
                              </DialogFooter>
                        </div>
                  </DialogContent>

            </Dialog >

      )
}

export default AppointmentCreateRoute
