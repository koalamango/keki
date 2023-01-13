import * as React from "react"
import Layout from "../components/layout"

export default function NotFound() {
  return (
    <Layout>
      <h1 data-testid="not-found">NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}
