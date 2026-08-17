'use client';

import { useState } from 'react';

interface SearchFormProps {
  onSearch: (address: string) => void;
  isLoading?: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSearch(address.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter a street address..."
          className="w-full px-6 py-4 bg-transparent border-b-2 border-deep-slate/20 text-deep-slate placeholder:text-deep-slate/40 font-body text-lg focus:outline-none focus:border-copper-accent transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !address.trim()}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-6 py-2 text-copper-accent font-display font-semibold tracking-wide hover:text-deep-slate transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Check Schools'}
        </button>
      </div>
    </form>
  );
}
