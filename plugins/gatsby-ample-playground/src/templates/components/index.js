import React, { useState } from "react"
import { Helmet } from "react-helmet"
import get from "lodash/get"
import startCase from "lodash/startCase"
import toLower from "lodash/toLower"

import Variations from "../../components/variations"

import config from "@root/playground.config"

import styles from "./styles.module.scss"

const ComponentsPlayground = () => {
  const [currentColor, setCurrentColor] = useState(get(config, "themes.default") || "transparent")

  const components = Object.entries(config.components).map((cfg, idx) => {
    const compName = cfg[0]
    const { component: Component, fixtures } = cfg[1]

    return (
      <div
        key={idx}
        className={styles.comp_section}
        style={{ maxWidth: cfg[1].maxWidth || "100%" }}
      >
        <h2 id={compName} className={styles.comp_heading}>
          <a href={`#${compName}`}>{startCase(toLower(compName))}</a>
        </h2>
        <Variations component={Component} data={fixtures} />
      </div>
    )
  })

  const title = `Components | ${config.title || "Ample Playground"}`

  return (
    <div className={styles.template} style={{ backgroundColor: currentColor }}>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className={styles.header}>
        <h1>{title}</h1>

        {config.themes && (
          <ul className={styles.theme_toggle}>
            {Object.values(config.themes).map((color, idx) => (
              <li key={idx}>
                <button
                  className={currentColor === color ? styles.active : null}
                  onClick={() => setCurrentColor(color)}
                  style={{ backgroundColor: color }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.comp_wrapper}>{components}</div>
    </div>
  )
}

ComponentsPlayground.propTypes = {}

ComponentsPlayground.defaultProps = {}

export default ComponentsPlayground
