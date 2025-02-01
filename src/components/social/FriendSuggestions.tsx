import React from 'react';
import { UserPlus } from 'lucide-react';
import { User } from '../../types/User';

interface Props {
  suggestions: User[];
  onSendRequest: (userId: string) => void;
}

export const FriendSuggestions: React.FC<Props> = ({ suggestions, onSendRequest }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">People You May Know</h3>
      
      <div className="space-y-4">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.location}</p>
              </div>
            </div>
            
            <button
              onClick={() => onSendRequest(user.id)}
              className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
            >
              <UserPlus className="h-4 w-4" />
              <span>Connect</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};