import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  FileText,
  BarChart2,
  Briefcase,
  LogOut,
  User,
  Menu,
  X,
  Book, // Import the icon for the Blog section
  Contact, // Import the icon for the Portfolio section
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useReportStatus } from '../../hooks/useReportStatus';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { hasReport, hasJobs, isLoading } = useReportStatus();

  const navItems = [
    {
      path: '/',
      label: 'Analyze Resume',
      icon: FileText,
      alwaysShow: true,
      tooltip: 'Please submit your resume for analysis.',
    },
    {
      path: '/analysis',
      label: 'Your Analysis',
      icon: BarChart2,
      requiresReport: true,
      tooltip:
        'Please wait for your analysis or resubmit your resume if new-user.',
    },
    {
      path: '/jobs',
      label: 'Featured Jobs',
      icon: Briefcase,
      requiresJobs: true,
      tooltip:
        'Please wait for your analysis or resubmit your resume if new-user.',
    },
    // Add the Blog section
    {
      path: '/blog',
      label: 'Blog',
      icon: Book,
      alwaysShow: true,
    },
    {
      path: '/portfolio',
      label: 'Portfolio',
      icon: Contact,
      alwaysShow: true,
      tooltip:
      'Please wait for your analysis or resubmit your resume if new-user.',

    },
  ];

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg md:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 p-2 mb-8">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {user.displayName || user.email}
              </p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          <nav className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : (
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  const isDisabled = 
                    (item.requiresReport && !hasReport) || 
                    (item.requiresJobs && !hasJobs);

                  const commonClasses = `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`;

                  return (
                    <li key={item.path}>
                      {isDisabled ? (
                        <Tippy content={item.tooltip}>
                          <div className={commonClasses}>
                            {isActive && (
                              <motion.div
                                layoutId="active-nav"
                                className="absolute inset-0 bg-blue-50 rounded-xl"
                                initial={false}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 30,
                                }}
                              />
                            )}
                            <Icon className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">{item.label}</span>
                          </div>
                        </Tippy>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={commonClasses}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="active-nav"
                              className="absolute inset-0 bg-blue-50 rounded-xl"
                              initial={false}
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          )}
                          <Icon className="w-5 h-5 relative z-10" />
                          <span className="relative z-10">{item.label}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>

          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
