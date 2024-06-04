export default function Header({
    heading,
    paragraph,
    linkName,
    setIsLoginPage
}){
    return(
        <div className="mb-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <a className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer underline"
            onClick={()=>{setIsLoginPage((prev)=>!prev)}}>
                {linkName}
            </a>
            </p>
        </div>
    )
}