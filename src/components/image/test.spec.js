import React from "react"
import renderer from "react-test-renderer"

import fixtures from "./fixtures"

import Image from "./"

describe("Image", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Image src="https://via.placeholder.com/300" alt="Image from https://placehold.it" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("will render null if the src object is not the correct format", () => {
    const src = { childImageSharp: { wrongKey: { src: "..." } } }
    const tree = renderer.create(<Image src={src} alt="alt ..." />).toJSON()
    expect(tree).toBeNull()
  })
  it("will render with a proper fluid image", () => {
    const tree = renderer.create(<Image src={fixtures.fluid} alt="alt ..." />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("will render with a proper fluid image and a default alt attribute", () => {
    const tree = renderer.create(<Image src={validFluidSrc} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("will render with a proper fixed image", () => {
    const tree = renderer.create(<Image src={fixtures.fixed} alt="alt ..." />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
