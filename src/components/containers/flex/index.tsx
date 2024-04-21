import { propType } from '@interface'
import './style.scss'
const index = ({children}:propType) => {
  return (
    <div className='flex justify-between'>
      {children}
    </div>
  )
}

export default index
