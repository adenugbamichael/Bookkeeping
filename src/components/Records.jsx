import { useState, useCallback } from "react";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [amount, setAmount] = useState(1);
  const [description, setDescription] = useState("");

  const addRecord = useCallback(() => {
    console.log("adding callback");
    console.log("Amount", amount);
    console.log("Description", description);

    const newRecord = {
      description,
      amount,
    };

    const prevRecords = records.splice(0);
    prevRecords.push(newRecord);
    setRecords(prevRecords);
  });

  return (
    <div className='container py-2 mx-auto'>
      <div className='border-2 border-[#3F3F3F] rounded shadow-md px-5 py-8 mb-5'>
        <h2 className='uppercase text-xl'>Add a Record</h2>
        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='p-4 py-2 text-sm border-[#3F3F3F] border-2 w-full mt-3'
          placeholder='Amount ?'
        />
        <textarea
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
      <h2 className='uppercase text-2xl'>Records</h2>
      <table className='table w-full'>
        <thead className='table-header-group bg-[#3F3F3F]'>
          <tr className='table-row'>
            <th className='table-cell py-2 px-3'>#</th>
            <th className='table-cell py-2 px-3'>Date</th>
            <th className='table-cell py-2 px-3'>Amount</th>
            <th className='table-cell py-2 px-3'>Actions</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Records;
