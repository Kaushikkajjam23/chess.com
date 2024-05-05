export const Button=({onClick}:{onClick:()=>void})=>{
    return <div className="">
        <button onClick={()=>navigate("/game")}
        className="bg-blue-500 hover:bg-blue-700 text-whitefont-bold py-2 px-4 rounded ">
        Play Online</button>
    </div>
}