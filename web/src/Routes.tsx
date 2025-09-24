// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

import EditorialBlocks from './components/EditorialBlocks'
import AdminPanel from './pages/AdminPanel'
import LoginPage from './pages/Login'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/admin" page={AdminPanel} name="adminPanel" />
      <Route path="/c/{slug}" page={CollectionPage} name="collection" />
      <Route path="/p/{sku}" page={ProductPage} name="product" />
      <Route path="/campaigns/{slug}" page={CampaignPage} name="campaign" />
      <Route path="/editorialBlocks" page={EditorialBlocks} name="editorials" />

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
