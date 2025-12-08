import { useRoutes } from 'react-router-dom'
import { Home, AuthorityPanel, StatusPanel, BotSettings } from '@pages'
import { NotFound } from '@components'

export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
		{
            path: '/status',
            element: <StatusPanel />,
        },
		{
            path: '/authority',
            element: <AuthorityPanel />,
        },
		{
            path: '/settings',
            element: <BotSettings />,
        },
		{
			path: '*',
			element: <NotFound />
		}
    ])
}

