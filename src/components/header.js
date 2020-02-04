import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Headroom from "react-headroom"
import Logo from "../images/logo-vecinal-entre-rios.svg"

const Header = ({ siteTitle }) => (
  <Headroom>
    <header className="shadow-lg">
      <nav className="flex items-center justify-between flex-wrap max-w-6xl m-auto py-2 px-2">
        <div className="flex items-center flex-shrink-0 text-white mr-6 ">
          <Link to="/" className="logo w-32 w-64">
            <Logo />
          </Link>
        </div>
        <div className="block flex-grow lg:flex lg:items-center lg:w-auto pl-4">
          <div className="nav text-base lg:flex-grow justify-end  flex flex-wrap">
            <Link to="/talleres/" activeClassName="text-teal-500">
              Talleres
            </Link>
            <Link to="/mercado-popular/" activeClassName="text-teal-500">
              Mercado
            </Link>
            <Link to="/agenda/" activeClassName="text-teal-500">
              Agenda
            </Link>
            <Link to="/elparaje/" activeClassName="text-teal-500">
              Sobre el Paraje
            </Link>

            <Link to="/participa/" activeClassName="text-teal-500">
              Participá
            </Link>
          </div>
        </div>
      </nav>
    </header>
  </Headroom>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
