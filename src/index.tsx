import { createRoot } from 'react-dom/client'
import * as React from 'react'

import './index.scss'
import { App } from '@/components/App'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
