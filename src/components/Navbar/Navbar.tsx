import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav
      className='navbar navbar-expand-lg'
      style={{ backgroundColor: '#4c00c2' }}
    >
      <div>
        <ul className='navbar-nav'>
          <li className='nav-brand'>
            <span className='nav-link k'>
              <img
                src='https://hirebee-main-new.s3.amazonaws.com/hirebee.kz/upload/f/b/4/7/fb475d9e.png'
                width='30'
                height='30'
                className='d-inline-block align-top site-logo'
                alt=''
              />
            </span>
          </li>
          <li>
            <NavLink
              to='/'
              className='nav-link text-white'
              style={{ textDecoration: 'none' }}
            >
              Главная страница
            </NavLink>
          </li>
          <li>
            <NavLink to='/add-card' className='nav-link text-white'>
              Добавить карту
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
