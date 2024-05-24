import * as React from "react";
import {
	// ColumnDef,
	// ColumnFiltersState,
	// SortingState,
	// VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
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

const data = [
	{
		name: "John Doe",
		email: "john.doe@example.com",
		age: 30,
		date: "2024-05-20",
		time: "10:00 AM",
		doctor: "dr. smith",
		fees: 150,
	},
	{
		name: "Jane Smith",
		email: "jane.smith@example.com",
		age: 25,
		date: "2024-05-21",
		time: "11:00 AM",
		doctor: "dr. johnson",
		fees: 200,
	},
	{
		name: "Alice Johnson",
		email: "alice.johnson@example.com",
		age: 28,
		date: "2024-05-22",
		time: "09:30 AM",
		doctor: "dr. williams",
		fees: 180,
	},
	{
		name: "Bob Brown",
		email: "bob.brown@example.com",
		age: 35,
		date: "2024-05-23",
		time: "02:00 PM",
		doctor: "dr. brown",
		fees: 220,
	},
	{
		name: "Eve White",
		email: "eve.white@example.com",
		age: 32,
		date: "2024-05-24",
		time: "10:30 AM",
		doctor: "dr. davis",
		fees: 170,
	},
	{
		name: "Frank Green",
		email: "frank.green@example.com",
		age: 29,
		date: "2024-05-25",
		time: "03:00 PM",
		doctor: "dr. miller",
		fees: 160,
	},
	{
		name: "Grace Blue",
		email: "grace.blue@example.com",
		age: 40,
		date: "2024-05-26",
		time: "12:00 PM",
		doctor: "dr. wilson",
		fees: 210,
	},
	{
		name: "Henry Black",
		email: "henry.black@example.com",
		age: 45,
		date: "2024-05-27",
		time: "01:00 PM",
		doctor: "dr. moore",
		fees: 230,
	},
	{
		name: "Ivy Yellow",
		email: "ivy.yellow@example.com",
		age: 33,
		date: "2024-05-28",
		time: "04:00 PM",
		doctor: "dr. taylor",
		fees: 190,
	},
	{
		name: "Jack Red",
		email: "jack.red@example.com",
		age: 50,
		date: "2024-05-29",
		time: "10:15 AM",
		doctor: "dr. anderson",
		fees: 240,
	},
];

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
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
	// {
	// 	accessorKey: "amount",
	// 	header: () => <div className="text-right">Amount</div>,
	// 	cell: ({ row }) => {
	// 		const amount = parseFloat(row.getValue("amount"));

	// 		// Format the amount as a dollar amount
	// 		const formatted = new Intl.NumberFormat("en-US", {
	// 			style: "currency",
	// 			currency: "USD",
	// 		}).format(amount);

	// 		return <div className="text-right font-medium">{formatted}</div>;
	// 	},
	// },

	// {
	// 	id: "actions",
	// 	enableHiding: false,
	// 	cell: ({ row }) => {
	// 		const payment = row.original;

	// 		return (
	// 			<DropdownMenu>
	// 				<DropdownMenuTrigger asChild>
	// 					<Button variant="ghost" className="h-8 w-8 p-0">
	// 						<span className="sr-only">Open menu</span>
	// 						<MoreHorizontal className="h-4 w-4" />
	// 					</Button>
	// 				</DropdownMenuTrigger>
	// 				<DropdownMenuContent align="end">
	// 					<DropdownMenuLabel>Actions</DropdownMenuLabel>
	// 					<DropdownMenuItem
	// 						onClick={() => navigator.clipboard.writeText(payment.id)}
	// 					>
	// 						Copy payment ID
	// 					</DropdownMenuItem>
	// 					<DropdownMenuSeparator />
	// 					<DropdownMenuItem>View customer</DropdownMenuItem>
	// 					<DropdownMenuItem>View payment details</DropdownMenuItem>
	// 				</DropdownMenuContent>
	// 			</DropdownMenu>
	// 		);
	// 	},
	// },
];

const ReportListRoute = () => {
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
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

	return (
		<>
			<div className="flex justify-end">
				<button className="border border-black px-8 py-1">
					<img className="w-[30px]" src={CSV} alt="" />
				</button>
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
											<TableHead key={header.id}>
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
