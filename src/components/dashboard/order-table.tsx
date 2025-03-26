"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  XIcon,
} from "lucide-react";

interface Order {
  id: number;
  customer: string;
  date: string;
  total: string;
  status: string;
}

interface Props {
  orders: Order[];
}

const ITEMS_PER_PAGE = 5;

export default function OrderTable({ orders }: Props) {
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancelOrder, setCancelOrder] = useState<Order | null>(null);

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full overflow-x-auto rounded-xl border bg-background shadow-sm">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {/* View Dialog Trigger */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 text-sm">
                        <p><strong>ID:</strong> {selectedOrder?.id}</p>
                        <p><strong>Customer:</strong> {selectedOrder?.customer}</p>
                        <p><strong>Date:</strong> {selectedOrder?.date}</p>
                        <p><strong>Total:</strong> {selectedOrder?.total}</p>
                        <p><strong>Status:</strong> {selectedOrder?.status}</p>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Close</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Cancel Dialog Trigger */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setCancelOrder(order)}
                      >
                        <XIcon className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancel Order</DialogTitle>
                      </DialogHeader>
                      <p>Are you sure you want to cancel order #{cancelOrder?.id}?</p>
                      <DialogFooter className="mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">No</Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            // Handle cancellation logic here
                            console.log("Cancelled Order ID:", cancelOrder?.id);
                          }}
                        >
                          Yes, Cancel
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
