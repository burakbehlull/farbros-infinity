import { Navbar } from '@components'

function Layout({children}) {

  return (
    <div className="bg-red-600 min-h-screen"> 
		<Navbar />
		<main className="flex justify-center h-[89vh] items-center bg-blue-400">
			{children}
		</main>
    </div>
  )
}

export default Layout
