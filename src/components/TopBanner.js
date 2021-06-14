import TopBarOptions from './TopBarOptions'
import '../index.css'

const TopBanner = () => {
    return (
        <header id='top-bar'>
            <div className='top-bar-container'>
                <div className='top-bar-site-name'>
                    <h1 style={{textAlign: 'center',
                                verticalAlign: 'middle',
                                color: 'white',
                                fontSize: '350%'}}>
                        CourtSearch
                    </h1>
                </div>
                <div className='top-bar-options-menu'>
                    <TopBarOptions />
                </div>
            </div>
        </header>
    )
}

export default TopBanner