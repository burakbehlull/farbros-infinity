import { Result } from '#base'

class Action {
	constructor(req, res, {
		next, service, sync=false
	}){
		this.req = req
		this.res = res
		this.next = next
		this.body = req.body
		this.params = req.params
		this.query = req.query
		this.headers = req.headers
		this.service = service
		if(sync) {
			this.initAsync()
		} else {
			this.init()
		}
	}
	
	async initAsync(){
		const data = {
			body: this.body || null,
			data: this.body?.data || {},
			params: this.params || {},
			query: this.query || {},
			headers: this.headers
		}
		
		const result = new Result(await this.service(data))
		
		this.res.status(result.code || 400).json({
			message: result.message, 
			success: result.success, 
			error: result.error, 
			data: result.data
		})
		return this
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

export default Action