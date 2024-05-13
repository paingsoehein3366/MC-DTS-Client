import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DoctorSpecialLifeRoute = () => {
  const tableHeadStyle = "text-center text-base ";
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
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default DoctorSpecialLifeRoute;
