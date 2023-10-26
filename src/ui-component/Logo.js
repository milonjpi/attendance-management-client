/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
import logo from 'assets/images/logo.png';
// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  return (
    <>
      <img src={logo} alt="Berry" height="32" />
    </>
  );
};

export default Logo;
