import { propType } from '@interface'
import './style.scss'
const index = ({children}:propType) => {
  return (
    <main className='p-4'>
       {children}
    </main>
  )
}

export default index
