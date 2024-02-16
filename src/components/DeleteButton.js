import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed z-10	 bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className="bg-slate-500	 p-8 rounded-lg">
          <h4>Are you sure you want to delete?</h4>
          <div className="flex gap-2 mt-6">
            <button
              className="bg-gray-400	hover:bg-gray-300 py-3"
              type="button"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="bg-red-500	hover:bg-red-600 py-3"
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className="text-red-500"
      type="button"
      onClick={() => setShowConfirm(true)}
    >
      {label}
    </button>
  );
}
