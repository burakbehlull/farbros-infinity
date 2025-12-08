
function InputAndTextUI({classNames, type, label, ...props}){
	return(
		<>
			<fieldset className="fieldset">
			  <legend className="fieldset-legend mb-2 text-sm">{label}</legend>
			  <input type={type ? type : "text"} className={`input ${classNames}`} {...props} />
			</fieldset>
		</>
	)
}

export default InputAndTextUI