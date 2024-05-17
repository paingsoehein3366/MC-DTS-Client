import React from 'react';
import {
      Table,
      TableBody,
      TableCaption,
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

const AppointmentListRoute = () => {
      const [openAppointment, setOpenAppointment] = useState(false);
      const [patientProfileOpen, setPatientProfileOpen] = useState(false);
      const [patientDeleteOpen, setPatientDeleteOpen] = useState(false);
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
                              <TableRow>
                                    <TableCell className="">INV001</TableCell>
                                    <TableCell className="">paid@email.com</TableCell>
                                    <TableCell className="">30</TableCell>
                                    <TableCell className="">2/2/24</TableCell>
                                    <TableCell className="">1:00PM-2:00PM</TableCell>
                                    <TableCell className="">Dr.Paing</TableCell>
                                    <TableCell className="">$250.00</TableCell>
                                    <Button onClick={() => setPatientProfileOpen(true)}><EyeIcon /></Button>
                                    <Button onClick={() => setPatientDeleteOpen(true)}><DeleteIcon /></Button>
                              </TableRow>
                        </TableBody>
                  </Table>
                  <AppointmentCreateRoute open={openAppointment} setOpen={() => setOpenAppointment(false)} />
                  <PatientProfile open={patientProfileOpen} setOpen={() => setPatientProfileOpen(false)} />
                  <AppointmentDeleteRoute open={patientDeleteOpen} setOpen={() => setPatientDeleteOpen(false)} />
            </div>
      )
}

export default AppointmentListRoute