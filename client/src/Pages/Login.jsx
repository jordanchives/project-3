
export function Login() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-[#222] rounded-xl shadow-md py8 px-8">
          <h2 className="text-[25px] font-bold text-white mb-6 text-center">
            Login</h2>
            <form action="" className="flex flex-col">
                
                
                <input placeholder="UserName" className="bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300" type="text" />
                
                <input placeholder="Password" className="bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300" type="password" />
                <button className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full text-white font-medium py-2 px-4 hover:bg-indigo-600 hover:to-blue-600 transtion ease-in duration-200"type="submit">Submit</button>
                <p className="text-white mt-4 text-center">Don't have an account?
                <a href="#" className="text-white-500 hover:underline mt-4 px-1 ">Register</a>
                </p>
                
            </form>
        </div>
    
    </div>
    );
}


export default Login;