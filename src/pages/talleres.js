import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { kebabCase } from "lodash"
import scrollTo from "gatsby-plugin-smoothscroll"
import { IoMdTime } from "react-icons/io"

const TalleresPage = () => {
  const data = useStaticQuery(graphql`
    query TalleresQuery {
      talleresLunes: allContentfulTalleres(
        sort: { fields: createdAt, order: ASC }
        filter: { diaTaller: { eq: "lunes" } }
      ) {
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
      talleresMartes: allContentfulTalleres(
        sort: { fields: createdAt, order: ASC }
        filter: { diaTaller: { eq: "martes" } }
      ) {
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
      talleresMiercoles: allContentfulTalleres(
        sort: { fields: createdAt, order: ASC }
        filter: { diaTaller: { eq: "miercoles" } }
      ) {
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
      talleresJueves: allContentfulTalleres(
        sort: { fields: createdAt, order: ASC }
        filter: { diaTaller: { eq: "jueves" } }
      ) {
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
      talleresViernes: allContentfulTalleres(
        sort: { fields: createdAt, order: ASC }
        filter: { diaTaller: { eq: "viernes" } }
      ) {
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
      talleresSabado: allContentfulTalleres(
        sort: { fields: createdAt, order: ASC }
        filter: { diaTaller: { eq: "sábado" } }
      ) {
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
      talleresDomingo: allContentfulTalleres(
        sort: { fields: createdAt, order: ASC }
        filter: { diaTaller: { eq: "domingo" } }
      ) {
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
      <SEO title="Talleres" />
      <div className="bg-gray-300">
        <div class="bg-gray-300 text-center py-4 lg:px-4 max-w-6xl m-auto">
          <div
            class="py-2 bg-gray-400 items-center text-gray-800 leading-none lg:rounded-full flex lg:inline-flex w-full"
            role="alert"
          >
            <span class="flex rounded-full bg-gray-800 text-white uppercase px-2 py-1 text-xs font-bold mx-3">
              Novedades!
            </span>
            <span class="font-semibold mr-2 text-left flex-1">
              Origami para principiantes y avanzado / Tai Chi / Bienparidas
            </span>
            <IoMdTime className="w-5 h-5" />
            <time className="px-3 mr-3 font-bold">Actualizado hace 3 hrs</time>
          </div>
        </div>
      </div>
      <div className="talleres w-full z-10 hero m-0 bg-gray-100">
        <div className="inner max-w-6xl flex flex items-center m-auto flex-col py-8 pb-3">
          <h1 className="text-left w-full">Talleres </h1>
          <div className="filters ">
            <button
              className="btn bg-pattern bg-purple-500 hover:bg-purple-600 hover:text-white"
              onClick={() => scrollTo("#lunes")}
            >
              lunes
            </button>
            <button
              className="btn bg-pattern bg-orange-500 hover:bg-orange-600 hover:text-white"
              onClick={() => scrollTo("#martes")}
            >
              martes
            </button>
            <button
              className="btn bg-pattern bg-indigo-500 hover:bg-indigo-600 hover:text-white"
              onClick={() => scrollTo("#miercoles")}
            >
              miercoles
            </button>
            <button
              className="btn bg-pattern bg-yellow-500 hover:bg-yellow-600  hover:text-white"
              onClick={() => scrollTo("#jueves")}
            >
              jueves
            </button>
            <button
              className="btn bg-pattern bg-red-500 hover:bg-red-600 hover:text-white"
              onClick={() => scrollTo("#viernes")}
            >
              viernes
            </button>
            <button
              className="btn bg-pattern bg-blue-500 hover:bg-blue-600 hover:text-white"
              onClick={() => scrollTo("#sabado")}
            >
              Sabado
            </button>
            <button
              className="btn bg-pattern bg-teal-500 hover:bg-teal-600 hover:text-white"
              onClick={() => scrollTo("#domingo")}
            >
              domingo
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white talleres pb-20">
        <div
          id="lunes"
          className="posts flex flex-wrap justify-start max-w-6xl m-auto"
        >
          <h3 className="text-left w-full text-2xl text-purple-600 font-bold pt-4 pb-2">
            Lunes
          </h3>
          {data.talleresLunes.edges.map((item, i) => (
            <div
              key={item.node.id}
              className="post bg-pattern  bg-purple-500 text-white  rounded-lg"
            >
              <Link to={`/talleres/${kebabCase(item.node.slug)}/`}>
                <h3 className="text-xl ">{item.node.title}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div
          id="martes"
          className="posts flex flex-wrap justify-start max-w-6xl m-auto"
        >
          <h3 className="text-left w-full text-2xl text-orange-600 font-bold pt-4 pb-2">
            Martes
          </h3>
          {data.talleresMartes.edges.map((item, i) => (
            <div
              key={item.node.id}
              className="post bg-pattern text-center bg-orange-500 text-white  rounded-lg"
            >
              <Link to={`/talleres/${kebabCase(item.node.slug)}/`}>
                <h3 className="text-xl ">{item.node.title}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div
          id="miercoles"
          className="posts flex flex-wrap justify-start max-w-6xl m-auto"
        >
          <h3 className="text-left w-full text-2xl text-indigo-600 font-bold pt-4 pb-2">
            Miercoles
          </h3>
          {data.talleresMiercoles.edges.map((item, i) => (
            <div
              key={item.node.id}
              className="post bg-pattern text-center bg-indigo-500 text-white  rounded-lg"
            >
              <Link to={`/talleres/${kebabCase(item.node.slug)}/`}>
                <h3 className="text-xl ">{item.node.title}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div
          id="jueves"
          className="posts flex flex-wrap justify-start max-w-6xl m-auto"
        >
          <h3 className="text-left w-full text-2xl text-yellow-500 font-bold pt-4 pb-2">
            Jueves
          </h3>
          {data.talleresJueves.edges.map((item, i) => (
            <div
              key={item.node.id}
              className="post bg-pattern text-center bg-yellow-600 text-white  rounded-lg"
            >
              <Link to={`/talleres/${kebabCase(item.node.slug)}/`}>
                <h3 className="text-xl ">{item.node.title}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div
          id="viernes"
          className="posts flex flex-wrap justify-start max-w-6xl m-auto"
        >
          <h3 className="text-left w-full text-2xl text-red-600 font-bold pt-4 pb-2">
            Viernes
          </h3>
          {data.talleresViernes.edges.map((item, i) => (
            <div
              key={item.node.id}
              className="post bg-pattern text-center bg-red-500 text-white  rounded-lg"
            >
              <Link to={`/talleres/${kebabCase(item.node.slug)}/`}>
                <h3 className="text-xl ">{item.node.title}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div
          id="sabado"
          className="posts flex flex-wrap justify-start max-w-6xl m-auto"
        >
          <h3 className="text-left w-full text-2xl text-blue-600 font-bold pt-4 pb-2">
            Sábado
          </h3>
          {data.talleresSabado.edges.map((item, i) => (
            <div
              key={item.node.id}
              className="post bg-pattern text-center bg-blue-500 text-white  rounded-lg"
            >
              <Link to={`/talleres/${kebabCase(item.node.slug)}/`}>
                <h3 className="text-xl ">{item.node.title}</h3>
              </Link>
            </div>
          ))}
        </div>
        <div
          id="domingo"
          className="posts flex flex-wrap justify-start max-w-6xl m-auto"
        >
          <h3 className="text-left w-full text-2xl text-teal-600 font-bold pt-4 pb-2">
            Domingo
          </h3>
          {data.talleresDomingo.edges.map((item, i) => (
            <div
              key={item.node.id}
              className="post bg-pattern text-center bg-teal-500 text-white  rounded-lg"
            >
              <Link to={`/talleres/${kebabCase(item.node.slug)}/`}>
                <h3 className="text-xl ">{item.node.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default TalleresPage
