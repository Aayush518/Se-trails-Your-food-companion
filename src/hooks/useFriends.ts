import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { useAuth } from '../context/AuthContext';
import { dummyFriends, dummyPendingFriends } from '../data/dummyData';

export const useFriends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<User[]>([]);
  const [pendingFriends, setPendingFriends] = useState<User[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setFriends(dummyFriends);
    setPendingFriends(dummyPendingFriends);
  }, [user]);

  const acceptFriend = async (friendId: string) => {
    const friend = pendingFriends.find(f => f.id === friendId);
    if (friend) {
      setPendingFriends(pendingFriends.filter(f => f.id !== friendId));
      setFriends([...friends, friend]);
    }
  };

  const rejectFriend = async (friendId: string) => {
    setPendingFriends(pendingFriends.filter(f => f.id !== friendId));
  };

  const removeFriend = async (friendId: string) => {
    setFriends(friends.filter(f => f.id !== friendId));
  };

  return {
    friends,
    pendingFriends,
    acceptFriend,
    rejectFriend,
    removeFriend
  };
};