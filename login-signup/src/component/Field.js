const Field = (props) => {
    const borderColor=props.Error?"border-red-500":"";
    return ( 
        <>
            <label className="block text-gray-700 text-sm font-bold pt-4">
                {props.Label}
            </label>
            <input className= {`shadow appearance-none border rounded ${borderColor} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} type={props.Type} placeholder={props.Placeholder} onChange={(e)=>props.handleChange(e.target.value)}></input>
            <p>
                {props.Error?
                    <h1 className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800">
                        {props.errorMessage}
                    </h1>:""
                }
            </p>
        </>
    );
}
 
export default Field;