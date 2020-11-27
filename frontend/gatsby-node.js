exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
  
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/shipment/)) {
      page.matchPath = `/shipment/*`
  
      // Update the page.
      createPage(page)
    }
  };