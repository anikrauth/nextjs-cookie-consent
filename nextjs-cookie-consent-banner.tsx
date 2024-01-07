'use client' 
// It's a client component

import {getCookie, setCookie} from 'cookies-next'; // Using cookies-next package to set cookies
import {useEffect, useState} from "react";
import Link from "next/link";


export default function AcceptCookie (){

    const [instantData, setInstantData] = useState<any>(undefined) // Defined a state for instant action in UI/Front-End
  
  // Used this useEffect, Because when this component/page loads for the first time, I can get a cookie, and if there is no cookie it will set one! 
    useEffect(() => {
        setInstantData(getCookie('hasCookie')); // Here I'm getting cookie

        if(getCookie('hasCookie') === undefined){
            setCookie('hasCookie', 'open'); //Here I'm setting cookie value if there is no cookie set already!
        }

    }, []);

  // Here is an arrow function, When the user clicks on Accept the cookie, It can close the banner.
    const handleCookie = () => {
        const hasCookies: any = getCookie('hasCookie'); // Here I'm checking for latest cookie value

        if(getCookie('hasCookie') === "open"){
            setCookie('hasCookie', "close"); // If it's open then I'm setting its value close.
            setInstantData(getCookie('hasCookie')) // Here I'm getting the latest value from the cookie into the state so that, we can manipulate the UI. 
        }
    }



    return (
        instantData === "open" ? ( //here if the cookie value is open then show the banner.
            <div
                className=" transition-all duration-500 border-t-4 border-primary_color shadow-2xl fixed bottom-0 w-full py-[20px] z-[100] bg-white flex justify-center items-center">
                <p className="text-[22px] font-normal">
                    Vi använder cookies för att ge dig en så bra upplevelse som möjligt på hemsidan och för anonym
                    statistik. <span><Link className="text-primary_color underline" href="/page/integritetspolicy">Läs mer här</Link></span>
                </p>
                <button className="ml-[40px] text-[18px] border-x-2 border-x-primary_color py-2 px-[20px] border"
                        type="button" onClick={handleCookie}>
                    Accept Cookies
                </button>
            </div>
        ) : getCookie('hasCookie') === undefined ? ( //if the cookie value is undefined show nothing. Because when we reload the page for some seconds the cookie value shows undefined, 
          //and our banner shows for some milliseconds, to prevent that we used this condition.
            <></>
        ) : <></>
    )
}
