import { Button } from '@/components/ui/button';
import {
      Dialog,
      DialogContent,
      DialogFooter,
      DialogHeader,
      DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
      SelectItem
} from "@/components/ui/select";
import { queryClient } from '@/lib/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppointmentCreate } from '../api';
import { useGetDoctorSlots } from '../api/doctor-slot-get-api';
import AppointmentCreateInputTag from '../components/appointment-create-input-tag';
import AppointmentSelectBox from '../components/appointment-select-box';
import { createAppointmentValidate } from '../schema/appointment-create-schema';

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

      const checkCurrentDate = data?.data?.slots?.filter(item => item.start_date >= new Date().toISOString());

      const changeIOSstring = checkCurrentDate?.map(item => {
            return {
                  startDate: dayjs(item.start_date).format('HH:mm'),
                  endDate: dayjs(item.end_date).format('HH:mm'),
                  date: new Date(item.end_date).toISOString().substring(0, 10),
                  id: item._id
            }
      });
      const checkDate = changeIOSstring?.filter(item => date?.includes(item.date));

      // Output: array of hasDuplicate dates;
      const getDate = changeIOSstring?.map(item => (item.date));
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
                              <AppointmentCreateInputTag
                                    label="Patient Name"
                                    handleOnchange={handleOnchange}
                                    name='username'
                                    placeholder="Patient Name"
                                    errorMessage={errorMessage.username}
                                    className={'w-full'}
                              />
                              <div className='flex justify-between mt-5'>
                                    <AppointmentSelectBox
                                          label="Doctor"
                                          placeholder="Doctor"
                                          errorMessage={errorMessage.doctor}
                                          onValueChange={(value) => setAppointmentData({ ...appointmentData, doctor: value })}
                                          SelectItem={
                                                doctorData?.data?.map(item => (
                                                      <SelectItem key={item._id} value={item._id}>Dr.{item.name}</SelectItem>
                                                ))
                                          }
                                    />
                                    <AppointmentCreateInputTag label="YourEmail" handleOnchange={handleOnchange} name='email' placeholder="Your Email" errorMessage={errorMessage.email} className={'w-48'} />
                                    <AppointmentCreateInputTag label="Your Phone" handleOnchange={handleOnchange} name='phone_number' placeholder="Your Photo" errorMessage={errorMessage.phone_number} className={'w-48'} />
                              </div>
                              <div className='flex mt-5 justify-between mb-1'>
                                    <AppointmentSelectBox
                                          label="Date"
                                          placeholder="Date"
                                          errorMessage={errorMessage.date}
                                          onValueChange={(value) => setDate(value)}
                                          className={!hasDuplicates?.length ? "cursor-not-allowed opacity-25" : ""}
                                          SelectItem={
                                                hasDuplicates?.map(item => (
                                                      <SelectItem key={item} value={item}>{item}</SelectItem>
                                                ))
                                          }
                                    />
                                    <AppointmentSelectBox
                                          label="Time"
                                          placeholder="Time"
                                          errorMessage={errorMessage.slot}
                                          className={!checkDate?.length ? "cursor-not-allowed opacity-25" : ""}
                                          onValueChange={(value) => setAppointmentData({ ...appointmentData, slot: value })}
                                          SelectItem={
                                                checkDate?.map(item => (
                                                      <SelectItem key={item.id} value={item.id}>{item.startDate} - {item.endDate}</SelectItem>
                                                ))
                                          }
                                    />
                                    <AppointmentSelectBox
                                          label="Gender"
                                          placeholder="Gender"
                                          errorMessage={errorMessage.gender}
                                          className="mb-3"
                                          onValueChange={(value) => setAppointmentData({ ...appointmentData, gender: value })}
                                          SelectItem={<>
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                          </>}
                                    />
                              </div>
                              <AppointmentCreateInputTag label="Your Age" handleOnchange={handleOnchange} name='age' placeholder="Your Age" errorMessage={errorMessage.age} className="w-48" />
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
                                    >
                                          Book An Appointment
                                    </Button>
                              </DialogFooter>
                        </div>
                  </DialogContent>
            </Dialog >

      )
}

export default AppointmentCreateRoute;
