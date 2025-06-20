const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 animate-pulse">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full overflow-hidden">
              <div className="skeleton w-full h-full rounded-full" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-3 w-20 rounded" />
          </div>

          <div className="chat-bubble bg-base-200 p-3 rounded-xl">
            <div className="skeleton h-4 w-48 mb-2 rounded" />
            <div className="skeleton h-4 w-32 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
