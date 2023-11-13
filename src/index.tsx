import { createRoot } from 'react-dom/client'
import * as React from 'react'

import { App } from '@/components/App'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <App />,
)
