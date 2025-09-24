import { Metadata } from '@redwoodjs/web'
import Navbar from 'src/components/Navbar'

const CampaignPage = () => {
  return (
    <>
      <Metadata title="Campaign" />
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-900">Campaign</h1>
        <p className="mt-3 text-gray-600">This is a placeholder for a seasonal campaign landing. Wire to CMS later.</p>
      </main>
    </>
  )
}

export default CampaignPage


