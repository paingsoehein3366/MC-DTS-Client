import React from 'react';
import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AppointmentCreateRoute from './appointment-create-route';
import EyeIcon from '../components/eye-icon';
import { PatientProfile } from './patient-profile';
import DeleteIcon from '../components/delete-icon';
import AppointmentDeleteRoute from './appointment-delete-route';
import { useGetAllAppointments } from '../api/appointment-get-api';
import { useGetAllDoctors } from '@/features/doctor/api/get-all-doctors-api';
import { ToastContainer } from 'react-toastify';
import UpdateIcon from '@/components/icons/update-icon';
import AppointmentUpdateRoute from './appointment-update-route';

const AppointmentListRoute = () => {
      const [patientData, setPatientData] = useState();
      const [patientDate, setPatientDate] = useState();
      const [openAppointment, setOpenAppointment] = useState(false);
      const [patientProfileOpen, setPatientProfileOpen] = useState(false);
      const [patientDeleteOpen, setPatientDeleteOpen] = useState(false);
      const [patientUpdateOpen, setPatientUpdateOpen] = useState(false);
      const [appointmentId, setAppointmentId] = useState();
      const { data } = useGetAllAppointments();
      const { data: DoctorData } = useGetAllDoctors();
      console.log("Data: ", data?.data);
      // appointments/doctorId/
      return (
            <div>
                  <div className="flex justify-end gap-3 mb-3">
                        <Select>
                              <SelectTrigger className="w-[180px] rounded-[7px] focus:outline-none focus:border-blue-400 border-gray-300">
                                    <SelectValue placeholder="Today" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#fff]">
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="dark">Tomorrow</SelectItem>
                                    <SelectItem value="system">Yesterday</SelectItem>
                              </SelectContent>
                        </Select>
                        <Button
                              className="rounded bg-[#386cf0] text-[#fff] hover:bg-[#668ae3] active:bg-[#386cf0] px-14"
                              onClick={() => setOpenAppointment(true)}
                        >Appointment</Button>
                  </div>
                  <Table>
                        <TableHeader className="">
                              <TableRow>
                                    <TableHead className="">Name</TableHead>
                                    <TableHead className="">Email</TableHead>
                                    <TableHead className="">Age</TableHead>
                                    <TableHead className="">Date</TableHead>
                                    <TableHead className="">Time</TableHead>
                                    <TableHead className="">Doctor</TableHead>
                                    <TableHead className="">Fees</TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              {data?.data?.data?.map(item => {
                                    const startHour = new Date(item?.slot?.start_date).getHours();
                                    const startMinute = new Date(item?.slot?.start_date).getMinutes();
                                    const endHour = new Date(item?.slot?.end_date).getHours();
                                    const endMinute = new Date(item?.slot?.end_date).getMinutes();
                                    const startDate = (startHour < 10 ? '0' + startHour : startHour) + ':' + (startMinute < 10 ? '0' + startMinute : startMinute);
                                    const endDate = (endHour < 10 ? '0' + endHour : endHour) + ':' + (endMinute < 10 ? '0' + endMinute : endMinute);
                                    const date = new Date(item?.slot?.end_date).toISOString().substring(0, 10)
                                    return (
                                          <TableRow>
                                                <TableCell className="">{item?.username}</TableCell>
                                                <TableCell className="">{item.email}</TableCell>
                                                <TableCell className="">{item.age}</TableCell>
                                                <TableCell className="">{date}</TableCell>
                                                <TableCell className="">{startDate} : {endDate}</TableCell>
                                                <TableCell className="">Dr.{item?.doctor?.name}</TableCell>
                                                <TableCell className="">$250.00</TableCell>
                                                <Button
                                                      className="w-8 h-8 text-green-500 hover:bg-green-400 rounded-[20px] hover:text-white p-1"
                                                      onClick={() => {
                                                            setPatientProfileOpen(true);
                                                            setPatientData({ name: item.username, email: item.email, age: item.age, date: date, startDate, endDate, gender: item.gender })
                                                      }}
                                                >
                                                      <EyeIcon />
                                                </Button>
                                                <Button
                                                      className="text-blue-400 hover:bg-blue-400 rounded-[20px] hover:text-white p-1 w-8 h-8"
                                                      onClick={() => {
                                                            setPatientUpdateOpen(true);
                                                            setPatientDate({ date, time: `${startDate}:${endDate}` });
                                                            setPatientData(item);
                                                      }}
                                                >
                                                      <UpdateIcon />
                                                </Button>
                                                <Button
                                                      className="p-2"
                                                      onClick={() => {
                                                            setPatientDeleteOpen(true);
                                                            setAppointmentId(item.id)
                                                      }}
                                                >
                                                      <DeleteIcon />
                                                </Button>
                                          </TableRow>
                                    )
                              })}
                        </TableBody>
                  </Table>
                  <AppointmentCreateRoute open={openAppointment} setOpen={() => setOpenAppointment(false)} doctorData={DoctorData} />
                  <PatientProfile open={patientProfileOpen} setOpen={() => setPatientProfileOpen(false)} patientData={patientData} />
                  <AppointmentDeleteRoute open={patientDeleteOpen} setOpen={() => setPatientDeleteOpen(false)} appointmentId={appointmentId} />
                  <AppointmentUpdateRoute open={patientUpdateOpen} setOpen={() => setPatientUpdateOpen(false)} patientData={patientData} doctorData={DoctorData} patientDate={patientDate} />
                  <ToastContainer />
            </div>
      )
}

export default AppointmentListRoute