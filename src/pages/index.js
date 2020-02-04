import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { TiArrowRightThick } from "react-icons/ti"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"
import { useStaticQuery, graphql } from "gatsby"
import AwesomeSlider from "react-awesome-slider"
import "react-awesome-slider/dist/styles.css"
import { kebabCase } from "lodash"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query SliderQuery {
      agenda: allContentfulAgenda(
        filter: { eventoProximamente: { eq: false } }
      ) {
        edges {
          node {
            id
            slug
            title
            excerpt {
              childMarkdownRemark {
                excerpt(pruneLength: 140)
              }
            }
            image {
              fixed(width: 200, height: 150) {
                ...GatsbyContentfulFixed
              }
            }
            createdAt(formatString: "DD/MM/YY")
            eventDay(formatString: "dddd Do MMMM YYYY", locale: "es")
          }
        }
      }
      mercado: allContentfulMercado {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
      homeSlider: allContentfulAgenda(
        filter: { eventoProximamente: { eq: true } }
        sort: { fields: updatedAt, order: DESC }
        limit: 3
      ) {
        edges {
          node {
            id
            slug
            title
            excerpt {
              childMarkdownRemark {
                excerpt(pruneLength: 140)
              }
            }
            image {
              fixed(width: 450, height: 250) {
                ...GatsbyContentfulFixed
              }
            }
            createdAt(formatString: "DD/MM/YY")
            eventDay(formatString: "dddd Do MMMM YYYY", locale: "es")
          }
        }
      }
      talleres: allContentfulTalleres(sort: { fields: diaTaller, order: ASC }) {
        edges {
          node {
            id
            nombreDelTallerista
            diaTaller
            slug
            title
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="En casa" />
      <div className="home-slider border-b shadow-md">
        <AwesomeSlider className="bg-pattern bg-green-600">
          {data.homeSlider.edges.map((item, i) => (
            <div
              key={item.node.id}
              className="flex w-full flex-col md:flex-row max-w-5xl justify-center p-6 h-auto"
            >
              <div className="image hidden md:block flex-1 text-right pr-3">
                <Img
                  alt={item.node.title}
                  title={item.node.title}
                  fixed={item.node.image.fixed}
                />
              </div>
              <div className="description flex-1 pl-3 pt-2">
                <small className="block uppercase font-bold text-white">
                  {item.node.eventDay}
                </small>
                <Link
                  to={`/agenda/${kebabCase(item.node.slug)}/`}
                  className="title text-2xl hover:text-gray-100 text-white font-bold pb-1 max-w-sm block"
                >
                  {item.node.title}
                </Link>
                <p
                  className="text-lg pt-2 text-white"
                  dangerouslySetInnerHTML={{
                    __html: item.node.excerpt.childMarkdownRemark.excerpt,
                  }}
                />
                <Link
                  to={`/agenda/${kebabCase(item.node.slug)}/`}
                  className="btn mt-3 bg-orange-500 text-white hover:bg-orange-600 uppercase font-medium tracking-wide"
                >
                  <TiArrowRightThick className="mr-3" />
                  ver nota completa
                </Link>
              </div>
            </div>
          ))}
        </AwesomeSlider>
      </div>
      <div className="home-container max-w-6xl m-auto flex flex-col lg:flex-row text-left items-center lg:items-start mb-8">
        <div className="w-2/3 bg-white p-6 mt-6 lg:mt-0">
          <h2 className="uppercase text-lg font-bold pb-3 border-b">
            Eventos pasados
          </h2>
          <div className="home-posts ">
            {data.agenda.edges.map((item, i) => (
              <div key={item.node.id} className="post-item border-b py-3 flex">
                <div className="image hidden md:block flex-1 text-right pr-3">
                  <Img
                    alt={item.node.title}
                    title={item.node.title}
                    fixed={item.node.image.fixed}
                  />
                </div>
                <div className="description">
                  <small className="block"> {item.node.createdAt}</small>
                  <Link
                    to={`/agenda/${kebabCase(item.node.slug)}/`}
                    className="title text-lg  mb-5 hover:text-green-700 text-gray-800 font-bold pb-3"
                  >
                    {item.node.title}
                  </Link>
                  <p
                    className="text-lg pt-2 text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: item.node.excerpt.childMarkdownRemark.excerpt,
                    }}
                  />
                </div>
              </div>
            ))}

            <Link
              to="/agenda/"
              className="block lg:inline-block bg-teal-500 hover:bg-teal-600 text-white mr-4 font-bold mt-3 btn"
            >
              Ver agenda completa
            </Link>
          </div>
        </div>
        <aside className="w-2/3 lg:w-1/3 ml-0 pb-6 lg:ml-6">
          <div className="bg-white">
            <Link
              to={`/mercado-popular/`}
              className="border-gray-500 text-left p-4 border-b-4 mb-1 font-bold uppercase block hover:text-orange-500"
            >
              Mercado
            </Link>
            {data.mercado.edges.map((item, i) => (
              <div
                key={item.node.id}
                className="post-item border-b py-2 pl-5 flex"
              >
                <Link
                  to={`/mercado/${kebabCase(item.node.slug)}/`}
                  className="flex-1 title text-md mb-2 hover:text-green-700 text-gray-800 font-bold pb-1"
                >
                  {item.node.title}
                </Link>
                <small className=" max-w-xs pr-5 uppercase text-gray-500">
                  {item.node.diaTaller}
                </small>
              </div>
            ))}
          </div>
          <div className="bg-white mt-6">
            <Link
              to={`/talleres/`}
              className="border-gray-500 text-left p-4 border-b-4 mb-1 font-bold uppercase block hover:text-orange-500"
            >
              Talleres
            </Link>
            {data.talleres.edges.map((talleres, i) => (
              <div
                key={talleres.node.id}
                className="post-item border-b py-2 pl-5 flex"
              >
                <Link
                  to={`/talleres/${kebabCase(talleres.node.slug)}/`}
                  className="flex-1 title text-md mb-2 hover:text-green-700 text-gray-800 font-bold pb-1"
                >
                  {talleres.node.title}
                </Link>
                <small className=" max-w-xs pr-5 uppercase text-gray-500">
                  {talleres.node.diaTaller}
                </small>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </Layout>
  )
}

export default IndexPage
