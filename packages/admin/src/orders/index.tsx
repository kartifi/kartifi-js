import { useLoaderData } from "react-router-dom";
import 'react-data-grid/lib/styles.css';
import DataGrid, { SelectColumn } from 'react-data-grid';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetcher } from "react-router-dom";

interface Row {
    id: number;
    title: string;

}

function rowKeyGetter(row: Row) {
    return row.id;
}



export function ListOrders() {
    // let width, columns
    const data: any = useLoaderData();

    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
    const [rows, setRows] = useState(data);
    const orderDelete = useFetcher();



    const columns = [
        SelectColumn,
        { key: "id", name: "ID" },
        { key: "status", name: "Status" },
        { key: "fullfillmentStatus", name: "Fullfillment" },
        {
            key: "amount",
            name: "Total",
            renderCell: ({ row }) => { return (row.cart.payment.amount) }

        },
        {
            key: "customer",
            name: "Customer",
            renderCell: ({ row }) => { return (row.customer.email) }
        }

    ]

    const navigate = useNavigate();

    useEffect(() => {
        if (orderDelete.data) {
            setRows(data);
            setSelectedRows(new Set());
        }
    }, [orderDelete])

    const showOrder = (args) => navigate(`/orders/${args.row.id}`)

    return (
        <>

            {/* {selectedRows.size > 0 && <div className="mb-2 block">
                <Button onClick={() => {
                    let [first] = selectedRows;

                    if (first) {
                        navigate(`/orders/${first}/edit`);
                    }
                }
                }>Edit</Button>

                <div>

                    <Button onClick={() => {
                        orderDelete.submit(
                            { body: JSON.stringify([...selectedRows]) },
                            { method: 'DELETE', action: '/orders/delete' },
                        );
                    }}>Delete</Button>

                </div>


            </div>} */}
            <DataGrid rows={rows} rowKeyGetter={rowKeyGetter} columns={columns} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows} onCellClick={showOrder} />
        </>
    )
}