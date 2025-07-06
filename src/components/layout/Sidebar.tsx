
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Truck,
  MapPin,
  Users,
  BarChart3,
  Settings,
  Package,
  Route,
  AlertTriangle,
  DollarSign,
  Brain,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Shipments', href: '/shipments', icon: Package },
  { name: 'Planning', href: '/planning', icon: Route },
  { name: 'Execution', href: '/execution', icon: Play },
  { name: 'Tracking', href: '/tracking', icon: MapPin },
  { name: 'Carriers', href: '/carriers', icon: Truck },
  { name: 'Intelligence Insights', href: '/ai-insights', icon: Brain },
  { name: 'Procurement', href: '/procurement', icon: DollarSign },
  { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-slate-900 text-white h-screen">
      <div className="flex items-center justify-center h-16 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Package className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">Shipme</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-slate-400">Logistics Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
