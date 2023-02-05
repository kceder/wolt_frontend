import { handleInputChange } from "../DeliveryCalcComponent";
import { State } from "../DeliveryCalcComponent";
interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}
const InputItemCount: React.FC<Props> = ({ state, setState }) => {
  return (
    <>
      <br />
      <p className="ml-[2.55rem] text-xs text-slate-400 dark:text-white">
        Number of Items
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
            <line x1="12" y1="20" x2="12" y2="10" />
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="16" />
          </svg>
        </div>
        <div className="basis-[90%]">
          <input
            className="font-semibold text-sm w-full py-2 px-3 focus:outline-none dark:bg-[#121212] dark:text-gray-400"
            placeholder="Number of Items"
            type="number"
            name="numberOfItems"
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

export default InputItemCount;
