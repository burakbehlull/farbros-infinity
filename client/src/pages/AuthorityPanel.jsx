import { InputAndTextUI, SelectUI } from '@ui'

function AuthorityPanel() {

  return (
    <> 
		
		<InputAndTextUI type="text" label="User Id" placeholder="User Identity" />
		<SelectUI 
			defaultItem="xd"
			items={[{name: 'he', value: 'xd'}]} 
		/>
    </>
  )
}

export default AuthorityPanel
