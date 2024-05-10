
import { Button } from "@/components/ui/button";
import {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableFooter,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const invoices = [
      {
            Name: "INV001",
            Email: "Paid",
            Exprience: "$250.00",
            SpecialLife: "Credit Card",
      },
      {
            Name: "INV002",
            Email: "Pending",
            Exprience: "$150.00",
            SpecialLife: "PayPal",
      },
      {
            Name: "INV003",
            Email: "Unpaid",
            Exprience: "$350.00",
            SpecialLife: "Bank Transfer",
      },
      {
            Name: "INV004",
            Email: "Paid",
            Exprience: "$450.00",
            SpecialLife: "Credit Card",
      },
      {
            Name: "INV005",
            Email: "Paid",
            Exprience: "$550.00",
            SpecialLife: "PayPal",
      },
      {
            Name: "INV006",
            Email: "Pending",
            Exprience: "$200.00",
            SpecialLife: "Bank Transfer",
      },
      {
            Name: "INV007",
            Email: "Unpaid",
            Exprience: "$300.00",
            SpecialLife: "Credit Card",
      },
];

const DoctorSpecialLifeRoute = () => {
      const navigate = useNavigate();
      const tableHeadStyle = "text-center text-base "
      return (
            <Table>
                  <TableHeader>
                        <h1>Dr.Paing</h1>
                        <TableRow>
                              <TableHead className={tableHeadStyle}>Monday</TableHead>
                              <TableHead className={tableHeadStyle}>Thuesday</TableHead>
                              <TableHead className={tableHeadStyle}>Wednesday</TableHead>
                              <TableHead className={tableHeadStyle}>Thursday</TableHead>
                              <TableHead className={tableHeadStyle}>Friday</TableHead>
                        </TableRow>
                  </TableHeader>
                  <TableBody>
                        <TableRow>
                              {/* <TableCell>AM 9:00 --- 10:00</TableCell>
                              <TableCell>AM 9:00 --- 10:00</TableCell>
                              <TableCell>AM 9:00 --- 10:00</TableCell>
                              <TableCell>AM 9:00 --- 10:00</TableCell>
                              <TableCell>AM 9:00 --- 10:00</TableCell> */}
                        </TableRow>
                  </TableBody>
            </Table>
      )
};
;
export default DoctorSpecialLifeRoute;