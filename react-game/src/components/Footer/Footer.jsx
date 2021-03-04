import rsLogo from '../../assets/rs_school_js.svg'

const Footer = () => {

  return (
    <footer>
      <div className="footer__container">
        <a
          href="https://github.com/JaneEllison"
          className="creator__link"
        >
          created by J.Ell.
          </a>
        <p>
          2021
        </p>
        <a href="https://rs.school/js/">
          <img
            src={rsLogo}
            alt="rsShool"
            className="rs__logo"
          />
        </a>
      </div>
    </footer>
  )
};

export default Footer;