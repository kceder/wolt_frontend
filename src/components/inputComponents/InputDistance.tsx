import { handleInputChange } from "../DeliveryCalcComponent";
import { State } from "../DeliveryCalcComponent";
interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}
const InputDistance: React.FC<Props> = ({ state, setState }) => {
  return (
    <>
      <br />
      <p className="ml-[2.55rem] text-xs text-slate-400 dark:text-white">
        Delivery Distance (m)
      </p>
      <div className="group flex flex-row items-center text-left">
        <div className="mr-1">
          <svg
            className="transition ease-in-out group-hover:scale-125 h-6 w-6 text-[#00c8ff]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="18" cy="5" r="2" />
            <path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
          </svg>
        </div>
        <div className="basis-[90%]">
          <input
            className="font-semibold text-sm w-full py-2 px-3 focus:outline-none dark:bg-[#121212] dark:text-gray-400"
            placeholder="Delivery Distance"
            type="number"
            name="deliveryDistance"
            onChange={(e) => handleInputChange(e, setState, state)}
            min="0"
            required
          />
          <hr className="dark:border-gray-800" />
        </div>
      </div>
    </>
  );
};

export default InputDistance;
