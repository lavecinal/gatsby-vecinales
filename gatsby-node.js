const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const tallerPost = path.resolve("./src/templates/taller.js")
    const agendaPost = path.resolve("./src/templates/agenda.js")
    const mercadoPost = path.resolve("./src/templates/mercado.js")

    resolve(
      graphql(
        `
          {
            allContentfulTalleres {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulAgenda {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulMercado {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const taller = result.data.allContentfulTalleres.edges
        taller.forEach((taller, index) => {
          createPage({
            path: `/talleres/${taller.node.slug}/`,
            component: tallerPost,
            context: {
              slug: taller.node.slug,
            },
          })
        })

        const agenda = result.data.allContentfulAgenda.edges
        agenda.forEach((agenda, index) => {
          createPage({
            path: `/agenda/${agenda.node.slug}/`,
            component: agendaPost,
            context: {
              slug: agenda.node.slug,
            },
          })
        })

        const mercado = result.data.allContentfulMercado.edges
        mercado.forEach((mercado, index) => {
          createPage({
            path: `/mercado/${mercado.node.slug}/`,
            component: mercadoPost,
            context: {
              slug: mercado.node.slug,
            },
          })
        })
      })
    )
  })
}
