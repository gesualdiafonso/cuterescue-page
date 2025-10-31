import MapHomePet from "../components/maps/MapHomePet";
import MapPet from "../components/maps/MapPet";
import PersonalInform from "../components/PersonalInform";
import PetCards from "../components/ui/PetCards";
import BtnPetMove from "../components/ui/BtnPetMove";

function Home(){
    return(
        <div className="max-w-7xl mx-auto p-0">
            <section className="flex gap-20 mb-10">
                <PersonalInform/>
                <div>
                    <MapHomePet/>
                    <BtnPetMove/>
                </div>
            </section>
            <div className="bg-black w-full h-0.5 my-10"/>
            <section className="flex gap-20 mb-10">
                <PetCards/>
                <MapPet/>
            </section>
        </div>
    )
}

export default Home;