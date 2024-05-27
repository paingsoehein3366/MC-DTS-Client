import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import CSV from "../../../assets/csv.jpg";
import { useGetAllReports } from "../api";
import { useState, useMemo } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const columns = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: "name",
		header: () => {
			return <Button variant="ghost">Name</Button>;
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					// onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
	},
	{
		accessorKey: "age",
		header: () => {
			return <Button variant="ghost">Age</Button>;
		},
	},
	{
		accessorKey: "date",
		header: () => {
			return <Button variant="ghost">Date</Button>;
		},
	},
	{
		accessorKey: "time",
		header: () => {
			return <Button variant="ghost">Time</Button>;
		},
	},
	{
		accessorKey: "doctor",
		header: () => {
			return <Button variant="ghost">Doctor</Button>;
		},
	},
	{
		accessorKey: "fees",
		header: () => {
			return <Button variant="ghost">Fees</Button>;
		},
	},
];

const ReportListRoute = () => {
	const { data: reports } = useGetAllReports();

	const reportData = useMemo(
		() =>
			reports?.data?.map((report) => ({
				name: report.username,
				email: report.email,
				age: report.age,
				date: new Date(report.slot.start_date).toISOString().substring(0, 10),
				time: `${new Date(report.slot.start_date).getHours()}:${new Date(report.slot.start_date).getMinutes()} - ${new Date(report.slot.end_date).getHours()}:${new Date(report.slot.end_date).getMinutes()}`,
				doctor: report.doctor.name,
				fees: "200",
			})) || [],
		[reports?.data],
	);

	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data: reportData,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const selectedRows = table.getSelectedRowModel().rows;
	const csvData = selectedRows.map((row) => {
		const rowData = row.original;
		const visibleData = {};
		Object.keys(rowData).forEach((key) => {
			if (table.getColumn(key)?.getIsVisible()) {
				visibleData[key] = rowData[key];
			}
		});
		return visibleData;
	});

	// const selectedColumns = table.getSelectedColumnModel().columns;
	// const headers = selectedColumns
	// 	.filter(
	// 		(column) =>
	// 			column.accessorKey &&
	// 			table.getColumn(column.accessorKey)?.getIsVisible(),
	// 	)
	// 	.map((column) => ({
	// 		label: column.header ? column.header() : column.accessorKey, // Extracting the header text
	// 		key: column.accessorKey,
	// 	}));

	return (
		<>
			<div className="flex justify-end">
				<CSVLink
					data={csvData}
					// headers={headers}
					className="bg-blue-500 hover:bg-blue-600 px-8 py-2 text-white"
				>
					Export to CSV
				</CSVLink>
			</div>
			<div className="w-full">
				<div className="flex items-center py-4">
					<Input
						placeholder="Filter emails..."
						value={table.getColumn("email")?.getFilterValue() ?? ""}
						onChange={(event) =>
							table.getColumn("email")?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Filters <ChevronDown className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize bg-white hover:bg-white"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead className="text-center" key={header.id}>
												{header.isPlaceholder ? null : (
													flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)
												)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ?
								table.getRowModel().rows.map((row) => (
									<TableRow
										className="text-center"
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							:	<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} of{" "}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div>
					{/* <div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div> */}
				</div>
			</div>
		</>
	);
};

export default ReportListRoute;
