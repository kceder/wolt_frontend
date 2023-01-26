import "../App.css";

function DisplayFee({
  deliveryFee,
  setSubmitted,
}: {
  deliveryFee: any;
  setSubmitted: any;
}) {
  console.log("deliveryFee: ", deliveryFee);
  console.log("setSubmitted: ", setSubmitted);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75 dark:opacity-30"></div>
      </div>

      <div className="dark:bg-black rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="dark:bg-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Delivery Fee
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500 dark:text-white">
                  {deliveryFee} €
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-sky-500"
            >
              Close
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DisplayFee;
