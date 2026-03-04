import React from 'react'
import { useRef, useState, useEffect } from 'react'

const Manager = () => {
    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarrays, setpasswordarrays] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("password");
        if (passwords) {
            setpasswordarrays(JSON.parse(passwords));
        }
    }, [])



    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passref.current.type="password"
        }
        else {
            passref.current.type="text";
            ref.current.src = "icons/eyecross.png";
        }

    }

    const savepassword = () => {
        setpasswordarrays([...passwordarrays, form]);
        localStorage.setItem("password", JSON.stringify([...passwordarrays, form]));
        console.log([...passwordarrays, form]);

    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>


            <div className="mycontainer">
                <h1 className='text-4xl text font-bold text-center'> <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span></h1>
                <p className='text-green-900 text-center text-lg' >Your Own Password Manager</p>



                <div className='flex flex-col p-4 text-black gap-6 items-center'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter the Website URL' className='rounded-full bg-white border border-green-500 w-full p-4 py-1' type="text" name='site' id='' />
                    <div className="flex w-full gap-5 justify-between">
                        <input onChange={handlechange} value={form.username} placeholder='Enter Username' className='bg-white rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='' />

                        <div className="relative">


                            <input value={form.password} onChange={handlechange} placeholder='Enter Password' className='bg-white rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' ref={passref} id='' />
                            <span onClick={showPassword} className='absolute cursor-pointer p-2 top-0 right-0'>
                                <img ref={ref} width={20} src="icons/eye.png" alt="" />
                            </span>

                        </div>
                    </div>
                    <button onClick={savepassword} className='flex w-fit font-normal justify-center items-center rounded-full gap-2 px-4 py-2 bg-green-400 border border-green-900 hover:bg-green-300' ><lord-icon
                        src="https://cdn.lordicon.com/vjgknpfx.json"
                        trigger="hover">
                    </lord-icon>
                        Add Password</button>


                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordarrays.length===0 && <div>No Passwords to Show</div>}
                    {passwordarrays.length!=0 &&  <table className="table-auto w-full overflow-hidden rounded-md ">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordarrays.map((item, index)=>{
                                return <tr key={index}>
                                <td className='py-2 border border-white text-center w-32'><a href={item.site} target='_blank' >{item.site}</a></td>
                                <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                                <td className='py-2 border border-white text-center w-32'>{item.password}</td>
                            </tr>
                            })}
                        </tbody>
                    </table>}
                   
                </div>
            </div>
        </>
    )
}

export default Manager