import react from 'react';

function Categories() {
    return(
    <div className="mx-[2rem] gradient pl-4 pr-2 flex items-center justify-between rounded-full py-[0.1rem]">
    <ul className="flex items-center py-1.5 text-white text-[12px] gap-10">
        <li><p>Categories</p></li>
        <li><p>News</p></li>
        <li><p>Trending</p></li>
        <li><p>Games</p></li>
        <li><p>Games</p></li>
        <li><p>Games</p></li>
    </ul>
    <input type="search" className="pl-4 rounded-full placeholder:text-black" placeholder="Search" />
    </div>

    );  
};

export default Categories;