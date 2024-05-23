import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React from 'react'
import { useDoctorDelete } from '../api/doctor-delete-api';
import { queryClient } from '@/lib/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DoctorDelete = ({ open, setOpen, doctorId }) => {
      const navigate = useNavigate()
      const useDoctorDeleteMutauion = useDoctorDelete();
      const doctorDelete = () => {
            useDoctorDeleteMutauion.mutate(doctorId, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['doctors']
                        });
                        navigate('/');
                        toast('Doctor delete success!');
                        setOpen();
                  },
                  onError: (err) => {
                        console.log("Error: ", err);
                  }
            })
      };
      return (
            <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="bg-white w-[350px]">
                        <DialogTitle className='text-gray-600 flex justify-center'>Are you sure this doctor remove?</DialogTitle>
                        <div className="flex justify-around my-5">
                              <Button className="border rounded border-gray-400" onClick={setOpen}>Cancel</Button>
                              <Button className="rounded bg-red-500 text-[#fff] hover:bg-red-400 active:bg-red-500" onClick={doctorDelete}>Remove</Button>
                        </div>
                  </DialogContent>
            </Dialog>
      )
}

export default DoctorDelete