"use client"
import Logo from './logo.png';
import { BsFillMoonFill } from "react-icons/bs";
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [backgroundImage, setBackgroundImage] = useState('/images/light.jpg');
  const [logo, setLogo] = useState('./logo_l.png');
  const [textColor, setTextColor] = useState('#413E53')


  return (
    <main className="items-center w-full h-screen bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='px-32 py-10 h-full flex flex-col items-start justify-center '>
        <nav className='px-32 py-10  flex justify-between items-center fixed top-0 left-0 w-full'>
          <div className='flex gap-x-2'>
            <img src={Logo.src} alt='logo' width={50} height={50} onClick={() => {
            }} />
            <h1 className='text-6xl font-primary text-[50px] font-extrabold' style={{ color: textColor }}>TITLE</h1>
          </div>

          <div className='flex gap-x-10 justify-between items-center'>
            <button onClick={() => {
              // toggle background image and logo
              setBackgroundImage(backgroundImage === '/images/light.jpg' ? '/images/dark.jpg' : '/images/light.jpg')
              setLogo(logo === './logo_l.png' ? './logo_d.png' : './logo_l.png')
              setTextColor(textColor === '#413E53' ? '#fff' : '#413E53')
              }} className='rounded-[10px] hover:bg-[#cfd2d7] font-primary font-semibold py-4 px-4 bg-[#D8D9DB]'>
              <BsFillMoonFill className='text-primary' />
            </button>
            <button onClick={() => router.push('/auth/login')} className='rounded-[10px] px-4 py-2 hover:bg-[#cfd2d7] font-primary font-semibold bg-[#D8D9DB]'>Login</button>
            <button onClick={() => router.push('/auth/register')} className='btn'>Register</button>
          </div>
        </nav>


        <div className='flex flex-col gap-y-6'>
          {/* <p className='mt-20 font-normal leading-2 text-[16px]' style={{ color: textColor }}>
            360NFT is currently invite-only
            <br/>Here's how to <span className='text-primary'>skip the waitlist now</span>
          </p> */}

          <h1 className='text-6xl font-primary text-[58px] font-extrabold' style={{ color: textColor }}>
            GET Your 
            <br/>Title THE <span className='text-primary'>LIST</span>
          </h1>

          <p className='text-[35px] font-thin' style={{ color: textColor }}>
            Welcome friend,
            <br/>
            please log in
          </p>
        </div>
      </div>
    </main>
  )
}


// public\images\logo_d.svg