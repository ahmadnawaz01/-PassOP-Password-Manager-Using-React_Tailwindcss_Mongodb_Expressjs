import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex h-15 justify-between px-4 items-center py-4">
                <div className="logo font-bold text-2xl">
                    
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                    </div>

                
                <button className='text-white  cursor-pointer flex justify-between items-center bg-green-700 rounded-full  my-5'>
                    <img  className='invert p-1 w-10 ' src="/icons/gitlogo.png" alt="" />
                    <span className='font-bold px-2'>Github</span>
                </button>
            </div>

        </nav>
    )
}

export default Navbar