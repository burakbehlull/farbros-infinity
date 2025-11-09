
function ButtonUI({classNames, ...props}){
	return(
		<>
			<button className={`btn ${classNames}`} {...props} />
		</>
	)
}

export default ButtonUI