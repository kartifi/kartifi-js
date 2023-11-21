import { Link, useLoaderData } from "react-router-dom";
import 'react-data-grid/lib/styles.css';
import DataGrid, { SelectColumn } from 'react-data-grid';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useFetcher } from "react-router-dom";

interface Row {
    id: number;
    title: string;
}

function rowKeyGetter(row: Row) {
    return row.id;
}



export function ListProducts() {
    // let width, columns
    const data = useLoaderData();

    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());
    const [rows, setRows] = useState(data);
    const productDelete = useFetcher();
    // if (process.env.NODE_ENV === 'test') {
    //     width = 280;
    //     columns = [
    //         SelectColumn,
    //         { key: "id", name: "ID" },
    //         { key: "title", name: "Title" },



    //     ]
    // } else {

    // }

    const columns = [
        SelectColumn,
        { key: "id", name: "ID" },
        { key: "title", name: "Title" },

    ]

    const navigate = useNavigate();

    useEffect(() => {
        if (productDelete.data) {
            setRows(data);
            setSelectedRows(new Set());
        }
    }, [productDelete])

    return (
        <>
            <div className="mb-2 block">
                <Link to="/products/new">Add Product</Link>
            </div>
            {selectedRows.size > 0 && <div className="mb-2 block">
                <Button onClick={() => {
                    let [first] = selectedRows;

                    if (first) {
                        navigate(`/products/${first}/edit`);
                    }
                }
                }>Edit</Button>

                <div>

                    <Button onClick={() => {
                        productDelete.submit(
                            { body: JSON.stringify([...selectedRows]) },
                            { method: 'DELETE', action: '/products/delete' },
                        );
                    }}>Delete</Button>

                </div>


            </div>}
            <DataGrid rows={rows} rowKeyGetter={rowKeyGetter} columns={columns} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows} />
        </>
    )
}