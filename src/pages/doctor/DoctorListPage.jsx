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

const DoctorListPage = () => {
      const navigate = useNavigate();
      const tableHeadStyle = "text-center text-base "
      return (
            <Table >
                  <TableCaption>A list of your recent Names.</TableCaption>
                  <TableHeader>
                        <h1>Doctor List</h1>
                        <TableRow>
                              <TableHead className={tableHeadStyle}>Name</TableHead>
                              <TableHead className={tableHeadStyle}>Email</TableHead>
                              <TableHead className={tableHeadStyle}>Experience</TableHead>
                              <TableHead className="text-center text-base">Special Life</TableHead>
                        </TableRow>
                  </TableHeader>
                  <TableBody>
                        {invoices.map((invoice) => (
                              <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.Name}</TableCell>
                                    <TableCell>{invoice.Email}</TableCell>
                                    <TableCell>{invoice.SpecialLife}</TableCell>
                                    <Button
                                          onClick={() => navigate(`special-life`)}
                                          className="rounded bg-[#0a95a5] text-[#fff] my-1.5 hover:bg-[#0dc2d6] active:bg-[#0a95a5]"
                                    >Action</Button>
                              </TableRow>
                        ))}
                  </TableBody>
            </Table>
      )
};
export default DoctorListPage;
