import {
      AlertDialog,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogHeader,
      AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { queryClient } from "@/lib/react-query";
import { toast } from "react-toastify";
import { useAppointmentDelete } from "../api/appointment-delete-api";
import DeleteIcon from "../components/delete-icon"

export default function AppointmentDeleteRoute({ open, setOpen, appointmentId }) {
      const useAppointmentDeleteMutation = useAppointmentDelete();
      const AppointmentDelete = () => {
            useAppointmentDeleteMutation.mutate(appointmentId, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['appointments']
                        })
                        toast('Appointment delete success!')
                        setOpen();
                  },
                  onError: (err) => {
                        console.log("Error: ", err.message);
                  }
            })
      }
      return (
            <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogContent className="bg-[#fff] flex flex-col text-center rounded w-[450px]">
                        <AlertDialogHeader>
                              <div className=" h-20 flex items-center justify-center my-7">
                                    <div className="flex justify-center items-center bg-red-100 p-4 rounded-[50%]">
                                          <div className="h-12 rounded-full">
                                                <DeleteIcon />
                                          </div>
                                    </div>
                              </div>
                              <AlertDialogTitle className="text-2xl flex justify-center">Cancel Appointment</AlertDialogTitle>
                              <AlertDialogDescription className="flex justify-center text-center text-[17px] text-gray-500">
                                    Great doctor if you need your family member to get
                                    immediate assistance, emergency treatment
                              </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex justify-around my-5">
                              <Button className="border rounded border-gray-400" onClick={setOpen}>Cancel</Button>
                              <Button className="rounded bg-red-500 text-[#fff] hover:bg-red-400 active:bg-red-500" onClick={AppointmentDelete}>Remove</Button>
                        </div>
                  </AlertDialogContent>
            </AlertDialog>
      )
}
