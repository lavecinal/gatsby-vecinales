import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

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
          className="py-6"
          alt={title["es-AR"]}
          title={title["es-AR"]}
          src={file["es-AR"].url}
        />
      )
    },
  },
}

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      about: allContentfulSobreElParaje {
        edges {
          node {
            id
            title
            description {
              json
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Sobre el Paraje" />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9387.28704300778!2d-71.57528425722622!3d-42.00967611195616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961b952d81b35d99%3A0x797a54e2622fa615!2sVecinal%20Paraje%20Entre%20R%C3%ADos!5e1!3m2!1ses!2sar!4v1579899186747!5m2!1ses!2sar"
        width="100%"
        height="450"
        frameborder="0"
        className="border-none"
        allowfullscreen=""
      ></iframe>
      <div className="flex items-end justify-between border-b px-1 mb-4">
        {data.about.edges.map((item, i) => (
          <div className="h-24 z-10 hero lg:px-32  p-8 lg:py-12 m-0 my-6 h-full max-w-4xl m-auto bg-white shadow-lg">
            <h1 className="mb-8 text-center">{item.node.title}</h1>
            <article className="text-md lg:text-xl  text-left w-100">
              {documentToReactComponents(item.node.description.json, options)}
            </article>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default AboutPage
