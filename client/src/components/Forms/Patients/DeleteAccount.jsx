// components/profile/DeleteAccount.jsx
import React from 'react';

const DeleteAccount = ({ onDelete, loading }) => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-[var(--color-error)]">
      <h2 className="text-2xl font-bold text-[var(--color-error)] mb-4 text-center">
        Delete Account
      </h2>
      <p className="text-[var(--color-text-primary)] mb-6 text-center">
        Are you sure you want to delete your account? This action cannot be undone.
      </p>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={onDelete}
          disabled={loading}
          className="bg-[var(--color-error)] text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-800 transition-colors disabled:opacity-70"
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;