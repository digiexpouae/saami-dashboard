import { useState, useEffect } from 'react';
import TableComponent from '../../common/DataGrid/DataGrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWarehouses } from '../../sliceApi/warehouseSlice';
import { fetchAttendance } from '../../sliceApi/attendanceSlice';

const Checkin = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [warehouse, setWarehouse] = useState<string>('');

  const dispatch = useDispatch<any>();
  const warehouses = useSelector((state: RootState) => state.warehouse.warehouses);
  const attendanceRecords = useSelector((state: RootState) => state.attendance.attendanceRecords);
  const loading = useSelector((state: RootState) => state.attendance.loading);
  const error = useSelector((state: RootState) => state.attendance.error);

  // Fetch warehouses on component mount and set default warehouse
  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  useEffect(() => {
    if (warehouses.length > 0 && !warehouse) {
      setWarehouse(warehouses[0].id); 
    }
  }, [warehouses, warehouse]);

  
  
  // Fetch attendance whenever date or warehouse changes
  useEffect(() => {
    if (warehouse) {
      const formattedDate = date.toISOString().split('T')[0]; 
      // console.log(warehouse);
      
      // Format date as YYYY-MM-DD
      dispatch(fetchAttendance({ date: formattedDate, warehouseId: warehouse }));
    }
  }, [dispatch, warehouse, date]);

  const columns = [
    {
      header: 'Employee Name',
      accessorKey: 'username',
      cell: (info: any) => info.getValue(),
    },
{
  header: 'Total Duration',
  accessorKey: 'totalDuration',
  cell: (info: any) => {
    const totalMinutes = info.getValue();  // Total minutes from backend
    const hours = Math.floor(totalMinutes / 60);  // Calculate full hours
    const minutes = totalMinutes % 60;  // Calculate remaining minutes

    return `${hours} hr ${minutes} min`;
  },
},
    {
      header: 'First Check In',
      accessorKey: 'firstCheckIn',
      cell: (info: any) => new Date(info.getValue()).toLocaleTimeString(),
    },
    {
      header: 'Last Check Out',
      accessorKey: 'lastCheckOut',
      cell: (info: any) => new Date(info.getValue()).toLocaleTimeString(),
    },
  ];

  return (
    <div>
      <div className="mb-10" style={{ display: 'flex', gap: '50px' }}>
        {/* Warehouse Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '75%' }}>
          <label>Assigned Warehouse</label>
          <select
            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
          >
            <option value="" disabled>
              Select Warehouse
            </option>
            {warehouses?.map((elem: any) => (
              <option key={elem._id} value={elem._id}>
                {elem.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <DatePicker selected={date} onChange={(date: Date) => setDate(date)} />
      </div>

      {/* Table Component */}
      {loading ? (
        <p>Loading attendance records...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TableComponent columns={columns} data={attendanceRecords} />
      )}
    </div>
  );
};

export default Checkin;
