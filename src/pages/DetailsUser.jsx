import React from "react"
import PetCards from "../components/ui/PetCards"
import DetailsInform from "../components/DetailsInform"

export default function DetailsUser(){
    return(
        <div className="max-w-7xl mx-auto">
            <section>
                <DetailsInform />
            </section>
            <div className="bg-black w-full h-0.5 my-10"/>
            <section>
                <PetCards/>
            </section>
        </div>
    )
}