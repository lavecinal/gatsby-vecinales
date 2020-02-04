import React from "react"
//import { Link } from "gatsby"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"
import { kebabCase } from "lodash"

const MercadoPage = props => {
  const data = useStaticQuery(graphql`
    query MercadoQuery {
      mercado: allContentfulMercado {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Mercado Popular" />
      <div className="flex items-start justify-between flex-col border-b px-6 mb-4 text-left bg-white">
        <div className="hero  flex-col w-full z-10 m-0 mb-6 text-left max-w-6xl m-auto">
          <h1 className=" text-gray-800 font-hairline pt-6">Mercado Popular</h1>
          <h3 className="pl-0 text-gray-600">Todos los sábados de 9 a 14hs</h3>
        </div>
        <article className="pt-1 pb-6 max-w-6xl m-auto">
          <p className="w-1/2">
            El Mercado Popular del Paraje E.R. es un espacio en donde
            productores, elaboradores y consumidores nos encontramos para
            intercambiar lo que hacemos. Con el deseo de apoyar el desarrollo de
            una economía local, social, solidaria y justa para todes.
          </p>
          <p className="w-1/2">
            Podrás encontrar cultivos agroecológicos, dulces, tejidos, artículos
            de limpieza, cosmética, libros, artesanías, y muchas bellas
            creaciones más… Por una economía solidaria, que fortalezca los
            tejidos sociales y cuide el ambiente
          </p>
          <p className="font-bold w-1/2">
            Acercate y participá! <br /> que te estamos esperando.
          </p>
        </article>
      </div>
      <div className="hero  flex-col w-full z-10 m-0 mb-6  px-6 text-left max-w-6xl m-auto">
        <h1 className=" text-gray-800 font-hairline pt-6">Participan</h1>
      </div>
      <div className="posts flex flex-wrap max-w-6xl m-auto  px-6">
        {data.mercado.edges.map((item, i) => (
          <Link
            key={item.node.id}
            to={`/mercado/${kebabCase(item.node.slug)}/`}
            className="post text-left w-1/3 p-6 border-gray-300 border m-3 ml-0 bg-gray-100"
          >
            <h2 className="title text-xl mb-5 hover:text-green-700 text-gray-800 font-bold pb-3">
              {item.node.title}
            </h2>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default MercadoPage
