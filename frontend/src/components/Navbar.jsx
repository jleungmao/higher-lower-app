import { Link } from 'react-router-dom';

function Navbar() {



    return (
        <nav className='nav-bar'>
            <div>
                <Link to='/' className='nav-link'>Home</Link>
                <Link to='/add-channel' className='nav-link'>Add Channel</Link>
                <Link to='/play' className='nav-link'>Play</Link>
            </div>
            {/* <button className='nav-button'>Contact Me</button> */}
        </nav>
    );
}

export default Navbar;