import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

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
  },
}

const ParticipaPage = () => {
  const data = useStaticQuery(graphql`
    query ParticipaQuery {
      participa: allContentfulParticipa {
        edges {
          node {
            id
            title
            text {
              json
            }
            featuredImage {
              file {
                url
              }
            }
            sociales {
              link
              icono {
                file {
                  url
                }
              }
              title
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Participá" />
      <div className="bg-white">
        <div className="posts flex flex-wrap max-w-full">
          {data.participa.edges.map((item, i) => (
            <div key={item.node.id} className="w-full">
              <div className="overflow-hidden h-64 relative">
                <img
                  className="absolute inset-x-0 bottom-0"
                  alt={item.node.title}
                  src={item.node.featuredImage.file.url}
                  width="100%"
                />
              </div>
              <h2 className="text-xl leading-tight mt-12 pb-3 mb-2 text-gray-700 font-bold text-center">
                {item.node.title}
              </h2>

              <article className="max-w-lg m-auto p-3">
                {documentToReactComponents(item.node.text.json, options)}
              </article>

              <div className="socials flex justify-center">
                {item.node.sociales.map(course => (
                  <a
                    className="social-item m-5 mt-20"
                    key={course.id}
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt={course.title}
                      src={course.icono.file.url}
                      width="40"
                      height="40"
                    />
                  </a>
                ))}
              </div>

              <figure className="max-w-2xl m-auto">
                <embed src="https://wakatime.com/share/@df91afc2-0c68-44f0-9ad5-d0d15e03830f/216ccde2-819e-481e-91c3-74609efdcdaa.svg"></embed>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ParticipaPage
