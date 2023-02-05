import { handleInputChange } from "../DeliveryCalcComponent";
import { State } from "../DeliveryCalcComponent";
interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

const InputCartValue: React.FC<Props> = ({ state, setState }) => {
  return (
    <>
      <br />
      <p className="ml-[2.55rem] text-xs text-slate-400 dark:text-white">
        Cart value (€)
      </p>
      <div className="group flex flex-row items-center text-left">
        <div className="mr-1">
          <svg
            className="transition ease-in-out group-hover:scale-125 h-6 w-6 text-[#00c8ff]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <div className="basis-[90%]">
          <input
            className="font-semibold text-sm w-full py-2 px-3 focus:outline-none dark:bg-[#121212] dark:text-gray-400"
            placeholder="Cart Value"
            type="number"
            step="0.01"
            name="cartValue"
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

export default InputCartValue;
