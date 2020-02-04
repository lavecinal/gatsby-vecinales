import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { TransitionProvider, TransitionViews } from "gatsby-plugin-transitions"
import Header from "../components/header"
import { Helmet } from "react-helmet"

const Layout2 = ({ location, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery2 {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <TransitionProvider location={location}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Helmet>
        <script
          src="https://kit.fontawesome.com/34866c0a0f.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <TransitionViews>{children}</TransitionViews>
    </TransitionProvider>
  )
}

export default Layout2
