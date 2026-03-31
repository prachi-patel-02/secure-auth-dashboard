function ConfirmModal({ onYes, onNo }: any) {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg text-center">
        <h2>Are you sure?</h2>

        <div className="flex gap-3 justify-center mt-3">
          <button
            onClick={onYes}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Yes
          </button>

          <button
            onClick={onNo}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
