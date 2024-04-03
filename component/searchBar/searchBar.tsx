import React, { useState } from 'react';
import { SearchDataProp } from '../dataInterface';
import style from './searchbar.module.css'

const SearchBar: React.FC<SearchDataProp> = ({onSearch }) => {
    const [search, setSearch] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value;
        setSearch(searchQuery);
        onSearch(searchQuery);
    };

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Search food..."
                className={style.searchbar}
            />
        </div>
    );
};

export default SearchBar;
