import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import * as XLSX from 'xlsx';
import { fetchAttendanceSummary } from '@api/attendanceSummarySlice';
import { useDispatch, useSelector } from 'react-redux';
import { serialiseEmployeeData } from './helper';

export default function EmployeeDetails() {
  const { employeeId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const employeeName = queryParams.get('name');

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);

  const dispatch = useDispatch();

  const fetchEmployeeData = () => {
    if (!fromDate || !toDate) {
      setEmployeeData(null);
      return;
    }

    const formattedFromDate = format(fromDate, 'yyyy-MM-dd');
    const formattedToDate = format(toDate, 'yyyy-MM-dd');

    dispatch(
      fetchAttendanceSummary({
        userId :employeeId,
        from: formattedFromDate,
        to: formattedToDate,
      }),
    )
      .then((response) => {

        const data = serialiseEmployeeData(response.payload);
        setEmployeeData(data);
      })
      .catch((error) => {
        console.error('Error fetching attendance summary:', error);
      });
  };

  useEffect(() => {
    const currentMonthStart = startOfMonth(new Date());
    const currentMonthEnd = endOfMonth(new Date());

    setFromDate(currentMonthStart);
    setToDate(currentMonthEnd);
  }, []);

  useEffect(() => {
    fetchEmployeeData();
  }, [fromDate, toDate]);



  const COLORS = ['#0088FE', '#00C49F'];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      employeeData?.map((day) => ({
        Date: new Date(day.date).toLocaleDateString(),
        'Each Day Time': (Number(day.perDayHours) || 0).toFixed(2),
      })),
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Daily Data');

    XLSX.writeFile(
      wb,
      `${employeeName}_daily_data_${format(new Date(), 'yyyy-MM-dd')}.xlsx`,
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            placeholderText="From Date"
            className="p-2 border rounded-md w-full md:w-auto"
          />
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            placeholderText="To Date"
            className="p-2 border rounded-md w-full md:w-auto"
          />
          <div className="flex justify-end mb-4">
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Download Excel
            </button>
          </div>
        </div>
      </div>

      {employeeData && (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="p-4 border rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">Daily Data</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Working Hours</th>
                </tr>
              </thead>
                <tbody>
                  {employeeData?.length &&
                    employeeData?.map((day) => {
                      console.log(day, "EACH DATA")
                    return  (
                      <tr key={day._id} className="hover:bg-gray-100">
                        <td className="border p-2">{ new Date(day.date).toLocaleDateString()}</td>
                        <td className="border p-2">
                          {Number(day.perDayHours).toFixed(2)}
                        </td>
                      </tr>
                    )})}
                    </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}
