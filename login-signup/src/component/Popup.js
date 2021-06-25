const Popup = (props) => {
    console.log(props.title)
    return ( 
        <div className="bg-white rounded md:w-1/3 w-1/2 border shadow-lg absolute self-center">
            <div className="rounded-t bg-teal-500">
            <div className="relative py-3 px-2 flex">
                <span className="font-semibold text-green-700 md:text-base text-sm">{props.title}</span>
            </div>
            </div>
            <div className="bg-gray-200 md:text-base text-sm border-b p-2 h-24 font-extrabold text-green-600">
                <p>{props.message}</p>
            </div>
            <div className="p-2 flex justify-end rounded-b">
                <button className="focus:outline-none py-1 px-2 md:py-2 md:px-3 w-24 mr-2 bg-blue-700 hover:bg-blue-600 text-white rounded" onClick={props.goToLogin}>OK</button>
            </div>
        </div>
    );
}
 
export default Popup;