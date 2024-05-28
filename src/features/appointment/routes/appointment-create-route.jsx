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
import { useGetDoctorSlots } from '../api/doctor-slot-get-api';
import { queryClient } from '@/lib/react-query';
import { toast } from 'react-toastify';

const AppointmentCreateRoute = ({ open, setOpen, doctorData }) => {
      const [appointmentData, setAppointmentData] = useState({
            username: "",
            email: "",
            doctor: "",
            phone_number: "",
            slot: "",
            description: "",
            gender: "",
            age: ""
      });
      const [date, setDate] = useState();
      const [errorMessage, setErrorMessage] = useState({});
      const { data } = useGetDoctorSlots(appointmentData.doctor);
      const useCreateMutation = useAppointmentCreate();

      const inputStyle = "border border-gray-300 w-48 h-10 px-3 rounded-[7px] mt-2 text-sm focus:outline-none focus:border-blue-500";
      const inputContainer = "flex flex-col";
      const selectStyle = "w-48 rounded-[7px] mt-2 border-gray-300 focus:outline-none focus:border-blue-500";

      const checkCurrentDate = data?.data?.slots?.filter(item => item.start_date > new Date().toISOString());
      const changeIOSstring = checkCurrentDate?.map(item => {
            const startHour = new Date(item.start_date).getHours();
            const startMinute = new Date(item.start_date).getMinutes();
            const endHour = new Date(item.end_date).getHours();
            const endMinute = new Date(item.end_date).getMinutes();
            return {
                  startDate: (startHour < 10 ? '0' + startHour : startHour) + ':' + (startMinute < 10 ? '0' + startMinute : startMinute),
                  endDate: (endHour < 10 ? '0' + endHour : endHour) + ':' + (endMinute < 10 ? '0' + endMinute : endMinute),
                  date: new Date(item.end_date).toISOString().substring(0, 10),
                  id: item._id
            }
      });

      const getDate = changeIOSstring?.map(item => (item.date));
      const checkDate = changeIOSstring?.filter(item => date?.includes(item.date));

      // Output: array of hasDuplicate dates;
      const hasDuplicates = getDate?.filter((date, index, self) => self.indexOf(date) == index);
      const handleOnchange = (e) => {
            const { name, value } = e.target;
            setAppointmentData({ ...appointmentData, [name]: value })
      };

      const bookAppointment = async () => {
            const { message, key } = await createAppointmentValidate(appointmentData);
            setErrorMessage({ [key]: message });
            if (message) return;
            useCreateMutation.mutate(appointmentData, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['appointments']
                        })
                        setAppointmentData({})
                        toast('Appointment success!');
                        setOpen();
                  },
                  onError: (error) => {
                        console.log(error);
                  }
            });
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
                                          name='username'
                                          onChange={handleOnchange}
                                    />
                                    <span className="text-red-500 text-sm ml-4">{errorMessage.username}</span>
                              </div>
                              <div className='flex justify-between mt-5'>
                                    <div className={inputContainer}>
                                          <Label>Doctor <span className='text-red-500'>*</span></Label>
                                          <Select onValueChange={(value) => setAppointmentData({ ...appointmentData, doctor: value })} >
                                                <SelectTrigger className={selectStyle} >
                                                      <SelectValue
                                                            placeholder="Doctor"
                                                      />
                                                </SelectTrigger>

                                                <SelectContent className="bg-[#fff]">
                                                      {doctorData?.data?.map(item => (
                                                            <SelectItem key={item._id} value={item._id}>Dr.{item.name}</SelectItem>
                                                      ))}
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
                                                type="number"
                                                className={inputStyle}
                                                placeholder='Your Phone'
                                                name='phone_number'
                                                onChange={handleOnchange}
                                          />
                                          <span className="text-red-500 text-sm ml-4">{errorMessage.phone_number}</span>
                                    </div>
                              </div>
                              <div className='flex mt-5 justify-between mb-1'>
                                    <div className="flex flex-col">
                                          <Label>Date <span className='text-red-500'>*</span></Label>
                                          {!hasDuplicates?.length ?
                                                (
                                                      <Select onValueChange={(value) => setDate(value)} >
                                                            <SelectTrigger className="w-48 rounded-[7px] mt-2 border-gray-300 focus:outline-none focus:border-blue-500 cursor-not-allowed opacity-25" >
                                                                  <SelectValue
                                                                        placeholder="Date"
                                                                  />
                                                            </SelectTrigger>

                                                            <SelectContent className="bg-[#fff]">
                                                                  {hasDuplicates?.map(item => (
                                                                        <SelectItem key={item} value={item}>{item}</SelectItem>
                                                                  ))}
                                                            </SelectContent>
                                                      </Select>
                                                ) :
                                                (
                                                      <>
                                                            <Select onValueChange={(value) => setDate(value)}>
                                                                  <SelectTrigger className={selectStyle}>
                                                                        <SelectValue
                                                                              placeholder="Date" />
                                                                  </SelectTrigger>

                                                                  <SelectContent className="bg-[#fff]">
                                                                        {hasDuplicates?.map(item => (
                                                                              <SelectItem key={item} value={item}>{item}</SelectItem>
                                                                        ))}
                                                                  </SelectContent>
                                                            </Select>
                                                            <span className="text-red-500 text-sm ml-4">{errorMessage.date}</span>
                                                      </>

                                                )
                                          }
                                    </div>
                                    <div className={inputContainer}>
                                          <Label>Time <span className='text-red-500'>*</span></Label>
                                          {!checkDate?.length ?
                                                (<Select onValueChange={(value) => setAppointmentData({ ...appointmentData, slot: value })} name="time">
                                                      <SelectTrigger className="w-48 rounded-[7px] mt-2 border-gray-300 focus:outline-none focus:border-blue-500 cursor-not-allowed opacity-25">
                                                            <SelectValue
                                                                  placeholder="Time"
                                                                  name='slot'
                                                                  onChange={handleOnchange}
                                                            />
                                                      </SelectTrigger>
                                                      <SelectContent className="bg-[#fff]">
                                                      </SelectContent>
                                                </Select>)
                                                :

                                                (<>
                                                      <Select onValueChange={(value) => setAppointmentData({ ...appointmentData, slot: value })} name="time">
                                                            <SelectTrigger className="w-48 rounded-[7px] mt-2 border-gray-300 focus:outline-none focus:border-blue-500">
                                                                  <SelectValue
                                                                        placeholder="Time"
                                                                        name='slot'
                                                                        onChange={handleOnchange} />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-[#fff]">
                                                                  {checkDate?.map(item => (
                                                                        <SelectItem key={item.id} value={item.id}>{item.startDate} - {item.endDate}</SelectItem>
                                                                  ))}
                                                            </SelectContent>
                                                      </Select><span className="text-red-500 text-sm ml-4">{errorMessage.slot}</span>
                                                </>)
                                          }
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
                              <div className={inputContainer}>
                                    <Label>Your Age <span className='text-red-500'>*</span><span className='text-red-500'></span></Label>
                                    <input
                                          type="number"
                                          className={inputStyle}
                                          placeholder='Your Age'
                                          name='age'
                                          onChange={handleOnchange}
                                    />
                                    <span className="text-red-500 text-sm ml-4">{errorMessage.age}</span>
                              </div>
                              <div className='mt-5'>
                                    <Label>Comments</Label>
                                    <textarea
                                          className='border w-full mt-2 h-32 px-4 py-2 rounded-[7px] border-gray-300 text-sm focus:outline-none focus:border-blue-500'
                                          placeholder='Your Message:'
                                          name='description'
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

export default AppointmentCreateRoute;
