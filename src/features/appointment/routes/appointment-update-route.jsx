import React from 'react';
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import { useGetDoctorSlots } from '../api/doctor-slot-get-api';
import { useAppointmentUpdate } from '../api';
import { queryClient } from '@/lib/react-query';
import { toast } from 'react-toastify';

const AppointmentUpdateRoute = ({ open, setOpen, patientData, doctorData, patientDate }) => {
      console.log("patientData: ", patientData);
      const [appointmentData, setAppointmentData] = useState(patientData);
      const [date, setDate] = useState();
      const [errorMessage, setErrorMessage] = useState(patientData);
      console.log("errormessage: ", errorMessage);

      const inputStyle = "border border-gray-300 w-48 h-10 px-3 rounded-[7px] mt-2 text-sm focus:outline-none focus:border-blue-500";
      const inputContainer = "flex flex-col";
      const selectStyle = "w-48 rounded-[7px] mt-2 border-gray-300 focus:outline-none focus:border-blue-500";

      const { data } = useGetDoctorSlots(appointmentData?.doctor);
      const useAppointmentUpdateMutation = useAppointmentUpdate();

      const changeIOSstring = data?.data?.slots?.map(item => {
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
      // Output: array of hasDuplicate dates
      const hasDuplicates = getDate?.filter((date, index, self) => self.indexOf(date) == index);


      const handleOnchange = (e) => {
            const { name, value } = e.target;
            setAppointmentData({ ...appointmentData, [name]: value })
      };
      const appointmentUpdate = async () => {
            console.log("updateData: ", { id: patientData?._id, appointmentData });
            useAppointmentUpdateMutation.mutate({ id: patientData?._id, data: appointmentData }, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['appointments']
                        })
                        setAppointmentData({})
                        toast('Appointment update success!')
                        setOpen();
                  },
                  onError: (err) => {
                        console.log("Error: ", err);
                        setAppointmentData({})
                  }
            })
      };
      return (
            <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="bg-[#fff] flex flex-col text-center sm:max-w-[750px]">
                        <DialogHeader>
                              <DialogTitle className="mb-5 font-sans text-xl text-[#4c4b4b]">Update an Appointment</DialogTitle>
                              <div className='w-full bg-gray-400 h-[1px]'></div>                              <div>
                                    <div className='mt-3'>
                                          <Label>Patient Name <span className='text-red-500'>*</span></Label>
                                          <input
                                                type="text"
                                                className='border w-full h-10 px-4 border-gray-300 rounded-[7px] mt-2 text-sm focus:outline-none focus:border-blue-400'
                                                placeholder='Patient Name:'
                                                name='username'
                                                defaultValue={patientData?.username}
                                                onChange={handleOnchange}
                                          />
                                          <span className="text-red-500 text-sm ml-4">{errorMessage?.username}</span>
                                    </div>
                                    <div className='flex justify-between mt-5'>
                                          <div className={inputContainer}>
                                                <Label>Doctor <span className='text-red-500'>*</span></Label>
                                                <Select onValueChange={(value) => setAppointmentData({ ...appointmentData, doctor: value })} >
                                                      <SelectTrigger className={selectStyle} >
                                                            <SelectValue
                                                                  placeholder={patientData?.doctor?.name}
                                                            />
                                                      </SelectTrigger>

                                                      <SelectContent className="bg-[#fff]">
                                                            {doctorData?.data?.map(item => (
                                                                  <SelectItem key={item._id} value={item._id}>Dr.{item.name}</SelectItem>
                                                            ))}
                                                      </SelectContent>
                                                </Select>
                                                <span className="text-red-500 text-sm ml-4">{errorMessage?.doctor}</span>
                                          </div>
                                          <div className={inputContainer}>
                                                <Label>Your Email </Label>
                                                <input
                                                      type="text"
                                                      className={inputStyle}
                                                      placeholder='Your Email'
                                                      name='email'
                                                      defaultValue={patientData?.email}
                                                      onChange={handleOnchange}
                                                />
                                                <span className="text-red-500 text-sm ml-4">{errorMessage?.email}</span>
                                          </div>
                                          <div className={inputContainer}>
                                                <Label>Your Phone <span className='text-red-500'>*</span><span className='text-red-500'></span></Label>
                                                <input
                                                      type=""
                                                      className={inputStyle}
                                                      placeholder='Your Phone'
                                                      name='phone_number'
                                                      defaultValue={patientData?.phone_number}
                                                      onChange={handleOnchange}
                                                />
                                                <span className="text-red-500 text-sm ml-4">{errorMessage?.phone_number}</span>
                                          </div>
                                    </div>
                                    <div className='flex mt-5 justify-between mb-1'>
                                          <div className="flex flex-col">
                                                <Label>Date <span className='text-red-500'>*</span></Label>
                                                <Select onValueChange={(value) => setDate(value)} >
                                                      <SelectTrigger className={selectStyle} >
                                                            <SelectValue
                                                                  placeholder={patientDate?.date}
                                                            />
                                                      </SelectTrigger>

                                                      <SelectContent className="bg-[#fff]">
                                                            {hasDuplicates?.map(item => (
                                                                  <SelectItem key={item} value={item}>{item}</SelectItem>
                                                            ))}
                                                      </SelectContent>
                                                </Select>
                                                <span className="text-red-500 text-sm ml-4">{errorMessage?.date}</span>
                                          </div>
                                          <div className={inputContainer}>
                                                <Label>Time <span className='text-red-500'>*</span></Label>
                                                <Select onValueChange={(value) => setAppointmentData({ ...appointmentData, slot: value })} name="time">
                                                      <SelectTrigger className={selectStyle}>
                                                            <SelectValue
                                                                  placeholder={patientDate?.time}
                                                                  name='slot'
                                                                  onChange={handleOnchange}
                                                            />
                                                      </SelectTrigger>
                                                      <SelectContent className="bg-[#fff]">
                                                            {checkDate?.map(item => (
                                                                  <SelectItem key={item} value={item.id}>{item.startDate} - {item.endDate}</SelectItem>
                                                            ))}
                                                      </SelectContent>
                                                </Select>
                                                <span className="text-red-500 text-sm ml-4">{errorMessage?.slot}</span>
                                          </div>
                                          <div className={inputContainer}>
                                                <Label>Gender <span className='text-red-500'>*</span></Label>
                                                <Select onValueChange={(value) => setAppointmentData({ ...appointmentData, gender: value })}>
                                                      <SelectTrigger className={inputStyle} >
                                                            <SelectValue
                                                                  placeholder={patientData?.gender}
                                                            />
                                                      </SelectTrigger>
                                                      <SelectContent className="bg-[#fff]">
                                                            <SelectItem value="Male">Male</SelectItem>
                                                            <SelectItem value="Female">Female</SelectItem>
                                                      </SelectContent>
                                                </Select>
                                                <span className="text-red-500 text-sm ml-4">{errorMessage?.gender}</span>
                                          </div>
                                    </div>
                                    <div className={inputContainer}>
                                          <Label>Your Age <span className='text-red-500'>*</span><span className='text-red-500'></span></Label>
                                          <input
                                                type=""
                                                className={inputStyle}
                                                placeholder='Your Age'
                                                name='age'
                                                defaultValue={patientData?.age}
                                                onChange={handleOnchange}
                                          />
                                          <span className="text-red-500 text-sm ml-4">{errorMessage?.age}</span>
                                    </div>
                                    <div className='mt-5'>
                                          <Label>Comments</Label>
                                          <textarea
                                                className='border w-full mt-2 h-32 px-4 py-2 rounded-[7px] border-gray-300 text-sm focus:outline-none focus:border-blue-500'
                                                placeholder='Your Message:'
                                                name='description'
                                                defaultValue={patientData?.description}
                                                onChange={handleOnchange}
                                          ></textarea>
                                    </div>
                              </div>
                        </DialogHeader>
                        <div className="flex justify-around my-5">
                              <Button className="border rounded border-gray-400" onClick={setOpen}>Cancel</Button>
                              <Button className="rounded bg-blue-500 text-[#fff] hover:bg-blue-400 active:bg-red-500" onClick={appointmentUpdate}>Update</Button>
                        </div>
                  </DialogContent>
            </Dialog>
      )
};
export default AppointmentUpdateRoute
