const HomeLoader = () => {
    return ( 
        <div className="container mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-3 my-12 animate-pulse duration-100" >
            <div className=" cursor-pointer space-y-3 ">
                <div className="h-[200px] bg-gray-300 rounded-sm" />
                <div className="h-4 bg-gray-300 rounded-sm" />
                <div className="h-3 w-5/12 bg-gray-300 rounded-sm" />
            </div>
            <div className=" hidden sm:block cursor-pointer space-y-3 ">
                <div className="h-[200px] bg-gray-300 rounded-sm" />
                <div className="h-4 bg-gray-300 rounded-sm" />
                <div className="h-3 w-5/12 bg-gray-300 rounded-sm" />
            </div>
            <div className=" hidden md:block  cursor-pointer space-y-3 ">
                <div className="h-[200px] bg-gray-300 rounded-sm" />
                <div className="h-4 bg-gray-300 rounded-sm" />
                <div className="h-3 w-5/12 bg-gray-300 rounded-sm" />
            </div>
            <div className=" hidden lg:block  cursor-pointer space-y-3 ">
                <div className="h-[200px] bg-gray-300 rounded-sm" />
                <div className="h-4 bg-gray-300 rounded-sm" />
                <div className="h-3 w-5/12 bg-gray-300 rounded-sm" />
            </div>
        </div>
     );
}
 
export default HomeLoader;