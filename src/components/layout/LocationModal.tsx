'use client';

import { useState, useMemo } from 'react';
import CustomSelect from '@/components/ui/CustomSelect';
import { allCountries } from '@/lib/data/countries'; 
import { State } from 'country-state-city'; 

interface Props {
  onClose: () => void;
  onSelect: (location: string) => void;
}

// Kamus Bahasa Indonesia untuk negara-negara populer agar bisa dicari (misal: "jepang", "amerika")
const countryAliases: Record<string, string> = {
  JP: 'jepang',
  US: 'amerika amerika serikat usa',
  GB: 'inggris britania raya uk',
  CN: 'cina tiongkok china',
  KR: 'korea korsel korea selatan',
  DE: 'jerman',
  FR: 'prancis perancis',
  ES: 'spanyol',
  IT: 'itali italia',
  NL: 'belanda',
  MY: 'malaysia',
  SG: 'singapura',
  TH: 'thailand',
  VN: 'vietnam',
  PH: 'filipina',
  AU: 'australia',
  NZ: 'selandia baru',
  SA: 'arab saudi',
  AE: 'uni emirat arab',
  EG: 'mesir',
  TR: 'turki',
  RU: 'rusia',
  IN: 'india',
  ID: 'indonesia',
};

export default function LocationModal({ onClose, onSelect }: Props) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const countryOptions = useMemo(() => {
    return allCountries.map((c) => ({
      value: c.code,
      label: c.name, // Nama bahasa Inggris (tetap ditampilkan di layar)
      keywords: countryAliases[c.code] || '', // Alias bahasa Indonesia (untuk pencarian)
    }));
  }, []);

  const stateOptions = useMemo(() => {
    if (!selectedCountry) return [];
    const states = State.getStatesOfCountry(selectedCountry) || [];
    return states.map((s) => ({
      value: s.isoCode,
      label: s.name,
    }));
  }, [selectedCountry]);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setSelectedState('');
  };

  const handleApply = () => {
    const countryName = allCountries.find((c) => c.code === selectedCountry)?.name;
    const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name;
    
    if (stateName && countryName) {
      onSelect(`${stateName}, ${countryName}`);
    } else if (countryName) {
      onSelect(countryName);
    } else {
      onSelect('All Locations');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-145 p-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8 mt-2">
          <h3 className="text-[28px] font-medium text-gray-900 mb-3">Select Location</h3>
          <p className="text-[16px] text-gray-500">Filter products by location</p>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <CustomSelect
              placeholder="Country"
              options={countryOptions}
              value={selectedCountry}
              onChange={handleCountryChange}
            />
          </div>
          
          <div>
            <CustomSelect
              placeholder="State"
              options={stateOptions}
              value={selectedState}
              onChange={setSelectedState}
              disabled={!selectedCountry || stateOptions.length === 0} 
            />
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full py-3.5 text-[16px] font-medium text-white rounded bg-[#00a991] hover:bg-[#00927e] transition-colors"
        >
          Select Location
        </button>
      </div>
    </div>
  );
}