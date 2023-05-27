import { useState, useCallback } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const addRecord = useCallback(() => {
    console.log("adding callback");
    console.log("Amount", amount);
    console.log("Description", description);

    if (amount == "" || description == "") {
      // toast.error("Please add amount/description");
      return;
      // dont add the record
    }

    const newRecord = {
      date: startDate,
      description,
      amount,
    };

    const prevRecords = records.splice(0);
    prevRecords.push(newRecord);
    setRecords(prevRecords);

    setAmount("");
    setDescription("");
    setStartDate(new Date());
  });

  return (
    <div className='container py-2 mx-auto'>
      <div className='border-2 border-[#3F3F3F] rounded shadow-md px-5 py-8 mb-5'>
        <h2 className=' text-xl'>Add a Record</h2>
        <label className='mt-5 w-full block' htmlFor='amount'>
          Amount
        </label>
        <input
          type='number'
          value={amount}
          id='amount'
          onChange={(e) => setAmount(e.target.value)}
          className='p-4 py-2 text-sm border-[#3F3F3F] border-2 w-full mt-3'
          placeholder='Amount ?'
        />
        <label className='mt-5 w-full block' htmlFor='date'>
          Date
        </label>
        <ReactDatePicker
          selected={startDate}
          className='p-4 py-2 text-sm border-[#3F3F3F] border-2 w-full mt-3'
          onChange={(date) => setStartDate(date)}
        />
        <label className='mt-5 w-full block' htmlFor='description'>
          Description
        </label>
        <textarea
          id='description'
          className='p-4 py-2 text-sm border-[#3F3F3F] border-2 w-full mt-3'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder='Description of the expense'
        >
          {description}
        </textarea>
        <button
          onClick={addRecord}
          className='nowrap border-[1px] border-solid border-[#aaa] p-7 mt-3 py-2 text-center text-sm shadow-lg'
        >
          Add
        </button>
      </div>
      <h2 className=' text-2xl'>Records</h2>
      <table className='table w-full'>
        <thead className='table-header-group bg-[#3F3F3F]'>
          <tr className='table-row'>
            <th className='table-cell py-2 px-3'>#</th>
            <th className='table-cell py-2 px-3'>Date</th>
            <th className='table-cell py-2 px-3'>Amount</th>
            <th className='table-cell py-2 px-3'>Description</th>
            <th className='table-cell py-2 px-3'>Actions</th>
          </tr>
        </thead>
        <tbody className='table=row-group'>
          {records.map((record, index) => {
            const formattedDate = `${record.date.getDate()}-${
              record.date.getMonth() + 1
            }-${record.date.getFullYear()}`;
            return (
              <tr key={index} className='table-row'>
                <td className='table-cell py-2 px-3'>{index + 1}</td>
                <td className='table-cell py-2 px-3'>{formattedDate}</td>
                <td className='table-cell py-2 px-3'>${record.amount}</td>
                <td className='table-cell py-2 px-3'>{record.description}</td>
                <td className='table-cell py-2 px-3'>Actions</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Records;
