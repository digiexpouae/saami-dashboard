
import { useState } from 'react';
import TableComponent from '../../common/DataGrid/DataGrid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { newDate } from 'react-datepicker/dist/date_utils';
import { RootState } from  '../../redux/store'
import { useSelector } from 'react-redux';
const Checkin = () => {
    const [date, setDate] = useState<Date>(new Date());
   
    const data:any=[]
    const warehouses = useSelector((state: RootState) => state.warehouse.warehouses);
    const Warehouse= warehouses.map((warehouse:any) => ({
        value: warehouse._id,
        label: warehouse.name,
      }))
    const columns = [
        {
          header: 'Employee Name',
          accessorKey: 'name',
          cell: (info:any) => info.getValue(),
        },
        // {
        //   header: 'any',
        //   cell: (info:any) => {
        //     const location = info.row.original.location || {};
        //     const { latitude = 'N/A', longitude = 'N/A' } = location;
        //     return `${latitude}, ${longitude}`;
        //   },
        // },
        {
          header: 'Total Hours',
          accessorKey: 'totalEmployees',
          cell: (info:any) => info.getValue(),
        },
       
        {
            header: 'Check In',
            accessorKey: 'totalEmployees',
            cell: (info:any) => info.getValue(),
          },
        
    
      ];
  return (
    
<div>
<div   className='mb-10' style={{display:'flex', gap:'50px'}}><div style={{display:'flex',flexDirection:'column',width:'75%'}}><label>Assigned Warehouse</label><select name="" id="" className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white'><option value="" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary w-full">Select Warehouse</option>
{Warehouse.map((elem:any)=>{
    <option value={elem.value}>{elem.label}</option>
})}

</select></div><DatePicker selected={date} onChange={(date) => setDate(date)} /></div>

<TableComponent columns={columns} data={data} />
</div>  )
}

export default Checkin;
