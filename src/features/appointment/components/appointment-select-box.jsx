import { Label } from "@/components/ui/label";
import {
      Select,
      SelectContent, SelectTrigger,
      SelectValue
} from "@/components/ui/select";

const AppointmentSelectBox = ({ label, placeholder, errorMessage, onValueChange, SelectItem, className }) => {
      return (
            <div className="flex flex-col">
                  <Label>{label} <span className='text-red-500'>*</span></Label>
                  <Select onValueChange={onValueChange} >
                        <SelectTrigger className={`border border-gray-300 w-48 h-10 px-3 rounded-[7px] mt-2 text-sm focus:outline-none focus:border-blue-500 ${className}`} >
                              <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#fff]">
                              {SelectItem}
                        </SelectContent>
                  </Select>
                  <span className="text-red-500 text-sm">{errorMessage}</span>
            </div>
      )
}

export default AppointmentSelectBox;