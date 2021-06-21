import '../index.css'

const Footer = () => {
    const style = {
        'padding': '0 5px 0 0',
    }

    return (
        <footer className='footer'>
            <p style={style}>Copyright &copy; 2021 Eli Mills</p>
            <p style={style}>|</p>
            <p style={style}>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </footer>
    )
}

export default Footer
