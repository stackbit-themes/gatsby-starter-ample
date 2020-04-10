import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
// import dig from "object-dig"

// import { flattenFrontmatter, normalizeImages } from "../helpers"

import Page from "../templates/page"

const HomePageAdapter = ({ data, location }) => {
  // let page = flattenFrontmatter(data.page)
  // normalizeImages(page)

  // const seo = {
  //   baseUrl: location.origin,
  //   url: location.href,
  //   ...page.seo,
  //   title: dig(page, "seo", "title") || page.title,
  //   image: dig(page, "seo", "image") || dig(page, "jumbotron", "image")
  // }

  // return <Page jumbotron={page.jumbotron} sections={page.sections} seo={seo} />

  return <Page sections={data.page.frontmatter.sections} />
}

HomePageAdapter.propTypes = {
  /** Data coming from markdown files. */
  data: PropTypes.shape({}).isRequired
}

HomePageAdapter.defaultProps = {}

export const query = graphql`
  query HomePageAdapterQuery {
    page: markdownRemark(fileAbsolutePath: { regex: "/content/pages/index.md/" }) {
      ...PageAttributes
    }
  }
`

export default HomePageAdapter
