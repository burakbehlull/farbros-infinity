import { SelectUI, InputAndTextUI } from '@ui'
import { useEffect, useState } from 'react'
import { serverAPI } from '@requests'
import { serverStore } from '@store'

function BotSettings() {
	const [data, setData] = useState([])
	const [selectedPunishmentType, setSelectedPunishmentType] = useState('')
	
	const { serverId } = serverStore()

	const getServer = async ()=> {
		const result = await serverAPI.getServerConfig(serverId)
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
			  
				<div className="flex gap-4 flex-col justify-center items-center">
					<div className='flex flex-col gap-4 mt-10'>
						
						<div className="flex flex-row gap-4">

							<div role="alert" className="alert alert-info alert-vertical">
								<InputAndTextUI 
									label="Guild Id" 
									value={data?.guildId}
									placeholder={data?.guildId}
									onChange={(e)=> setData({...data, guildId: e.target.value})} 
								/>
							</div>

							<div role="alert" className="alert alert-info alert-vertical">
								<InputAndTextUI 
									label="Prefix" 
									value={data?.prefix}
									placeholder={data?.prefix}
									onChange={(e)=> setData({...data, prefix: e.target.value})} 
								/>
							</div>

							<div role="alert" className="alert alert-info alert-vertical">
								<InputAndTextUI 
									label="Log Channel Id" 
									value={data?.logChannelId}
									placeholder={data?.logChannelId}
									onChange={(e)=> setData({...data, logChannelId: e.target.value})} 
								/>	
							</div>
						</div>

						<div className="flex flex-row gap-4">
							<div role="alert" className="alert alert-error alert-vertical">
								<span><b>Punishment Type: </b></span>
								<SelectUI items={[]} value={selectedPunishmentType} onChange={(e)=> setSelectedPunishmentType(e.target.value)} />
							</div>
							<div role="alert" className="alert alert-error alert-vertical">
								<InputAndTextUI 
									label="Limit" 
									value={data?.limit}
									placeholder={data?.limit}
									onChange={(e)=> setData({...data, limit: e.target.value})} 
								/>	
							</div>
						</div>
					</div>


					
				</div>
			
			  </div>
			</div>
		</div>
	</>
  )
}

export default BotSettings
