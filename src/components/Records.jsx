const Records = () => {
  return (
    <div className='container py-4 mx-auto'>
      <h1 className='uppercase text-2xl'>Records</h1>
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
