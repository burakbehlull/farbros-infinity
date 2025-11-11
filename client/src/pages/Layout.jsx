import { Navbar } from '@components'

function Layout({children}) {

  return (
    <div className="min-h-screen"> 
		<Navbar />
		<main className="flex justify-center h-[89vh] items-center bg-blue-100">
			{children}
		</main>
    </div>
  )
}

export default Layout
