/* Home-Component*/

import { useState, useEffect } from 'react';
import './Home.css';
import Header from '../components/Header'
import Footer from '../components/Footer';
import aboutUs1 from '../../src/assets/aboutUs1.png'
import aboutUs2 from '../../src/assets/aboutUs2.png'
import aboutUs3 from '../../src/assets/aboutUs3.png'
import img1 from '../../src/assets/img1.jpg'
import img2 from '../../src/assets/img2.jpg'
import movie from '../../src/assets/video.mp4'

function Home() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [storages, setStorages] = useState([]);
    const [paths, setPaths] = useState([]);

    //alle SVG Elemente laden
    useEffect(() => {
        const p = Array.from(document.querySelectorAll('path'));
        setPaths(p);
    }, []);

    //alle Objekte laden
    useEffect(() => {
        fetchStorages();
    }, []);

    //Detailfenster beim Hover für SVG-Plan
    useEffect(() => {
        const tooltip = document.createElement('div'); 
        tooltip.classList.add('tooltip'); 
        document.body.appendChild(tooltip);

        for (const object of storages) {
            const e = document.getElementById(object.id);
            if (e) {
                if (object.booked === false) {
                    e.style.fill = "#F9A800";
                    e.onmouseenter = () => {
                        const infoText = `Objekt: ${object.name} <br>Typ: ${object.storagetype} <br>Gr&ouml;&szlig;e: ${object.roomSize} m&sup2; <br>Preis: ${object.price} &euro;`;

                        tooltip.innerHTML = infoText;

                        tooltip.style.left = `${event.pageX + 10}px`; 
                        tooltip.style.top = `${event.pageY + 10}px`; 

                        tooltip.style.display = 'block';
                    };

                    e.onmouseleave = () => {
                        tooltip.style.display = 'none';
                    };

                } else {
                    e.style.fill = "grey";
                }
            }
        }
    }, [storages]);

    //alle Objekte laden
    async function fetchStorages() {
        try {
            const response = await fetch(url + 'Storage/allobjects');
            const data = await response.json();
            setStorages(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Objekte:', error);
        }
    }

    return (
        <div className="Home">
            <Header /> 
            <main>
                <section className="section1" id="content">
                    <video autoPlay loop muted>
                        <source src={movie} type="video/mp4"/>
                    </video>
                    <img src={img1} alt="Immobilie" />
                    <div className="text-content">
                        <h2>Suchst du einen Raum zur Miete?</h2>
                        <h3>Garagen, Lager und B&uuml;ros</h3>
                        <p>Unsere Portfolio beinhaltet Garagen und B&uuml;ros</p>
                        <h3>in zentraler Lage</h3>
                        <p>Perfekte Lage am Seespitz in Zell am See</p>
                        <h3>mit Sicherheit und Vertrauen</h3>
                        <p>Video&uuml;berwachung und Kontrollfahrten am Hof</p>
                    </div>
                </section>

                <section className="section2">
                    <div className="text-content">
                        <h2>Mit Lichtgeschwindigkeit zu deiner Immobilie</h2>
                        <p>1. Informiere dich auf der Homepage</p>
                        <p>2. Kontaktiere uns bei Interesse oder Fragen</p>
                        <p>3. Besichtige das Objekt</p>
                        <p>4. Ziehe in deinen neuen Raum ein</p>
                    </div>
                    <img src={img2} alt="Immobilie" />
                </section>

               
                <section className="garageparkPlan" id="plan">
                    <div className="plan">
                        <h1>Garagenpark - &Uuml;bersicht</h1>
                        <h1>Zell am See</h1>
                        <div className="svg">
                            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.61 643.95">
                                <defs>
                                    <style>{`.b{fill:#fff;}`}</style>
                                </defs>
                                <path className="b" d="M321.86,452.04h61.67v-119.4h-61.67v119.4ZM.07,242.7v95.43H61.74v-95.43H.07ZM318.86,87.18h64.66V0h-64.66V87.18Zm64.7,484.08v-78.95h-61.66v78.95h61.66Zm-.02-240.47v-78.33h-61.62v78.33h61.62Zm.05,310.87v-68.46h-61.71v68.46h61.71ZM61.76,501.21H.05v64.69H61.76v-64.69ZM216.65,87.37V.07h-34.64V87.37h34.64Zm34.83-.19h32.48V0h-32.48V87.18Zm33.6-.04h32.61V.09h-32.61V87.14Zm-67.29,.04h31.73V0h-31.73V87.17ZM61.67,394.45v-54.98H0v54.98H61.67Zm0,55.45v-53.48H0v53.48H61.67Zm0,50.19v-48.98H0v48.98H61.67Zm.09,143.86v-44.59H.05v44.59H61.75ZM316.74,211.96v38.63h66.86v-38.63h-66.86Zm-.1-40.44v38.58h66.92v-38.58h-66.92Zm-60.39,413.32v-26.65h-77.25v26.65h77.25Zm-68.35-315.16v33.31h68.39v-33.31h-68.39Zm68.38-1.07v-32.5h-68.38v32.5h68.38Zm65.57,221.65h61.66v-36.25h-61.66v36.25Zm-135.83-220.49h-63.91v33.26h63.91v-33.26Zm-63.93,344.52v29.51h67.63v-29.51H122.1Zm65.79-141.59v28.09h68.41v-28.09h-68.41Zm-1.86-236.63h-63.91v32.5h63.91v-32.5Zm70.26,123.19v-27.26h-68.4v27.26h68.4Zm.06,85.4v-27.32h-68.39v27.32h68.39Zm-.06-28.46v-27.26h-68.39v27.26h68.39Zm-68.45-28.6h68.53v-27.21h-68.53v27.21Zm68.55,142.14h-68.4v27.27h68.4v-27.27Zm60.2-359.41h36.35v-59.42h-36.35v59.42Zm-128.73,358.14h68.4v-26.52h-68.4v26.52Zm0-197.78h68.4v-26.52h-68.4v26.52Zm1.9,255.24H122.12v27.26h67.65v-27.26Zm1.08,57.91h65.41v-29.5h-65.41v29.5Zm65.54-198h-68.4v25.76h68.4v-25.76Zm-69.72,55.01v-28.01H122.02v28.01h64.66Zm4.17,112.36h65.5v-27.29h-65.5v27.29Zm-68.86-56.27h64.66v-27.25H121.99v27.25Zm0-169.31h63.91v-27.27h-63.91v27.27Zm64.04,29.74h-63.91v27.25h63.91v-27.25Zm-.04-58.12v-27.32h-63.9v27.32h63.9Zm.79,142.78H122.13v26.5h64.66v-26.5Zm-.79-85.84v-27.32h-63.9v27.32h63.9Zm.71,55.43v-25.76H122.01v25.76h64.69Zm110.03-313.9v-45.98h-44.45v45.98h44.45ZM121.99,330.67h63.91v-26.51h-63.91v26.51ZM.07,191.76v49.73H37.78v-49.73H.07Zm38.92,0v49.73h36.97v-49.73H38.99Zm317.28-21.33h27.34v-58.75h-27.34v58.75Zm27.24-60.58v-21.4h-27.1v21.4h27.1Z" />
                                <path d="M321.86,452.04v-119.4h61.67v119.4h-61.67Zm60.95-.65v-117.9h-60.17v117.9h60.17Z" />
                                <path d="M.07,242.7H61.74v95.43H.07v-95.43Zm60.86,94.81v-93.93H.74v93.93H60.93Z" />
                                <path d="M318.86,87.18V0h64.66V87.18h-64.66Zm.75-.74h63.17V.74h-63.17V86.44Z" />
                                <path d="M383.56,571.26h-61.66v-78.95h61.66v78.95Zm-.74-.76v-77.45h-60.18v77.45h60.18Z" />
                                <path d="M383.53,330.8h-61.62v-78.33h61.62v78.33Zm-.63-77.51h-60.17v76.71h60.17v-76.71Z" />
                                <path d="M383.58,641.66h-61.71v-68.46h61.71v68.46Zm-.77-.73v-66.96h-60.17v66.96h60.17Z" />
                                <path d="M61.76,501.21v64.69H.05v-64.69H61.76ZM.72,565.16H60.89v-63.21H.72v63.21Z" />
                                <path d="M216.65,87.37h-34.64V.07h34.64V87.37ZM182.72,.71V86.4h33.22V.71h-33.22Z" />
                                <path d="M251.49,87.18V0h32.48V87.18h-32.48Zm.84-86.46V86.41h30.99V.72h-30.99Z" />
                                <path d="M285.09,87.14V.09h32.61V87.14h-32.61Zm.84-.7h30.98V.74h-30.98V86.44Z" />
                                <path d="M217.79,87.17V0h31.73V87.17h-31.73Zm.86-86.46V86.4h30.23V.71h-30.23Z" />
                                <path d="M61.67,394.45H0v-54.98H61.67v54.98Zm-.65-54.26H.85v53.48H61.02v-53.48Z" />
                                <path d="M61.67,449.89H0v-53.48H61.67v53.48Zm-.64-52.76H.85v51.97H61.02v-51.97Z" />
                                <path d="M61.67,500.09H0v-48.98H61.67v48.98Zm-.75-.75v-47.49H.75v47.49H60.92Z" />
                                <path d="M61.75,643.95H.05v-44.59H61.75v44.59ZM.82,600.06v42.99H60.99v-42.99H.82Z" />
                                <path d="M316.74,211.96h66.86v38.63h-66.86v-38.63Zm66.17,.87h-65.41v36.99h65.41v-36.99Z" />
                                <path d="M316.65,171.52h66.92v38.58h-66.92v-38.58Zm.78,.66v37.13h65.35v-37.13h-65.35Z" />
                                <path d="M256.25,584.84h-77.25v-26.65h77.25v26.65Zm-76.6-26v25.11h75.92v-25.11h-75.92Z" />
                                <path d="M187.91,269.67h68.39v33.31h-68.39v-33.31Zm67.75,.85h-66.9v31.75h66.9v-31.75Z" />
                                <path d="M256.29,268.6h-68.38v-32.5h68.38v32.5Zm-.65-31.86h-66.95v30.99h66.95v-30.99Z" />
                                <path d="M321.86,490.25v-36.25h61.66v36.25h-61.66Zm61.05-35.43h-60.17v34.75h60.17v-34.75Z" />
                                <path d="M186.03,269.76v33.26h-63.91v-33.26h63.91Zm-63.29,32.44h62.41v-31.74h-62.41v31.74Z" />
                                <path d="M122.1,614.28h67.63v29.51H122.1v-29.51Zm.64,28.81h66.15v-28.01H122.74v28.01Z" />
                                <path d="M187.89,472.69h68.41v28.09h-68.41v-28.09Zm.81,.77v26.51h66.93v-26.51h-66.93Z" />
                                <path d="M186.03,236.06v32.5h-63.91v-32.5h63.91Zm-.74,.76h-62.54v30.98h62.54v-30.98Z" />
                                <path d="M256.3,359.24h-68.4v-27.26h68.4v27.26Zm-.65-26.55h-66.9v25.77h66.9v-25.77Z" />
                                <path d="M256.36,444.64h-68.39v-27.32h68.39v27.32Zm-.71-26.54h-66.9v25.76h66.9v-25.76Z" />
                                <path d="M256.29,416.19h-68.39v-27.26h68.39v27.26Zm-67.67-.85h66.9v-25.78h-66.9v25.78Z" />
                                <path d="M187.84,387.59v-27.21h68.53v27.21h-68.53Zm.77-.72h66.9v-25.77h-66.9v25.77Z" />
                                <path d="M256.39,529.73v27.27h-68.4v-27.27h68.4Zm-67.78,26.45h66.9v-25.76h-66.9v25.76Z" />
                                <path d="M316.59,170.32v-59.42h36.35v59.42h-36.35Zm.87-58.73v57.97h34.72v-57.97h-34.72Z" />
                                <path d="M187.87,528.46v-26.52h68.4v26.52h-68.4Zm.76-.74h66.9v-25.04h-66.9v25.04Z" />
                                <path d="M187.87,330.68v-26.52h68.4v26.52h-68.4Zm67.68-.66v-25.01h-66.9v25.01h66.9Z" />
                                <path d="M189.77,585.92v27.26H122.12v-27.26h67.65Zm-66.94,.65v25.76h66.15v-25.76H122.84Z" />
                                <path d="M190.86,643.83v-29.5h65.41v29.5h-65.41Zm64.79-28.69h-63.91v28.01h63.91v-28.01Z" />
                                <path d="M256.4,445.83v25.76h-68.4v-25.76h68.4Zm-.83,25.02v-24.27h-66.95v24.27h66.95Z" />
                                <path d="M186.68,500.84H122.02v-28.01h64.66v28.01Zm-63.97-.87h63.29v-26.46h-63.29v26.46Z" />
                                <path d="M190.85,613.2v-27.29h65.5v27.29h-65.5Zm64.7-.73v-25.76h-63.91v25.76h63.91Z" />
                                <path d="M121.99,556.92v-27.25h64.66v27.25H121.99Zm.76-.74h63.16v-25.77h-63.16v25.77Z" />
                                <path d="M121.99,387.62v-27.27h63.91v27.27h-63.91Zm63.28-26.45h-62.41v25.77h62.41v-25.77Z" />
                                <path d="M186.04,417.36v27.25h-63.91v-27.25h63.91Zm-.85,26.54v-25.76h-62.41v25.76h62.41Z" />
                                <path d="M185.99,359.24h-63.9v-27.32h63.9v27.32Zm-63.25-.84h62.41v-25.78h-62.41v25.78Z" />
                                <path d="M186.78,502.02v26.5H122.13v-26.5h64.66Zm-.75,.75h-63.16v25h63.16v-25Z" />
                                <path d="M185.99,416.18h-63.9v-27.32h63.9v27.32Zm-63.26-.85h62.41v-25.76h-62.41v25.76Z" />
                                <path d="M186.7,471.6H122.01v-25.76h64.69v25.76Zm-63.87-25.12v24.27h63.18v-24.27h-63.18Z" />
                                <path d="M296.73,157.71h-44.45v-45.98h44.45v45.98Zm-.65-45.27h-42.95v44.48h42.95v-44.48Z" />
                                <path d="M121.99,330.67v-26.51h63.91v26.51h-63.91Zm.65-.72h62.54v-24.95h-62.54v24.95Z" />
                                <path d="M.07,191.76H37.78v49.73H.07v-49.73Zm37,.85H.85v48.23H37.07v-48.23Z" />
                                <path d="M38.99,191.76h36.97v49.73H38.99v-49.73Zm36.16,49.11v-48.23H39.68v48.23h35.47Z" />
                                <path d="M356.27,170.43v-58.75h27.34v58.75h-27.34Zm.76-.84h25.74v-57.2h-25.74v57.2Z" />
                                <path d="M383.51,109.85h-27.1v-21.4h27.1v21.4Zm-26.5-.97h25.86v-19.69h-25.86v19.69Z" />


                                <path id="c34427f0-5082-4a8a-905c-dfea2706b265" className="b" d="M.82,600.06H60.99v42.99H.82v-42.99Z" />
                                <path id="89e75129-78a3-442d-9a7c-a3f28a382fe8" className="b" d="M.72,565.16v-63.21H60.89v63.21H.72Z" />
                                <path id="4e612c0c-a9b8-4168-b827-e94abfaaf736" className="b" d="M60.92,499.34H.75v-47.49H60.92v47.49Z" />
                                <path id="e6a26122-aed2-4726-8c0f-bef2be571298" className="b" d="M61.02,397.13v51.97H.85v-51.97H61.02Z" />
                                <path id="11db4929-5cb4-408d-aa94-ea2c162d86d0" className="b" d="M61.02,340.19v53.48H.85v-53.48H61.02Z" />
                                <path id="99b049b2-9f38-4016-af6a-6f6c9ff217ae" className="b" d="M60.93,337.51H.74v-93.93H60.93v93.93Z" />
                                <path id="81ce1ed3-d353-4eed-8a70-200b1f0467f3" className="b" d="M37.07,192.6v48.23H.85v-48.23H37.07Z" />
                                <path id="2e9a6787-80d3-4c90-a265-002a7be0eb26" className="b" d="M75.15,240.87H39.68v-48.23h35.47v48.23Z" />

                                <path id="3936f502-aa8e-414a-8635-c6227631861a" className="b" d="M182.72,.71h33.22V86.4h-33.22V.71Z" />
                                <path id="5f31dc24-4e00-4f7a-8267-5c67c637cf6c" className="b" d="M218.65,.71h30.23V86.4h-30.23V.71Z" />
                                <path id="c8c65a60-09a0-421a-a465-bb98060a4892" className="b" d="M252.33,.72h30.99V86.41h-30.99V.72Z" />
                                <path id="6544aa9a-39b6-4ff6-803b-4fc76233c126" className="b" d="M285.93,86.44V.74h30.98V86.44h-30.98Z" />
                                <path id="7c12b174-af51-4b21-bb02-0adbf143112b" className="b" d="M296.08,112.44v44.48h-42.95v-44.48h42.95Z" />
                                <path id="ecc5134b-d92f-411c-af72-361e704a3074" className="b" d="M319.61,86.44V.74h63.17V86.44h-63.17Z" />
                                <path id="ea4e117c-3d83-4f71-9148-39eef1fe0daa" className="b" d="M357.01,108.88v-19.69h25.86v19.69h-25.86Z" />
                                <path id="1bcee576-23fd-42f3-9ce7-2e3af8f958b6" className="b" d="M317.47,111.59h34.72v57.97h-34.72v-57.97Z" />
                                <path id="afbb20db-6c31-437d-898e-62ee6437988c" className="b" d="M357.03,169.58v-57.2h25.74v57.2h-25.74Z" />
                                <path id="90d702cd-0eb3-4156-bfc9-d1a05429cb15" className="b" d="M317.43,172.18h65.35v37.13h-65.35v-37.13Z" />
                                <path id="87e210ef-cd8b-4af1-bb1b-cfc6043ba97f" className="b" d="M382.91,212.83v36.99h-65.41v-36.99h65.41Z" />

                                <path id="d10b9b66-d44a-46cb-a6a1-1eece8ddccbf" className="b" d="M382.91,253.28v76.71h-60.17v-76.71h60.17Z" />
                                <path id="9c0d076b-b046-4d67-a757-286946d6414e" className="b" d="M382.81,451.39h-60.17v-117.9h60.17v117.9Z" />
                                <path id="db4b4004-5cbf-44b0-b40f-5d9d203cba12" className="b" d="M382.91,454.82v34.75h-60.17v-34.75h60.17Z" />
                                <path id="ceb49dd5-c5b8-4b0e-88f9-ce45dafbbc96" className="b" d="M382.82,570.51h-60.18v-77.45h60.18v77.45Z" />
                                <path id="c71dcf8e-3a97-4c24-9806-9e80477eed12" className="b" d="M382.81,640.93h-60.17v-66.96h60.17v66.96Z" />

                                <path id="c18e6109-92c9-44d8-a38f-30e4211fb0d8" className="b" d="M122.74,643.09v-28.01h66.15v28.01H122.74Z" />
                                <path id="ffdd5d25-577f-4f74-9e56-dfe1ca365651" className="b" d="M122.84,586.57h66.15v25.76H122.84v-25.76Z" />
                                <path id="dd8ae488-81c0-4205-9676-21111e34612f" className="b" d="M122.74,556.18v-25.77h63.16v25.77h-63.16Z" />
                                <path id="246e0f51-d550-4c64-87fc-99eb5e0b4c54" className="b" d="M186.03,502.77v25h-63.16v-25h63.16Z" />
                                <path id="412a05a5-e820-460b-bb7a-716cae7fa80b" className="b" d="M122.71,499.97v-26.46h63.29v26.46h-63.29Z" />
                                <path id="de0316ca-6784-4b73-91d6-d7797459c3fd" className="b" d="M122.83,446.48h63.18v24.27h-63.18v-24.27Z" />
                                <path id="99bd39c9-abf4-4b04-9c4a-ffb1babf4e1e" className="b" d="M185.18,443.9h-62.41v-25.76h62.41v25.76Z" />
                                <path id="2e0b6826-6443-438b-a02c-327503159351" className="b" d="M122.74,415.33v-25.76h62.41v25.76h-62.41Z" />
                                <path id="7008c221-7a32-4ddc-8b0c-1ca06353a6ee" className="b" d="M185.28,361.16v25.77h-62.41v-25.77h62.41Z" />
                                <path id="c5efb7a5-b949-42e6-b0f0-4b1d4f8b198f" className="b" d="M122.75,358.4v-25.78h62.41v25.78h-62.41Z" />
                                <path id="f68b5346-6be5-4cc3-9e67-d36bd74c910c" className="b" d="M122.64,329.96v-24.95h62.54v24.95h-62.54Z" />
                                <path id="92079d88-f59b-4103-90ea-b77ab830c0b8" className="b" d="M255.55,330.02h-66.9v-25.01h66.9v25.01Z" />
                                <path id="8fc1f64b-1a6f-437d-8198-22cec11c0198" className="b" d="M255.65,332.69v25.77h-66.9v-25.77h66.9Z" />
                                <path id="5c804875-b8ef-4775-abc5-fbd5ae8de4b9" className="b" d="M188.62,386.86v-25.77h66.9v25.77h-66.9Z" />
                                <path id="ee2bf8c0-2de9-41fb-9b32-4e7eba185353" className="b" d="M188.62,415.34v-25.78h66.9v25.78h-66.9Z" />
                                <path id="61198c41-9c17-4fd7-a3e8-262ff70a986f" className="b" d="M255.65,418.11v25.76h-66.9v-25.76h66.9Z" />
                                <path id="64c00ceb-a693-49f3-bc6b-d5621d5250b9" className="b" d="M255.57,470.85h-66.95v-24.27h66.95v24.27Z" />
                                <path id="79518dae-89dc-42ec-b2bd-27e17e3a33de" className="b" d="M188.7,473.46h66.93v26.51h-66.93v-26.51Z" />
                                <path id="16d3a7bf-1b72-4f02-8e13-fc03cc352bea" className="b" d="M188.63,527.72v-25.04h66.9v25.04h-66.9Z" />
                                <path id="0c43cec8-7f47-4742-9bef-0f4c15f6d43f" className="b" d="M188.62,556.18v-25.76h66.9v25.76h-66.9Z" />
                                <path id="641a5c31-756e-4998-b9ba-711602a9ee1f" className="b" d="M179.65,558.84h75.92v25.11h-75.92v-25.11Z" />
                                <path id="a1d7ee70-1fbf-49af-a414-75f18ee4fad7" className="b" d="M255.55,612.47h-63.91v-25.76h63.91v25.76Z" />
                                <path id="3251ca52-79fb-47b2-9cba-1455e54dcf31" className="b" d="M255.65,615.14v28.01h-63.91v-28.01h63.91Z" />

                                <path id="62d0091f-847c-4957-977a-1cd1f2f34c93" className="b" d="M122.73,302.2v-31.74h62.41v31.74h-62.41Z" />
                                <path id="314a9aa4-20a5-4a1c-aed1-feff1dc455e9" className="b" d="M185.29,236.81v30.98h-62.54v-30.98h62.54Z" />
                                <path id="c6e0fff1-3e9b-4988-a6cb-7096534086b2" className="b" d="M255.65,270.52v31.75h-66.9v-31.75h66.9Z" />
                                <path id="016b48fe-77dc-49eb-a29f-327555ebb829" className="b" d="M255.64,236.74v30.99h-66.95v-30.99h66.95Z" />
                            </svg>
                        </div>
                        <br/>
                        <div className="legende">
                            <p style={{ margin: 0, display: 'inline-flex', alignItems: 'center' }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: '#F9A800',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                        verticalAlign: 'middle'
                                    }}
                                ></span>
                                Verf&uuml;gbar
                            </p>
                            <p style={{ margin: 0, display: 'inline-flex', alignItems: 'center' }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: 'grey',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                        verticalAlign: 'middle'
                                    }}
                                ></span>
                                Vermietet
                            </p>
                        </div>
                    </div>
                </section>

                {/* Unser Team an dritter Stelle */}
                <section className="ueberUns" id="ueberUns">
                    <h1>Unser Team</h1>
                    <div className="personImages">
                        <div className="personImage">
                            <img src={aboutUs1} alt="Person1" />
                            <div className="text">
                                <p className="name">Julija</p>
                                <p className="role">Assistentin der Gesch&auml;ftsleitung/Marketing</p>
                            </div>
                        </div>
                        <div className="personImage">
                            <img src={aboutUs2} alt="Person2" />
                            <div className="text">
                                <p className="name">Alex</p>
                                <p className="role">Gesch&auml;ftsf&uuml;hrer</p>
                            </div>
                        </div>
                        <div className="personImage">
                            <img src={aboutUs3} alt="Person3" />
                            <div className="text">
                                <p className="name">Glemens</p>
                                <p className="role">Gr&uuml;nder</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer /> 
        </div>
    );
}

export default Home;
