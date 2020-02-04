import React from "react"
import { Link, graphql } from "gatsby"
import get from "lodash/get"
import SEO from "../components/seo"
import { kebabCase } from "lodash"

import Layout from "../components/layout"

class TallerTemplate extends React.Component {
  render() {
    const taller = get(this.props, "data.contentfulTalleres")
    const agendaAside = get(this.props, "data.allContentfulAgenda")
    const agendaPasada = get(this.props, "data.agendaPasada")
    return (
      <Layout>
        <SEO title={`${taller.title}`} />

        <section className="bg-white max-w-6xl m-auto p-6 pb-20 flex flex-col md:flex-row shadow-md">
          <article className="w-full px-3 md:w-2/3 md:p-6">
            <Link
              to={`/talleres/`}
              className="title px-3 mb-5 hover:text-white text-red-500"
            >
              <h2 className="text-xl leading-tight mb-2 text-gray-700 hover:text-green-600 font-bold">
                Ver todos los talleres
              </h2>
            </Link>
            <h2 className="title pt-6 mb-3 text-2xl">{taller.title}</h2>
            <p>{taller.diaTaller}</p>
            <b>Taller a cargo de {taller.nombreDelTallerista}</b>
          </article>

          <aside className="w-full md:w-1/3 px-0 md:px-6 p-6 md:border-l">
            <div className="mt-0">
              <h4 className="border-gray-500 text-left pl-0 p-4 border-b-4 mb-1 font-bold uppercase">
                Agenda Vecinal <br />
              </h4>
              {agendaAside.edges.map((item, i) => (
                <div key={item.node.id} className="px-3 py-1 border-b">
                  <small>{item.node.createdAt} - </small>
                  <Link
                    className="text-sm leading-tight mb-2 text-gray-700 font-bold"
                    to={`/agenda/${kebabCase(item.node.slug)}/`}
                  >
                    {item.node.title}
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-0">
              <h4 className="border-gray-500 text-left pl-0 p-4 mt-6 border-b-4 mb-1 font-bold uppercase">
                Eventos pasados <br />
              </h4>
              {agendaPasada.edges.map((item, i) => (
                <div key={item.node.id} className="px-3 py-1 pt-3 border-b">
                  <Link
                    className="text-sm leading-tight mb-2 text-gray-700 font-bold"
                    to={`/agenda/${kebabCase(item.node.slug)}/`}
                  >
                    {item.node.title}
                  </Link>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </Layout>
    )
  }
}

export default TallerTemplate

export const pageQuery = graphql`
  query TallerBySlug($slug: String!) {
    contentfulTalleres(slug: { eq: $slug }) {
      slug
      title
      diaTaller
      nombreDelTallerista
    }
    agendaPasada: allContentfulAgenda(
      filter: { eventoProximamente: { eq: false } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      edges {
        node {
          id
          slug
          excerpt {
            childMarkdownRemark {
              excerpt
            }
          }
          title
          image {
            fluid(maxWidth: 1300, maxHeight: 1300) {
              ...GatsbyContentfulFluid
            }
          }
          tipoDeEvento
          updatedAt(formatString: "Do MMMM YYYY", locale: "es")
          createdAt(formatString: "Do MMMM YYYY", locale: "es")
          eventDay(formatString: "dddd Do MMMM YYYY", locale: "es")
        }
      }
    }
    allContentfulAgenda(
      filter: { eventoProximamente: { eq: true } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      edges {
        node {
          id
          slug
          title
          excerpt {
            childMarkdownRemark {
              excerpt(pruneLength: 200)
            }
          }
          image {
            fixed(width: 450, height: 250) {
              ...GatsbyContentfulFixed
            }
          }
          createdAt(formatString: "DD/MM/YY")
        }
      }
    }
  }
`
