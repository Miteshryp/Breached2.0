export default function InputField(props) {
   let {name, label, value, placeholder, onChange, type, autocomplete} = props
   return (
       <div className="w-full flex flex-col gap-0">
           <label className="text-lg text-gray-700"> {label} </label>
           <input
                name={name} 
                type={type} 
                value={value}
                onChange={onChange} 
                placeholder={placeholder}
                autoComplete={autocomplete}  
                className={`relative block w-full text-white px-4 my-1 h-14 bg-transparent rounded-md border-2 border-white/70 focus:outline-none focus:border-[#5264B5] transition-all ease-in-out duration-300
                         invalid:border-rose-600 `} /> 
       </div>
   )
}