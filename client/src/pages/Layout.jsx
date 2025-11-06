import { Navbar } from '@components'

function Layout({children}) {

  return (
    <div className="bg-red-600 min-h-screen"> 
		<Navbar />
		<main>
			{children}
		</main>
    </div>
  )
}

export default Layout
