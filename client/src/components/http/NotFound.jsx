import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
	<div className="hero bg-base-200 min-h-screen">
	  <div className="hero-content text-center">
		<div className="max-w-md">
		  <h1 className="text-5xl font-bold">Sayfa Bulunamadı</h1>
		  <p className="py-6">
			Aradığınız sayfa bulunamadı.
		  </p>
		  <div className="flex gap-4 items-center justify-center">
			<button className="btn btn-info" onClick={()=> navigate("/")}>Anasayfa</button>
			<button className="btn btn-primary" onClick={()=> navigate(-1)}>Önceki Sayfaya Geri Dön</button>
		  </div>
		</div>
	  </div>
	</div>
  )
}

export default NotFound