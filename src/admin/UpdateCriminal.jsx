import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UpdateCriminal = () => {
  const {user} = useAuth();
    const {id} = useParams();
    const [fullName, setFullName] = useState("");
    const [charges, setCharges] = useState("");
    const [lastSeenLocation, setLastSeenLocation] = useState("");
    const [dob, setDob] = useState("");
    const [hair, setHair] = useState("");
    const [height, setHeight] = useState("");
    const [pob, setPob] = useState("");
    const [nationality, setNationality] = useState("");
    const [eyes, setEyes] = useState("");
    const [gender, setGender] = useState("");
    const [weight, setWeight] = useState("");
    const [caution, setCaution] = useState("");
    const [image, setImage] = useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:3001/get-criminal-list/${id}`)
        .then(result => {
            console.log(result.data);
            setFullName(result.data.fullName);
            setCharges(result.data.charges);
            setLastSeenLocation(result.data.lastSeenLocation);
            setCaution(result.data.caution);
            setDob(result.data.dob);
            setEyes(result.data.eyes);
            setGender(result.data.gender);
            setNationality(result.data.nationality);
            setPob(result.data.pob);
            setImage(result.data.imagePath);
            setHair(result.data.hair);
            setHeight(result.data.height);
            setWeight(result.data.weight);

        })
        .catch(err=> console.log(err))

    }, []);

   
      const handleUpdate = async (e)=>{
        e.preventDefault();
         const formData = new FormData();
         formData.append('fullName', fullName);
         formData.append('charges', charges);
         formData.append('lastSeenLocation', lastSeenLocation);
         formData.append('dob', dob);
         formData.append('hair', hair);
         formData.append('height', height);
         formData.append('pob', pob);
         formData.append('eyes', eyes);
         formData.append('gender', gender);
         formData.append('weight', weight);
         formData.append('caution', caution);
         formData.append('nationality', nationality);
         formData.append('adminId', user?.id);
         formData.append('adminName', user?.name);

         
         if(image) {
            console.log("Image file to upload:", image);
            formData.append('image', image);
        } else {
            console.log("No new image selected");
        }

        try{
          const response = await axios.post(`http://localhost:3001/update-fugitive/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          if(response.status === 200){
            Swal.fire({
              title: "Fugitive Data update successfully!",
              icon: "success",
              draggable: true
            }).then(()=>{
              window.location.reload();
            });
          }
          console.log(response.data);
        }catch(err){
          console.log(err);
          Swal.fire({
            title: "Error updating fugitive",
            text: err.message,
            icon: "error"
        });
        }
      }

return (
   <div className="p-4 mt-[100px] flex justify-center">
        <div className="border-2 border-blue-500 p-6 w-[900px]">
          <h1 className="text-4xl font-semibold text-center">Update Fugitive {fullName}</h1>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-4" >
           <div className="flex justify-between items-center gap-5">
            {/* right */}
            <div className="flex-1 flex flex-col gap-2">
            <label className="text-xl">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={fullName}
             placeholder="Enter Full Name"
              className="border flex-1 p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
             <label className="text-xl">Last Seen Location</label>
            <input
              type="text"
              name="lastSeenLocation"
              value={lastSeenLocation}
              placeholder="Enter Last Seen Location"              
              className="border flex-1 p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setLastSeenLocation(e.target.value)}
              required
            />
             <label className="text-xl">Hair Color</label>
            <input
              type="text"
              name="hair"
              value={hair}
              placeholder="Enter Hair Color"              
              className="border flex-1 p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setHair(e.target.value)}
              required
            />
            <label className="text-xl">Gender</label>
            <div className="flex-1 border flex tems-center p-2 gap-2">
            <label htmlFor="female">Female</label>
            <input type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e)=> setGender(e.target.value)}
            required
                  className="mr-4"
            />
            <label htmlFor="male">Male</label>
            <input type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e)=> setGender(e.target.value)}
            className="mr-2"
            required
            />
            </div>
       <label className="text-xl">Weight</label>
            <input
              type="text"
              name="weight"
              value={weight}
               placeholder="Enter weight"
              
              className="border p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setWeight(e.target.value)}
              required
            />

            </div>
            {/* left */}
             
            <div className="flex-1 flex flex-col gap-2"> 
           
                <label className="text-xl">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={dob}
              placeholder="Enter charges Date of birth"              
              className="border flex-1 p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setDob(e.target.value)}
              required
            />

            <label className="text-xl">Height</label>
            <input
              type="text"
              name="height"
              value={height}
              placeholder="Enter Height"              
              className="border flex-1 p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setHeight(e.target.value)}
            />
             <label className="text-xl">Nationality</label>
            <select name="nationality" className="border flex-1 p-2 focus:ring focus:outline-none focus:ring-blue-300" value={nationality} onChange={(e)=> setNationality(e.target.value)} id="" required>
              <option value="">Select Nationality</option>
              <option value="Ethiopian">Ethiopian</option>
              <option value="Nigerian">Nigerian</option>
              <option value="Kenyan">Kenyan</option>
              <option value="Ghanaian">Ghanaian</option>
              <option value="South African">South African</option>
              <option value="Sudanese">Sudanese</option>
              <option value="Somali">Somali</option>
              <option value="Tanzanian">Tanzanian</option>
              <option value="Ugandan">Ugandan</option>
              <option value="Zambian">Zambian</option>
              <option value="Zimbabwean">Zimbabwean</option>
              <option value="Rwandan">Rwandan</option>
              <option value="Burundian">Burundian</option>
              <option value="Cameroonian">Cameroonian</option>
              <option value="Congolese">Congolese</option>
              <option value="Algerian">Algerian</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Libyan">Libyan</option>
              <option value="Tunisian">Tunisian</option>
              <option value="Malian">Malian</option>
              <option value="Senegalese">Senegalese</option>
              <option value="Ivorian">Ivorian (Côte d'Ivoire)</option>
              <option value="Chadian">Chadian</option>
              <option value="Malagasy">Malagasy (Madagascar)</option>
              <option value="Mozambican">Mozambican</option>
              <option value="American">American</option>
              <option value="Canadian">Canadian</option>
              <option value="British">British</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Brazilian">Brazilian</option>
            </select>
            <label className="text-xl">Eye color</label>
            <input
              type="text"
              name="eyecolor"
              value={eyes}
               placeholder="Enter Eye Color"
              className="border flex-1 p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setEyes(e.target.value)}
              required
            />
            <label className="text-xl">Place of Birth</label>
            <input
              type="text"
              name="pob"
              value={pob}
              placeholder="Enter Place Of Birth"              
              className="border p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setPob(e.target.value)}
            />

            </div>

           </div>
 
         <label className="text-xl">Charges</label>
            <textarea
              name="text"
              value={charges}
              placeholder="Enter charges"
              className="border flex-1 p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setCharges(e.target.value)}
              required
            ></textarea>
        
       

          <label className="text-xl">Caution</label>
            <input
              type="text"
              name="caution"
              value={caution}
               placeholder="Enter Caution Message"
              className="border p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setCaution(e.target.value)}
              required
            />

            <label className="text-xl">Upload Image (Optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="border p-2 focus:ring focus:outline-none focus:ring-blue-300"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            
  
            <button
              type="submit"
              
              className="border font-semibold text-2xl bg-blue-400 text-white p-2 rounded-xl hover:bg-white hover:border-blue-500 hover:text-black"
            >
             Update Fugitive
            </button>
          </form>
        </div>
      </div>
  )
}

export default UpdateCriminal