import { SelectUI, InputAndTextUI } from '@ui'
import { useEffect, useState } from 'react'
import { botAPI, serverAPI } from '@requests'

function StatusPanel() {
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
		const result = await serverAPI.getServerConfig(selectedServer)
		setData(result?.data || [])
	}
	
	useEffect(()=>{
		getServers()
	}, [])
	  
	useEffect(()=>{
		getServer()
	}, [selectedServer])
  
     
  
  return (
    <> 
		<div className="flex flex-col gap-6 w-full h-full justify-center items-center">		
			<div className="mockup-window bg-base-100 border border-base-300 w-[65vw] h-[70vh]">
			  <div className="grid place-content-center h-80">
			  
				<div className="flex gap-4 flex-col justify-center items-center">
					STATUS PANEL	
				</div>
			
			  </div>
			</div>
		</div>
    </>
  )
}

export default StatusPanel
