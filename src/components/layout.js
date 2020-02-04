/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import scrollTo from "gatsby-plugin-smoothscroll"
import { IoIosArrowUp } from "react-icons/io"

import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
        fechaNumero: buildTime(locale: "es", fromNow: true)
        timeAgo: buildTime(locale: "es", formatString: "MMMM Do, YYYY")
      }
    }
  `)

  return (
    <>
      <div className="app-container">
        <div id="arriba" className="absolute top-0 left-0"></div>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 p-16 pt-16">
          <div className="mb-4 font-bold font-sans text-gray-500 uppercase">
            Última actualización
            <small className="m-0 text-gray-100 block ">
              {data.site.timeAgo}
            </small>
          </div>
          <a
            href="https://noalamina.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 pt-3 block"
          >
            La <b>Vida</b> vale más que la mega-minería
          </a>
          <p className="text-gray-200">
            ©{new Date().getFullYear()}, Realizado en Cooparaje
          </p>
        </footer>
        <button
          onClick={() => scrollTo("#arriba")}
          className="bg-green-500 px-2 py-2 fixed bottom-0 right-0 text-white uppercase font-bold focus:border-0"
        >
          <IoIosArrowUp className="mx-3 ml-1 inline-block mb-1 " />
          arriba
        </button>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
