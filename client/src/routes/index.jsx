import { useRoutes } from 'react-router-dom'
import { Home, AuthorityPanel, StatusPanel } from '@pages'
import { NotFound } from '@components'

export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
		{
            path: '/status-panel',
            element: <StatusPanel />,
        },
		{
            path: '/authority-panel',
            element: <AuthorityPanel />,
        },
		{
			path: '*',
			element: <NotFound />
		}
    ])
}

