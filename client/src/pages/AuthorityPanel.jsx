import { InputAndTextUI, SelectUI } from '@ui'
import { useEffect, useState } from 'react'
import { botAPI, serverAPI } from '@requests'

function AuthorityPanel() {
	const [servers, setServers] = useState([])
	const [data, setData] = useState([])
	const [selectedServer, setSelectedServer] = useState('')
	
	const getServers = async ()=> {
		const result = await botAPI.servers()
		const converted = result?.data?.map((item)=> {
			return {name: item.name, value: item.id}
		})
		setServers(converted)
	}
		
	const getServer = async ()=> {
		const result = await serverAPI.getServerInfo(selectedServer)
		console.log("SERVER---> ", result)
	}
	
	useEffect(()=>{
		getServers()
	}, [])
	  
	useEffect(()=>{
		console.log("selected", selectedServer)
		getServer()
	}, [selectedServer])
  
     
  
  return (
    <> 
		<div className="flex flex-col gap-6 w-full h-full justify-center items-center">		
			<div className="mockup-window bg-base-100 border border-base-300 w-[65vw] h-[70vh]">
			  <div className="grid place-content-center h-80">
			  
				<div className="flex gap-4">
				
					<div className="flex flex-row gap-2 justify-center items-center">
						<div className="text-lg font-medium">Server: </div>
						<SelectUI items={servers} value={selectedServer} onChange={(e)=> setSelectedServer(e.target.value)} />
					</div>
				</div>
			
			
			  </div>
			</div>
		</div>
    </>
  )
}

export default AuthorityPanel
