import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

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

    const copyText = (text) => {
        toast.success('Copied To Clipboard');
        navigator.clipboard.writeText(text);
    }

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passref.current.type = "password"
        }
        else {
            passref.current.type = "text";
            ref.current.src = "icons/eyecross.png";
        }
    }

    const savepassword = () => {
        if(form.site.length>3 && form.site.username>3 && form.site.password>4)
        {
            const newEntry = { ...form, id: uuidv4() };
            const updatedArray = [...passwordarrays, newEntry];
            setpasswordarrays(updatedArray);
            localStorage.setItem("password", JSON.stringify(updatedArray));
            setform({ site: "", username: "", password: "" });
            toast.success('Password Saved Successfully!');
        }
        else{
            toast.success('Error! Password not Saved');
        }
    }

    const editpassword = (id) => {
        const itemToEdit = passwordarrays.find(item => item.id === id);
        setform(itemToEdit)
        const newarray = passwordarrays.filter(item => item.id !== id);
        setpasswordarrays(newarray);
    }

    const deletepassword = (id) => {
        const updatedArray = passwordarrays.filter(item => item.id !== id);
        setpasswordarrays(updatedArray);
        localStorage.setItem("password", JSON.stringify(updatedArray));
        toast.success('Password Deleted Successfully!')
    }

    const formatUrl = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    };

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} theme="light" />
            
            <div className="fixed top-0 z-[-2] h-full w-full bg-green-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

           
            <div className="p-2 md:p-0 md:mycontainer min-h-[88vh] mx-auto max-w-4xl">
                <h1 className='text-4xl text font-bold text-center'> 
                    <span className='text-green-500'>&lt;</span>Pass<span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-center text-lg' >Your Own Password Manager</p>

                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter the Website URL' className='rounded-full bg-white border border-green-500 w-full p-4 py-1' type="text" name='site' />
                    
                   
                    <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
                        <input onChange={handlechange} value={form.username} placeholder='Enter Username' className='bg-white rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' />

                        <div className="relative w-full">
                            <input value={form.password} onChange={handlechange} placeholder='Enter Password' className='bg-white rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' ref={passref} />
                            <span onClick={showPassword} className='absolute cursor-pointer p-2 top-0 right-1'>
                                <img ref={ref} width={20} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savepassword} className='flex w-fit  justify-center items-center rounded-full gap-2 px-8 py-2 bg-green-400 border border-green-900 hover:bg-green-300 transition-all' >
                        <lord-icon src="https://cdn.lordicon.com/vjgknpfx.json" trigger="hover"></lord-icon>
                        Add Password
                    </button>
                </div>

                <div className="passwords px-4 md:px-0 mt-4">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordarrays.length === 0 && <div>No Passwords to Show</div>}
                    
                    {passwordarrays.length != 0 && 
                        <div className="overflow-x-auto w-full rounded-md border border-green-800">
                            <table className="table-auto w-full">
                                <thead className='bg-green-800 text-white'>
                                    <tr>
                                        <th className='py-2 px-4'>Site</th>
                                        <th className='py-2 px-4'>Username</th>
                                        <th className='py-2 px-4'>Password</th>
                                        <th className='py-2 px-4'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-100'>
                                    {passwordarrays.map((item, index) => {
                                        return <tr key={index}>
                                            <td className='py-2 border border-white text-center'>
                                                <div className='flex justify-center items-center gap-2 px-2'>
                                                    <a href={formatUrl(item.site)} target='_blank' className='truncate max-w-30 md:max-w-none'>{item.site}</a>
                                                    <div className='cursor-pointer flex items-center' onClick={() => copyText(item.site)}>
                                                        <lord-icon style={{ "width": "20px", "height": "20px" }} src="https://cdn.lordicon.com/tsrgicte.json" trigger="hover"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center '>
                                                <div className='flex justify-center items-center gap-2 px-2'>
                                                    <span>{item.username}</span>
                                                    <div className='cursor-pointer flex items-center' onClick={() => copyText(item.username)}>
                                                        <lord-icon style={{ "width": "20px", "height": "20px" }} src="https://cdn.lordicon.com/tsrgicte.json" trigger="hover"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center '>
                                                <div className='flex justify-center items-center gap-2 px-2'>
                                                    <span>{item.password}</span>
                                                    <div className='cursor-pointer flex items-center' onClick={() => copyText(item.password)}>
                                                        <lord-icon style={{ "width": "20px", "height": "20px" }} src="https://cdn.lordicon.com/tsrgicte.json" trigger="hover"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center '>
                                                <div className='flex justify-center items-center gap-2'>
                                                    <span className='cursor-pointer' onClick={() => editpassword(item.id)}>
                                                        <lord-icon src="https://cdn.lordicon.com/exymduqj.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer' onClick={() => deletepassword(item.id)}>
                                                        <lord-icon src="https://cdn.lordicon.com/jzinekkv.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager