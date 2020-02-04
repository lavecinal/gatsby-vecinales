import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { kebabCase } from "lodash"
import Img from "gatsby-image"
import { TiArrowRightThick } from "react-icons/ti"

import "./index.css"

const AgendaPage = () => {
  const data = useStaticQuery(graphql`
    query AgendaQuery {
      agenda: allContentfulAgenda(
        filter: { eventoProximamente: { eq: false } }
        sort: { fields: updatedAt, order: DESC }
      ) {
        edges {
          node {
            id
            slug
            excerpt {
              childMarkdownRemark {
                excerpt(pruneLength: 150)
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
      proximamente: allContentfulAgenda(
        filter: { eventoProximamente: { eq: true } }
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
            createdAt(formatString: "Do MMMM YYYY", locale: "es")
            eventDay(formatString: "dddd Do MMMM", locale: "es")
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Agenda" />

      <div className=" agenda bg-teal-800 bg-pattern shadow-md">
        <h1 className="text-center w-full max-w-6xl py-12 pb-0 m-auto px-3 text-teal-100  uppercase">
          Agenda <span className=" font-bold">{new Date().getFullYear()}</span>
        </h1>
        <div className="posts flex flex-wrap max-w-6xl m-auto pt-0 py-6">
          <div className="flex flex-wrap  w-full m-auto p-4 justify-center">
            {data.proximamente.edges.map((proximamente, i) => (
              <div
                key={proximamente.node.id}
                className="post max-w-md py-3 pb-8 px-6 w-full m-3 flex-auto bg-white  shadow-md hover:shadow-2xl relative hover:bg-teal-100"
              >
                <Link
                  className="image block h-48 relative overflow-hidden hidden"
                  to={`/agenda/${kebabCase(proximamente.node.slug)}/`}
                >
                  <Img
                    alt={proximamente.node.title}
                    title={proximamente.node.title}
                    fluid={proximamente.node.image.fluid}
                  />
                </Link>
                <div className="description p-3">
                  <b className="block uppercase font-bold text-teal-500 py-3">
                    Próximo {proximamente.node.eventDay}
                  </b>
                  <Link
                    to={`/agenda/${kebabCase(proximamente.node.slug)}/`}
                    className="title text-lg text-2xl block mb-1 hover:text-teal-700 text-gray-800 font-bold pb-1 pr-3"
                  >
                    {proximamente.node.title}
                  </Link>
                  <small className="block  font-bold py-1">
                    <span className="text-gray-700">
                      {proximamente.node.tipoDeEvento} -{" "}
                    </span>{" "}
                    Publicado el {proximamente.node.createdAt}
                  </small>
                  <small></small>
                  <p
                    className="text-base text-gray-800 pb-6"
                    dangerouslySetInnerHTML={{
                      __html:
                        proximamente.node.excerpt.childMarkdownRemark.excerpt,
                    }}
                  />
                  <Link
                    to={`/agenda/${kebabCase(proximamente.node.slug)}/`}
                    className="btn mt-3 bg-teal-500 text-white hover:bg-teal-600 uppercase font-medium tracking-wide absolute bottom-0 right-0 left-0 rounded-none pl-8"
                  >
                    <TiArrowRightThick className="mr-3" />
                    Más información
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" agenda bg-white">
        <div className="posts  max-w-6xl m-auto py-6">
          <h1 className="w-full px-2 py-6 mb-3 text-center text-gray-900 border-b">
            Eventos pasados
          </h1>

          <div className="flex flex-wrap w-full m-auto p-4 justify-center">
            {data.agenda.edges.map((item, i) => (
              <div
                key={item.node.id}
                className="post max-w-xs w-full mr-3 mb-6 shadow-md hover:shadow-2xl bg-white"
              >
                <Link
                  className="image group  block h-48 relative overflow-hidden"
                  to={`/agenda/${kebabCase(item.node.slug)}/`}
                >
                  <Img
                    alt={item.node.title}
                    title={item.node.title}
                    className="object-fill"
                    fluid={item.node.image.fluid}
                  />
                </Link>
                <div className="description p-3 px-6 flex flex-col">
                  <Link
                    to={`/agenda/${kebabCase(item.node.slug)}/`}
                    className="title text-xl block mb-1 hover:text-green-700  text-gray-800 font-medium pb-1 pr-6"
                  >
                    {item.node.title}
                  </Link>

                  <p
                    className="text-base text-gray-800 pb-3 "
                    dangerouslySetInnerHTML={{
                      __html: item.node.excerpt.childMarkdownRemark.excerpt,
                    }}
                  />
                  <small className="block uppercase font-bold text-gray-500 pb-3">
                    {item.node.tipoDeEvento}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AgendaPage
