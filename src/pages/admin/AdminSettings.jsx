import React from 'react'
import PageHeader from './components/dashboardComponents/PageHeader'
import Settings from './components/settings/Settings'

export default function AdminSettings() {
  return (
    <>
      <div className="p-2 md:p-8 flex-col">
        <PageHeader pageName="Settings" />
        <div className="rounded-xl border border-gray-200 bg-white my-6 p-4 w-[100%] ">
          <Settings />
        </div>

      </div>
    </>
  )
}
