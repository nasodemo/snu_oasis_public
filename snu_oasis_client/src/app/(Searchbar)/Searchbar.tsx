"use client"

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import styles from './searchbar.module.css';
import {FaSearch} from 'react-icons/fa';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDropbox, setShowDropbox] = useState<boolean>(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropbox(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) {  
      router.push(`/${searchQuery}`);
    }
    setSearchQuery('');
  };

  const handleSearchClick = () => {
    setShowDropbox(true);
  };

  return (
    <div className={styles.relativePosition}>
      <form id="searchbar" onSubmit={handleSearch} className={styles.searchBarForm}>
        &nbsp;
        <input
          id="keyword"
          name="keyword"
          type="text"
          placeholder=" # Key Word"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={handleSearchClick}
          className={styles.searchInput}
        />
        &nbsp;&nbsp;
        <button id="submitbutton" type="submit" className={styles.submitButton}>
          <div className={styles.search}><FaSearch></FaSearch></div>
        </button>
      </form>
        
      {showDropbox && (
        <div ref={dropdownRef} className={styles.dropbox}>
          <p style={{fontSize:'10px', color:'grey'}}>검증 완료된 예시 키워드가 표시됩니다.</p>
          <Link href='/climatechange' className={styles.linkStyle}>기후변화</Link>
        </div>
      )}
      
    </div>
  );
};

export default SearchBar;
