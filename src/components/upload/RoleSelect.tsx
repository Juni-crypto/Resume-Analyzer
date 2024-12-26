import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { techRoles } from '../../data/techRoles';

interface RoleSelectProps {
  onRoleSelect: (role: string) => void;
  selectedRole: string;
}

export function RoleSelect({ onRoleSelect, selectedRole }: RoleSelectProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredRoles = techRoles.filter(role =>
    role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Select Desired Role</label>
      
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 border border-gray-300 rounded-xl flex items-center justify-between cursor-pointer hover:border-blue-500 transition-colors"
        >
          <span className={selectedRole ? 'text-gray-900' : 'text-gray-500'}>
            {selectedRole || 'Select a role'}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="border-l pl-3"
          >
            ▼
          </motion.div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-64 overflow-auto"
          >
            <div className="p-2 border-b sticky top-0 bg-white">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="py-2">
              {filteredRoles.map((role) => (
                <motion.div
                  key={role}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => {
                    onRoleSelect(role);
                    setIsOpen(false);
                  }}
                >
                  {role}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}