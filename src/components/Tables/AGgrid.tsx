import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-community/styles/ag-theme-quartz.css';
const AGgrid = () => {
    // Row Data: The data to be displayed.
 
    type Car = {
      make: string;
      model: string;
      price: number;
      electric: boolean;
  };
  type ColDef = {
    field: string;
    headerName?: string; // Optional: Custom header for the column
    sortable?: boolean;  // Optional: Enable sorting
    filter?: boolean;    // Optional: Enable filtering
};

    const [rowData, setRowData] = useState<Car[]>([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [columnDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ])



  return (
    <div>
    <div
    // define a height because the Data Grid will fill the size of the parent container
    style={{ height: 500 }} className='ag-theme-quartz'
>
<AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                domLayout="autoHeight"  // Optional: adjusts height based on content
                className="ag-theme-alpine" // Apply the theme
           
        />
  
</div>
</div>
  )
}

export default AGgrid;