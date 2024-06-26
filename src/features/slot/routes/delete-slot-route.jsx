
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { queryClient } from "@/lib/react-query";
import { toast } from "react-toastify";
import { useDeleteSlot } from "../api/delete-slot-api";

export default function SlotDelete({ open, setOpen, slotId }) {
      const useDeleteSlotMutation = useDeleteSlot();
      const slotDelete = () => {
            useDeleteSlotMutation.mutate(slotId, {
                  onSuccess: () => {
                        queryClient.invalidateQueries({
                              queryKey: ['slots']
                        })
                        toast.success('Slot remove success')
                  },
                  onError: (err) => {
                        console.log("Error: ", err.message);
                  }
            })
            setOpen();
      };
      return (
            <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="bg-white w-[350px]">
                        <DialogTitle className='text-gray-600 flex justify-center'>Are you sure this slot remove?</DialogTitle>
                        <div className="flex justify-around my-5">
                              <Button className="border rounded border-gray-400" onClick={setOpen}>Cancel</Button>
                              <Button className="rounded bg-red-500 text-[#fff] hover:bg-red-400 active:bg-red-500" onClick={slotDelete}>Remove</Button>
                        </div>
                  </DialogContent>
            </Dialog>
      )
};
