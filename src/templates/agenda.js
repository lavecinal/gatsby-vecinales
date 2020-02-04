import React from "react"
import { Link, graphql } from "gatsby"
import get from "lodash/get"
import SEO from "../components/seo"
import { kebabCase } from "lodash"
import { FiCalendar } from "react-icons/fi"

import Layout from "../components/layout"

class AgendaTemplate extends React.Component {
  render() {
    const agenda = get(this.props, "data.contentfulAgenda")
    const agendaAside = get(this.props, "data.allContentfulAgenda")
    const agendaPasada = get(this.props, "data.agendaPasada")

    const hasEventDay = get(this.props, "data.contentfulAgenda.eventDay")

    return (
      <Layout>
        <SEO title={`${agenda.title}`} />
        <section className="bg-white max-w-6xl m-auto p-6 pl-0 pb-20 flex">
          <article className="w-2/3 p-6 pr-0">
            <header className="border-b pb-3 mb-8">
              <h2 className="text-3xl title pt-3 mb-1 font-light">
                {agenda.title}
              </h2>
              {hasEventDay ? (
                <Link
                  className=" text-lg text-green-500 hover:text-green-700 font-bold"
                  to={`/agenda/`}
                >
                  <FiCalendar className="mr-3 inline-block mb-2 text-xl text-green-700 " />
                  Próximo {agenda.eventDay}
                </Link>
              ) : (
                <span className="hidden"></span>
              )}
            </header>
            <div
              className="text-lg text-gray-800 pr-6"
              dangerouslySetInnerHTML={{
                __html: agenda.excerpt.childMarkdownRemark.html,
              }}
            />
          </article>
          <aside className="w-1/3 p-6 border-l">
            <div className="mt-0">
              <h4 className="border-gray-500 text-left pl-0 p-4 border-b-4 mb-1 font-bold uppercase">
                Futuros eventos
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

export default AgendaTemplate

export const pageQuery = graphql`
  query AgendaBySlug($slug: String!) {
    contentfulAgenda(slug: { eq: $slug }) {
      slug
      title
      eventDay(formatString: "Do MMMM YYYY", locale: "es")
      excerpt {
        childMarkdownRemark {
          html
        }
      }
      updatedAt(formatString: "DD/MM/YY")
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
