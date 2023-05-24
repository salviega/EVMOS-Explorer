import React from "react";
import { RiSearch2Line, RiSearchEyeLine, RiSearchLine } from "react-icons/ri";

const Input = (props: any) => {
  return (
    <div className="rounded-md basis-1/4 flex items-center justify-center bg-slate-500">
      <input
        value={props.input}
        type="text"
        id=""
        name="search"
        onChange={(e) => {
          props.setInput(e.target.value);
        }}
        className="rounded-md bg-slate-500 py-4 px-8 w-11/12 outline-none text-white "
      />
      <button className="px-3 " onClick={() => props.search()}>
        <RiSearch2Line className="text-3xl text-black dark:text-black" />
      </button>
    </div>
  );
};

export default Input;
