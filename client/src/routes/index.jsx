import { useRoutes } from 'react-router-dom'
import { Home, AuthorityPanel, MessagePanel } from '@pages'
import { NotFound } from '@components'

export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
		{
            path: '/message-panel',
            element: <MessagePanel />,
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

