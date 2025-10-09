class Result {
	constructor({message, success, code, error, data}){
		this.message = message
		this.success = success || false
		this.code = code
		if(error) this.error = error
		this.data = data
		this.init()
	}

	init(){
		return this
	}
}
