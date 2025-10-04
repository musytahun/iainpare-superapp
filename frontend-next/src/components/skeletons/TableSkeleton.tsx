export default function TableSkeleton({ rows = 5 }) {
    return (
      <div className="p-4 space-y-2 animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded w-full"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    );
  }
  