class Action {
	constructor(req, res, {
		next, service
	}){
		this.req = req
		this.res = res
		this.next = next
		this.body = req.body
		this.params = req.params
		this.query = req.query
		this.headers = req.headers
		this.service = service
		this.init()
	}
	
	init(){
		const data = {
			data: this.body?.data || {},
			params: this.params || {},
			query: this.query || {},
			headers: this.headers
		}
		
		const result = new Result(this.service(data))
		
		this.res.status(result.code || 400).json({
			message: result.message, 
			success: result.success, 
			error: result.error, 
			data: result.data
		})
		return this
	}
}