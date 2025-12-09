import { InputAndTextUI, SelectUI } from '@ui'
import { useEffect, useState } from 'react'
import { serverAPI } from '@requests'
import { serverStore } from '@store'

function AuthorityPanel() {
	const { serverId } = serverStore()
	const [data, setData] = useState([])
	
	const getServer = async ()=> {
		const result = await serverAPI.getServerInfo(serverId)
		setData(result?.data || [])
	}
	
	useEffect(()=>{
		getServer()
	}, [serverId])
  
     
  
  return (
    <> 
		<div className="flex flex-col gap-6 w-full h-full justify-center items-center">		
			<div className="mockup-window bg-base-100 border border-base-300 w-[65vw] h-[70vh]">
			  <div className="grid place-content-center h-80">
			  
				<div className="flex gap-4">
				
					<div className="flex flex-row gap-2 justify-center items-center">
						<div className="text-lg font-medium">Space </div>
					</div>
				</div>
			
			
			  </div>
			</div>
		</div>
    </>
  )
}

export default AuthorityPanel
