import '../index.css'
import { Link, useLocation } from 'react-router-dom'

const TopBarOptions = () => {


    return (
        <ul className='top-bar-options-list'>
            <Link to='/'>
                {useLocation().pathname === '/'
                    ? <li className='top-bar-list-item find-court-container active'>
                        <h3>Find A Court</h3>
                    </li>
                    : <li className='top-bar-list-item find-court-container'>
                        <h3>Find A Court</h3>
                    </li>
                }
            </Link>
            <Link to='/new-court'>
                {useLocation().pathname === '/new-court'
                    ? <li className='top-bar-list-item new-court-container active'>
                        <h3>Add A Court</h3>
                    </li>
                    : <li className='top-bar-list-item new-court-container'>
                        <h3>Add A Court</h3>
                    </li>
                }
            </Link>
        </ul>
    )
}

export default TopBarOptions
