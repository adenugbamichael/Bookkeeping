import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const Records = () => {
  const [reRender, setReRender] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState({});
  const [editIndex, setEditIndex] = useState();

  const [records, setRecords] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const addRecord = () => {
    console.log("adding callback");
    console.log("Amount", amount);
    console.log("Description", description);

    if (amount == "" || description == "") {
      toast.error("Please add amount/description");
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

    toast("Boom! Record Added 😎");

    setAmount("");
    setDescription("");
    setStartDate(new Date());
  };

  const editRecord = (index) => {
    setEditing(true);
    const record = records[index];
    setEditingRecord(record);
    setEditIndex(index);

    setAmount(record.amount);
    setStartDate(record.data);
    setDescription(record.description);
  };

  const updateRecord = () => {
    let prevRecords = records;
    prevRecords[editIndex] = {
      amount,
      description,
      date: startDate,
    };
    console.log(prevRecords);
    setRecords(prevRecords);
    cancelEditing();

    toast("Boom! Record Updated 😎");
  };

  const cancelEditing = () => {
    setEditing(false);
    setEditingRecord({});
    setAmount("");
    setDescription("");
    setStartDate(new Date());
  };

  const deleteRecord =
    ((index) => {
      let prevRecords = records;
      prevRecords.splice(index, 1);
      console.log(prevRecords);
      setRecords(prevRecords);
      setEditing(false);
      toast("Record Deleted");
      setReRender(!reRender);
    },
    [records]);

  return (
    <div className='container py-2 mx-auto'>
      <div className='border-2 border-[#3F3F3F] rounded shadow-md px-5 py-8 mb-5'>
        <h2 className=' text-xl'>
          {isEditing ? "Edit Record" : "Add new Record"}
        </h2>
        <label className='mt-5 w-full block' htmlFor='amount'>
          Amount
        </label>
        <input
          type='number'
          value={amount}
          id='amount'
          onChange={(e) => setAmount(e.target.value)}
          className='p-4 py-2 text-sm border-[#3F3F3F] border-2 w-full mt-3'
          placeholder='Amount?'
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
        {isEditing ? (
          <button
            onClick={updateRecord}
            className='nowrap text-slate-200 border-solid  border-[1px] border-[#aaa] bg-[#3B3B3B] hover:bg-[#242424] p-7 mt-3 py-2 text-center text-sm shadow-lg'
          >
            Update
          </button>
        ) : (
          <button
            onClick={addRecord}
            className='nowrap  text-slate-200 border-solid  border-[1px] border-[#aaa] bg-[#3B3B3B] hover:bg-[#242424] p-7 mt-3 py-2 text-center text-sm shadow-lg'
          >
            Add
          </button>
        )}
        {isEditing ? (
          <button
            onClick={cancelEditing}
            className='nowrap ml-[5px] text-[#242424] bg-slate-200 p-7 mt-3 py-2 text-center text-sm shadow-lg'
          >
            Cancel
          </button>
        ) : (
          ""
        )}
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
                <td className='table-cell py-2 px-3'>
                  A{" "}
                  <button
                    className='p-3 text-xs py-1 bg-[#747BFF] text-white uppercase shadow-md hover:bg-[#3c42b9]'
                    onClick={() => {
                      editRecord(index);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className='p-3 text-xs py-1 ml-1  bg-[#C3235B] hover:bg-[#9f1243] text-white uppercase shadow-md '
                    onClick={() => {
                      deleteRecord(index);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Records;
