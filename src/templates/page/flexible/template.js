import React from "react"
import PropTypes from "prop-types"

import styles from "./styles.module.scss"

import Layout from "@src/layout"

import Container from "@src/layout/container"

const FlexiblePage = ({ children, containers, title }) => (
  <Layout>
    {children}
    <div className={styles.page}>
      <h1>{title}</h1>
      {containers.map((section, idx) => (
        <Container key={idx} {...section} />
      ))}
    </div>
  </Layout>
)

FlexiblePage.propTypes = {
  /**
   * Components to inject before the page content.
   */
  children: PropTypes.node,
  /**
   * An array of containers that get mapped to the <Container /> component.
   */
  containers: PropTypes.arrayOf(PropTypes.object),
  /**
   * Title of the page, displayed as the page's <h1> value.
   */
  title: PropTypes.string
}

FlexiblePage.defaultProps = {
  containers: []
}

export default FlexiblePage
