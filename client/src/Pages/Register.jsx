export function Register() {
    return (
        <>
    <div>
        <h1 className=""> Login Page</h1>
    </div>
    <div className="flex">
        <form className="flex text-[white]" action="">
            <label className="" htmlFor="email">Email</label>
            <input className="text-[black]" type="email" name="" id="" placeholder="Enter Email" />
            <label className="" htmlFor="UserName">UserName</label>
            <input className="text-[black]" type="text" name="" id="" placeholder="Enter UserName" />
            <label htmlFor="password">Password:</label>
            <input className="text-[black]" type="password" name="password" id="" placeholder="Enter Password" />
            <div className="bg-red-500 flex items-center">
            <div className="">    
            <button type="submit"onclick="solve()">Login</button>
            </div>
            </div>
        </form>
    </div>
        </>
    );
}


export default Register;