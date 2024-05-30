import React from 'react';
import {
      Dialog,
      DialogContent,
      DialogFooter,
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
import { useEffect } from 'react';
import AppointmentCreateInputTag from '../components/appointment-create-input-tag';
import AppointmentSelectBox from '../components/appointment-select-box';
import dayjs from 'dayjs';

const AppointmentUpdateRoute = ({ open, setOpen, patientData, doctorData, patientDate }) => {
      const [appointmentData, setAppointmentData] = useState(patientData);
      const [date, setDate] = useState();
      const [errorMessage, setErrorMessage] = useState({});

      const { data } = useGetDoctorSlots(appointmentData?.doctor);
      const useAppointmentUpdateMutation = useAppointmentUpdate();

      const checkCurrentDate = data?.data?.slots?.filter(item => item.start_date > new Date().toISOString());

      const changeIOSstring = checkCurrentDate?.map(item => {
            return {
                  startDate: dayjs(item.start_date).format('HH:mm'),
                  endDate: dayjs(item.end_date).format('HH:mm'),
                  date: new Date(item.end_date).toISOString().substring(0, 10),
                  id: item._id
            }
      });
      const checkDate = changeIOSstring?.filter(item => date?.includes(item.date));

      // Output: array of hasDuplicate dates
      const getDate = changeIOSstring?.map(item => (item.date));
      const hasDuplicates = getDate?.filter((date, index, self) => self.indexOf(date) == index);

      const handleOnchange = (e) => {
            const { name, value } = e.target;
            setAppointmentData({ ...appointmentData, [name]: value })
      };
      const appointmentUpdate = async () => {
            if (appointmentData.doctor) {
                  if (!appointmentData.slot) {
                        return toast("Enter Date and Time");
                  }
            };
            useAppointmentUpdateMutation.mutate({ id: patientData?._id, data: appointmentData }, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['appointments']
                        })
                        toast('Appointment update success!')
                        setOpen();
                        setAppointmentData()
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
                                    <AppointmentCreateInputTag
                                          label="Patient Name"
                                          handleOnchange={handleOnchange}
                                          name='username'
                                          placeholder="Patient Name"
                                          errorMessage={errorMessage?.username}
                                          className={'w-full'}
                                          defaultValue={patientData?.username}
                                    />
                                    <div className='flex justify-between mt-5'>
                                          <AppointmentSelectBox
                                                label="Doctor"
                                                placeholder={patientData?.doctor?.name}
                                                errorMessage={errorMessage?.doctor}
                                                onValueChange={(value) => setAppointmentData({ ...appointmentData, doctor: value })}
                                                SelectItem={
                                                      doctorData?.data?.map(item => (
                                                            <SelectItem key={item._id} value={item._id}>Dr.{item.name}</SelectItem>
                                                      ))
                                                }
                                          />
                                          <AppointmentCreateInputTag
                                                label="Your Email"
                                                handleOnchange={handleOnchange}
                                                name='email'
                                                placeholder="Your Email"
                                                errorMessage={errorMessage?.email}
                                                className={'w-48'}
                                                defaultValue={patientData?.email}
                                          />
                                          <AppointmentCreateInputTag
                                                label="Your Phone"
                                                handleOnchange={handleOnchange}
                                                name='phone_number'
                                                placeholder="Your Phone"
                                                errorMessage={errorMessage?.phone_number}
                                                className={'w-48'}
                                                defaultValue={patientData?.phone_number}
                                          />
                                    </div>
                                    <div className='flex mt-5 justify-between mb-1'>
                                          <AppointmentSelectBox
                                                label="Date"
                                                placeholder={appointmentData?.doctor ? "Date" : `${patientDate?.date}`}
                                                errorMessage={errorMessage?.date}
                                                onValueChange={(value) => setDate(value)}
                                                SelectItem={
                                                      hasDuplicates?.map(item => (
                                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                                      ))
                                                }
                                          />
                                          <AppointmentSelectBox
                                                label="Time"
                                                placeholder={appointmentData?.doctor ? "Time" : `${patientDate?.time}`}
                                                errorMessage={errorMessage?.slot}
                                                onValueChange={(value) => setAppointmentData({ ...appointmentData, slot: value })}
                                                SelectItem={
                                                      checkDate?.map(item => (
                                                            <SelectItem key={item.id} value={item.id}>{item.startDate} - {item.endDate}</SelectItem>
                                                      ))
                                                }
                                          />
                                          <AppointmentSelectBox
                                                label="Gender"
                                                placeholder={patientData?.gender}
                                                errorMessage={errorMessage?.gender}
                                                className="mb-3"
                                                onValueChange={(value) => setAppointmentData({ ...appointmentData, gender: value })}
                                                SelectItem={<>
                                                      <SelectItem value="Male">Male</SelectItem>
                                                      <SelectItem value="Female">Female</SelectItem>
                                                </>}
                                          />
                                    </div>
                                    <AppointmentCreateInputTag
                                          label="Your Age"
                                          handleOnchange={handleOnchange}
                                          name='age'
                                          defaultValue={patientData?.age}
                                          errorMessage={errorMessage?.age}
                                          className={'w-48'}
                                    />
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
                        <DialogFooter>
                              <div className="flex justify-around my-5 w-full">
                                    <Button className="border rounded border-gray-400" onClick={setOpen}>Cancel</Button>
                                    <Button className="rounded bg-blue-500 text-[#fff] hover:bg-blue-400" onClick={appointmentUpdate}>Update</Button>
                              </div>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      )
};
export default AppointmentUpdateRoute
