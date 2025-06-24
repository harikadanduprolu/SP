import React from 'react';
import { User } from 'lucide-react';

export function UserSettings() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Profile Information
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Update your personal information and profile picture.</p>
        </div>
        <div className="mt-5">
          <div className="flex items-center">
            <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <User className="h-full w-full text-gray-300" />
            </span>
            <button
              type="button"
              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}