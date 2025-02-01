import React from 'react';
import { Users, UserPlus, UserMinus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFriends } from '../../hooks/useFriends';

export const FriendsList: React.FC = () => {
  const { user } = useAuth();
  const { 
    friends, 
    pendingFriends, 
    acceptFriend, 
    rejectFriend, 
    removeFriend 
  } = useFriends();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users className="text-purple-600" />
        Friends
      </h2>

      {/* Pending Friend Requests */}
      {pendingFriends.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Pending Requests</h3>
          <div className="space-y-3">
            {pendingFriends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{friend.name}</p>
                    <p className="text-sm text-gray-600">{friend.location}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => acceptFriend(friend.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <UserPlus size={20} />
                  </button>
                  <button
                    onClick={() => rejectFriend(friend.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <UserMinus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friends List */}
      <div className="space-y-3">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{friend.name}</p>
                <p className="text-sm text-gray-600">{friend.location}</p>
              </div>
            </div>
            <button
              onClick={() => removeFriend(friend.id)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <UserMinus size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};