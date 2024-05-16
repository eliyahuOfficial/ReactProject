import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";

const Spinners = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoading && (
        <div className="flex flex-col items-center gap-5 mt-2">
          <BarLoader color="#ff7e66" width={300} />
        </div>
      )}
    </div>
  );
}

export default Spinners;