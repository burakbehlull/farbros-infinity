
function SelectUI({items, classNames, defaultItem, ...props}){
	return(
		<>
			<select className={`select ${classNames ? classNames : ''}`} {...props}>
			  <option disabled={true}>{defaultItem ?? ''}</option>
			  {items?.map((item, i)=> 
				<option key={i} value={item.value}>{item.name}</option>
			  )}
			</select>
		</>
	)
}

export default SelectUI