import { useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa6";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";



function Navbar() {
  const navigate = useNavigate()
  
  const pages = [
	{
		name: 'Authority Panel',
		route: '/authority'
	},
	{
		name: 'Status Panel',
		route: '/status'
	},
	{
		name: 'Bot Settings',
		route: '/settings'
	}
  ]
  
  const getIcon = (name)=> {
	  switch(name){
		  case '/status':
			return <GrStatusCriticalSmall />
		  case '/authority':
			return <FaRegUser />  
		  case '/settings':
			return <IoSettingsSharp />  
	  }
  }
  
  return (
    <nav className="bg-blue-600"> 
		<div className="navbar bg-base-100 shadow-sm">
		  <div className="navbar-start">
			<div className="dropdown">
			  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
			  </div>
			  <ul
				tabIndex="-1"
				className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
				{pages?.map((page, i)=> <li onClick={()=> navigate(`${page.route}`)}><a>{getIcon(page.route)} {page.name}</a></li>)}
			  </ul>
			</div>
			<a className="btn btn-ghost text-xl" onClick={()=> navigate("/")}>Farbros Infinity</a>
		  </div>
		  <div className="navbar-center hidden lg:flex">
			<ul className="menu menu-horizontal px-1">
				{pages?.map((page, i)=> <li onClick={()=> navigate(`${page.route}`)}><a>{getIcon(page.route)} {page.name}</a></li>)}
			</ul>
		  </div>
		  <div className="navbar-end">
		  {/*<a className="btn">Button</a>*/}
		  </div>
		</div>
    </nav>
  )
}

export default Navbar