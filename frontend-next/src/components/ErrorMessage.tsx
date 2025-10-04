type ErrorMessageProps = {
    message?: string;
    retry?: () => void;
  };
  
  export default function ErrorMessage({ message, retry }: ErrorMessageProps) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{message || "Something went wrong."}</p>
        {retry && (
        <button onClick={retry} className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg">
          Retry
        </button>
        )}
      </div>
    );
  }
  