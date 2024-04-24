
function Input({ name, setName }) {
  return (
    <div className="flex gap-1 flex-col">
      {<label className="text-teal-light text-lg px-1">{name}</label>}
      <div>
        <input
          type="text"
          name="name"
          className="bg-input-background text-start focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
        ></input>
      </div>
    </div>
  );
}

export default Input;
