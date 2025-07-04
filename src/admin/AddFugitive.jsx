import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useAuth } from "../context/AuthContext";

const AddFugitive = () => {
    const { user } = useAuth();
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
   
      const handleSubmit = async (e)=>{
       
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
         if(image){
           formData.append('image', image);
         }

        try{
          const response = await axios.post('https://frflf-backend.onrender.com/add-fugitive', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          if(response.status === 200){
            Swal.fire({
              title: "Fugitive Data added successfully!",
              icon: "success",
              draggable: true
            }).then(()=>{
              window.location.reload();
            });
          }
          console.log(response.data);
        }catch(err){
          console.log(err);
        }

      }

    return (
     <div className="p-8 mt-24 flex justify-center bg-gray-50 min-h-screen">
  <div className="border-2 border-[#242234] rounded-3xl p-10 w-full max-w-4xl bg-white shadow-lg">
    <h1 className="text-4xl mb-10 font-extrabold text-center text-gray-800 ">Add Fugitive</h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <label className="text-xl font-semibold mb-1 block">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              placeholder="Enter Full Name"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xl font-semibold mb-1 block">Last Seen Location</label>
            <input
              type="text"
              name="lastSeenLocation"
              value={lastSeenLocation}
              placeholder="Enter Last Seen Location"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setLastSeenLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xl font-semibold mb-1 block">Hair Color</label>
            <input
              type="text"
              name="hair"
              value={hair}
              placeholder="Enter Hair Color"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setHair(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xl font-semibold mb-2 block">Gender</label>
            <div className="flex items-center gap-8 border border-gray-300 rounded-lg p-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="form-radio text-blue-600"
                />
                Female
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="form-radio text-blue-600"
                />
                Male
              </label>
            </div>
          </div>

          <div>
            <label className="text-xl font-semibold mb-1 block">Weight</label>
            <input
              type="text"
              name="weight"
              value={weight}
              placeholder="Enter Weight"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <label className="text-xl font-semibold mb-1 block">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={dob}
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xl font-semibold mb-1 block">Height</label>
            <input
              type="text"
              name="height"
              value={height}
              placeholder="Enter Height"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xl font-semibold mb-1 block">Nationality</label>
            <select
              name="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            >
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
          </div>

          <div>
            <label className="text-xl font-semibold mb-1 block">Eye Color</label>
            <input
              type="text"
              name="eyecolor"
              value={eyes}
              placeholder="Enter Eye Color"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setEyes(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xl font-semibold mb-1 block">Place of Birth</label>
            <input
              type="text"
              name="pob"
              value={pob}
              placeholder="Enter Place Of Birth"
              className="w-full border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setPob(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xl font-semibold mb-1 block">Charges</label>
        <textarea
          name="charges"
          value={charges}
          placeholder="Enter charges"
          className="w-full border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-y"
          onChange={(e) => setCharges(e.target.value)}
          required
          rows={4}
        ></textarea>
      </div>

      <div>
        <label className="text-xl font-semibold mb-1 block">Caution</label>
        <input
          type="text"
          name="caution"
          value={caution}
          placeholder="Enter Caution Message"
          className="w-full border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) => setCaution(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-xl font-semibold mb-1 block">Upload Image (Optional)</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white text-2xl font-bold py-4 rounded-3xl shadow-lg hover:bg-blue-700 transition"
      >
        Add Fugitive
      </button>
    </form>
  </div>
</div>

    );
  };
  
  export default AddFugitive;
  
