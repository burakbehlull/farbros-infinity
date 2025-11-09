
function InputUI({classNames, type, ...props}){
	return(
		<>
			<input type={type ? type : "text"} className={`input ${classNames}`} {...props} />
		</>
	)
}

export default InputUI