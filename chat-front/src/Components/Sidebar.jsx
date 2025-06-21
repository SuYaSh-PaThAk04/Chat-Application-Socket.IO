import React, { useEffect, useState } from 'react';
import { chatStore } from '../Store/chatStore';
import SideSkelton from './SideSkelton';
import { AuthStore } from '../Store/AuthStore';
import { Users } from 'lucide-react';

function Sidebar() {
  const { users = [], isUsersLoading, selectedUser, setSelectedUser } = chatStore();
  const { onlineUsers = [] } = AuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    chatStore.getState().getUsers();
  }, []);

  if (isUsersLoading) return <SideSkelton />;

  const filteredUsers = showOnlineOnly
    ? users.filter((u) => onlineUsers.includes(u._id))
    : users;
console.log("🟡 onlineUsers from AuthStore:", onlineUsers);
console.log("🟢 allUsers from chatStore:", users.map(u => u._id));

  return (
    <aside className="h-full w-20 lg:w-72 border-r flex flex-col">
      <div className="border-b p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 py-3">
        {filteredUsers.length ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id ? 'bg-base-300 ring' : ''
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profileImage || '/avatar.png'}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2" />
                )}
              </div>
              <div className="hidden lg:block truncate">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
