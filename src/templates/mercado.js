import React from "react"
import { Link, graphql } from "gatsby"
import get from "lodash/get"
import SEO from "../components/seo"
import { kebabCase } from "lodash"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"

import Layout from "../components/layout"

const Bold = ({ children }) => <span className="font-bold">{children}</span>
const Text = ({ children }) => <p className="m-0 my-3">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      // console.log(node)
      let { file, title } = node.data.target.fields
      // console.log(file["en-US"].url)
      return (
        <img
          alt={title["es-AR"]}
          title={title["es-AR"]}
          src={file["es-AR"].url}
        />
      )
    },
    [INLINES.EMBEDDED_ENTRY]: node => {
      // you html code goes here
      return (
        <div className="btn flex p-0 mt-6">
          <div className="image relative overflow-hidden w-1/4 h-full hidden block">
            <img
              className="m-0 p-0 "
              alt={node.data.target.fields.title["es-AR"]}
              title={node.data.target.fields.title["es-AR"]}
              src={
                node.data.target.fields.image["es-AR"].fields.file["es-AR"].url
              }
            />
          </div>
          <Link
            className=" flex-col justify-start items-start flex-1 flex py-4 px-6"
            to={`/agenda/${
              node.data && node.data.target.fields.slug["es-AR"]
                ? node.data.target.fields.slug["es-AR"]
                : null
            }/`}
          >
            {node.data.target.fields.title["es-AR"]}
            <p className="text-md font-normal">
              {node.data.target.fields.excerpt["es-AR"]}
            </p>
          </Link>
        </div>
      )
    },
  },
}

class MercadoTemplate extends React.Component {
  render() {
    const mercado = get(this.props, "data.contentfulMercado")
    const agendaAside = get(this.props, "data.allContentfulAgenda")
    const agendaPasada = get(this.props, "data.agendaPasada")

    return (
      <Layout>
        <SEO title={`${mercado.title}`} />
        <section className="bg-white max-w-6xl m-auto p-6 pb-20 flex flex-col md:flex-row">
          <article className="w-full px-3 md:w-2/3 md:p-6">
            <h2 className="title pt-6 mb-3 text-3xl border-b pb-3">
              {mercado.title}
            </h2>
            <p className="w-full p-3 px-0">
              {documentToReactComponents(mercado.body.json, options)}
            </p>
          </article>
          <aside className="w-full md:w-1/3 p-6 md:border-l">
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

export default MercadoTemplate

export const pageQuery = graphql`
  query MercadoBySlug($slug: String!) {
    contentfulMercado(slug: { eq: $slug }) {
      slug
      title
      body {
        json
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
