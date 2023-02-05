import { handleInputChange } from "../DeliveryCalcComponent";
import { State } from "../DeliveryCalcComponent";
interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}
const InputTime: React.FC<Props> = ({ state, setState }) => {
  return (
    <>
      <br />
      <p className="ml-[2.55rem] text-xs text-slate-400 dark:text-white">
        Order Time
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
            <polyline points="12 8 12 12 14 14" />
            <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
          </svg>
        </div>
        <div className="basis-[90%]">
          <input
            className="font-semibold text-sm py-2 px-3 focus:outline-none dark:bg-[#121212] dark:text-gray-400"
            type="datetime-local"
            name="orderTime"
            onChange={(e) => handleInputChange(e, setState, state)}
            value={state.orderTime}
            required
          />
          <hr className="dark:border-gray-800" />
        </div>
      </div>
    </>
  );
};

export default InputTime;
