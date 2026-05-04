'use client';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your admin preferences and configuration</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 max-w-2xl">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
              <input
                type="text"
                placeholder="Your store name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
              <input
                type="email"
                placeholder="store@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
              />
            </div>
          </div>
        </div>

        {/* Inventory Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Low Stock Alert</label>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Low Stock Threshold</label>
              <input
                type="number"
                placeholder="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full px-6 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 font-medium">
          Save Settings
        </button>
      </div>
    </div>
  );
}
