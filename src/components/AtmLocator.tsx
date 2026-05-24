/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOCATION_DATA } from '../data';
import { LocationItem } from '../types';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  Map, 
  Layers, 
  CheckCircle2, 
  Phone, 
  MapPinCheck
} from 'lucide-react';

export default function AtmLocator() {
  const [zipQuery, setZipQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | 'Branch' | 'Atm' | 'Itm'>('All');
  const [selectedLocation, setSelectedLocation] = useState<LocationItem>(LOCATION_DATA[0]);

  // Handle Search submit
  const handleUrlSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipQuery.trim()) return;
    
    // Simulate finding matching point
    const found = LOCATION_DATA.find(
      loc => loc.zip === zipQuery || loc.city.toLowerCase().includes(zipQuery.toLowerCase())
    );

    if (found) {
      setSelectedLocation(found);
    }
  };

  const filteredLocations = LOCATION_DATA.filter((loc) => {
    if (selectedType === 'All') return true;
    return loc.type.toLowerCase() === selectedType.toLowerCase();
  });

  return (
    <section id="locator" className="py-20 bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-bold uppercase tracking-wider font-display">
            <Navigation className="w-3.5 h-3.5" />
            Cooperative Network Locator
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-snug">
            Always close. Always connected.
          </h2>
          <p className="text-slate-500 text-sm">
            Access over 55,000 surcharge-free Co-Op ATMs and branch trust offices nationwide. Enter your location below to map contiguous points.
          </p>
        </div>

        {/* Input bar and Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8">
          
          <form onSubmit={handleUrlSearch} className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Enter City, State, or Zip Code (e.g., 10005)"
              value={zipQuery}
              onChange={(e) => setZipQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary-500 text-xs px-4 py-3 pl-10 rounded-xl focus:outline-none transition-all text-slate-800 font-semibold"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <button 
              type="submit" 
              className="absolute right-2 top-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg uppercase cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
            {['All', 'Branch', 'Atm', 'Itm'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type as any)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedType === type 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {type === 'All' ? 'View All' : type === 'Itm' ? 'ITM Video Kiosk' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Main interactive section with Mock Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Left panel: List of Locations (Columns 5/12) */}
          <div className="lg:col-span-5 h-[360px] sm:h-[480px] overflow-y-auto pr-2 space-y-3 scrollbar">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer text-left relative overflow-hidden flex gap-4 ${
                      isSelected 
                        ? 'bg-primary-50/50 border-primary-500 shadow-xs' 
                        : 'bg-slate-50/50 border-slate-250/70 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="p-2.5 bg-white rounded-xl h-fit border border-slate-205 shadow-2xs">
                      <MapPin className={`w-5 h-5 ${isSelected ? 'text-primary-700' : 'text-slate-400'}`} />
                    </div>

                    <div className="space-y-1.5 flex-1 select-none">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-display font-black text-xs sm:text-sm text-slate-900 leading-tight">
                          {loc.name}
                        </h4>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0 ${
                          loc.type === 'Branch' ? 'bg-primary-100 text-primary-800' : loc.type === 'Itm' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {loc.type}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500">
                        {loc.address}, {loc.city} &middot; <span className="font-bold text-slate-700">{loc.zip}</span>
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <Navigation className="w-3 h-3 text-gold-600" />
                        <span>Distance: <strong className="text-slate-700">{loc.distance}</strong></span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <Layers className="w-8 h-8 mx-auto stroke-1" />
                <p className="text-xs">No contiguous endpoints found in selected filter.</p>
              </div>
            )}
          </div>

          {/* Right panel: Map Representation & Details Showcase (Columns 7/12) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Elegant Mock Interactive Map Vector Vector Canvas */}
            <div className="relative flex-1 bg-slate-900 rounded-2xl h-[240px] sm:h-[280px] overflow-hidden border border-slate-800 select-none">
              
              {/* Simulated Map Background Drawing Grid */}
              <div className="absolute inset-0 bg-slate-950 bg-grid-pattern opacity-40" />
              <div className="absolute top-1/2 left-1/4 w-full h-[3px] bg-slate-800/50 -rotate-12 transform origin-left" />
              <div className="absolute top-1/4 left-1/2 w-[3px] h-full bg-slate-850/60" />
              <div className="absolute top-2/3 left-0 w-full h-[2px] bg-slate-800/40" />

              {/* Glowing Landmark Points */}
              <div className="absolute top-12 left-20 text-[9px] text-slate-600 font-bold uppercase">Battery Park</div>
              <div className="absolute top-48 left-1/2 text-[9px] text-slate-600 font-bold uppercase">Financial Sector</div>

              {/* Pins Mapping */}
              {filteredLocations.map((loc, index) => {
                const isPinSelected = loc.id === selectedLocation.id;
                // Relative spacing simulation inside grid canvas
                const leftPos = `${Math.min(90, Math.max(10, 40 + ((loc.lng + 74.0) * 1000 % 40)))}%`;
                const topPos = `${Math.min(90, Math.max(10, 50 - ((loc.lat - 40.7) * 1000 % 40)))}%`;

                return (
                  <motion.button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className="absolute cursor-pointer z-20 group"
                    style={{ left: leftPos, top: topPos }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="relative">
                      {isPinSelected ? (
                        <>
                          <span className="absolute -top-1 -left-1 animate-ping inline-flex h-8 w-8 rounded-full bg-primary-500 opacity-40" />
                          <div className="p-1.5 bg-primary-600 rounded-full text-white border-2 border-white shadow-lg relative z-10">
                            <MapPinCheck className="w-5 h-5" />
                          </div>
                          <div className="absolute top-10 transform -translate-x-[40%] bg-slate-950 text-white font-mono text-[9px] px-2.5 py-1 rounded-md border border-slate-800 z-30 shadow-2xl whitespace-nowrap">
                            {loc.name.split(' ')[0]}
                          </div>
                        </>
                      ) : (
                        <div className="p-1.5 bg-slate-805 hover:bg-primary-700/80 rounded-full text-slate-350 border border-slate-700 shadow relative z-10 transition-colors">
                          <MapPin className="w-4 h-4 text-gold-400" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}

              {/* Map Floating Control overlay */}
              <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-[9px] px-2.5 py-1.5 border border-slate-800 rounded-lg text-slate-300 flex items-center gap-1.5 select-none font-semibold">
                <Clock className="w-3 h-3 text-gold-400" />
                <span>24/7 Security Patrol Active</span>
              </div>
            </div>

            {/* Selected Location Core Metadata */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-180 text-left space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <h3 className="font-display font-black text-slate-900 leading-none">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedLocation.address} &middot; {selectedLocation.city}, {selectedLocation.zip}
                  </p>
                </div>
                
                <a 
                  href={`tel:+18005553224`}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-xl shadow-2xs hover:shadow-inner transition-all hover:bg-slate-50"
                >
                  <Phone className="w-3.5 h-3.5 text-primary-600" />
                  <span>Call Branch</span>
                </a>
              </div>

              {/* Dynamic hours display */}
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <h5 className="font-display font-bold text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Lobby & Drive-up Schedules
                </h5>
                <ul className="space-y-1 pl-1">
                  {selectedLocation.hours.map((hour, idx) => (
                    <li key={idx} className="text-xs text-slate-600 tracking-wide font-medium">
                      {hour}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features checkable items */}
              <div className="space-y-2">
                <h5 className="font-display font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                  Location Specific Capabilities
                </h5>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedLocation.features.map((feat, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-[10px] bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium shadow-3xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
