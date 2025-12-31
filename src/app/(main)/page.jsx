'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPaw } from "react-icons/fa";

const pets = [
    { name: "Max", species: "Dog", age: 2, breed: "Labrador", location: "Hazratganj, Lucknow", image: "https://www.baltana.com/files/animals/Labrador-Wallpapers-Full-HD-77542.jpg" },
    { name: "Lucy", species: "Dog", age: 9, breed: "Pomeranian", location: "Aliganj, Lucknow", image: "https://thumbs.dreamstime.com/b/fluffy-cute-brown-pomeranian-spitz-dog-standing-isolated-white-background-front-view-beautiful-lovely-domestic-animal-posing-267516715.jpg" },
    { name: "Buddy", species: "Dog", age: 6, breed: "German Shepherd", location: "Charbagh, Lucknow", image: "https://img.freepik.com/premium-photo/german-shepherd-is-standing-woods-with-his-tongue-out_1015384-141196.jpg" },
    { name: "Rocky", species: "Dog", age: 4, breed: "Beagle", location: "Rajajipuram, Lucknow", image: "https://tse2.mm.bing.net/th/id/OIP.oqm2F8upgGoxMP1xsgu69gHaNt?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Daisy", species: "Dog", age: 1, breed: "Golden Retriever", location: "Aminabad, Lucknow", image: "https://tse2.mm.bing.net/th/id/OIP._RqFl3OLALiQtLlARl_saAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Shadow", species: "Dog", age: 3, breed: "Husky", location: "Indira Nagar, Lucknow", image: "https://i.redd.it/3-years-old-today-for-the-forever-puppy-v0-dwz8fqx8omw91.jpg?auto=webp&s=b663a59f50f188a748f8ea9b1d7bfb6ab7136b62" },
    { name: "Bolt", species: "Dog", age: 2, breed: "Dalmatian", location: "Gomti Nagar, Lucknow", image: "https://www.hund.ch/wp-content/uploads/2017/07/Dalmatian-puppy.jpg" },
    { name: "Simba", species: "Dog", age: 5, breed: "Boxer", location: "Telibagh, Lucknow", image: "https://tse4.mm.bing.net/th/id/OIP.a9eBUN3-Eryh635DWjTOBQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Leo", species: "Dog", age: 7, breed: "Bulldog", location: "Mahanagar, Lucknow", image: "https://tse3.mm.bing.net/th/id/OIP.ypVwiMEhVwPApDigcnoCJwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Oscar", species: "Dog", age: 2, breed: "Doberman", location: "Jankipuram, Lucknow", image: "https://i.pinimg.com/originals/ac/91/32/ac91325194f73fa38dc36d2e8d3c5904.jpg" },
    { name: "Milo", species: "Dog", age: 3, breed: "Shih Tzu", location: "Chowk, Lucknow", image: "https://tse1.mm.bing.net/th/id/OIP.LZ4x08XqdUwjNvX2-G8tSwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Bruno", species: "Dog", age: 4, breed: "Rottweiler", location: "Husainganj, Lucknow", image: "https://tse2.mm.bing.net/th/id/OIP.RFRtcI-gjBRnJ2yX66kLgQHaJ4?w=1668&h=2224&rs=1&pid=ImgDetMain&o=7&rm=3" },


    { name: "Bella", species: "Cat", age: 1, breed: "Persian", location: "Indira Nagar, Lucknow", image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6" },
    { name: "Milo", species: "Cat", age: 2, breed: "Siamese", location: "Chowk, Lucknow", image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131" },
    { name: "Luna", species: "Cat", age: 3, breed: "British Longhair", location: "Husainganj, Lucknow", image: "https://img.freepik.com/premium-photo/grey-british-longhair-sitting-white_191971-22443.jpg" },
    { name: "Simmi", species: "Cat", age: 4, breed: "Bengal", location: "Hazratganj, Lucknow", image: "https://cdn.pixabay.com/photo/2023/07/21/16/25/bengal-cat-8141941_1280.jpg" },
    { name: "Snow", species: "Cat", age: 2, breed: "Maine Coon", location: "Rajajipuram, Lucknow", image: "https://static9.depositphotos.com/1594920/1090/i/950/depositphotos_10907024-stock-photo-maine-coon-cat-2-years.jpg" },
    { name: "Kitty", species: "Cat", age: 1, breed: "Others", location: "Telibagh, Lucknow", image: "https://preview.redd.it/our-one-year-old-cat-is-so-spoiled-we-adopted-a-kitten-so-v0-fkr35vmhvfga1.jpg?width=3024&format=pjpg&auto=webp&s=0534a7b83e2ab5765d5bd7e6b1875063cdf861d9" },
    { name: "Oscar", species: "Cat", age: 5, breed: "Persian", location: "Mahanagar, Lucknow", image: "https://bowwowinsurance.com.au/wp-content/uploads/2018/10/persian-cat-700x700-1.jpg" },
    { name: "Leo", species: "Cat", age: 2, breed: "Siamese", location: "Charbagh, Lucknow", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Cleo", species: "Cat", age: 3, breed: "Bengal", location: "Aminabad, Lucknow", image: "https://tse4.mm.bing.net/th/id/OIP.cdBxk3SXk85_GjBTRYSeSAHaQB?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Nora", species: "Cat", age: 6, breed: "Others", location: "Aliganj, Lucknow", image: "https://static1.bigstockphoto.com/2/8/3/large1500/382150280.jpg" },


    { name: "Charlie", species: "Rabbit", age: 3, breed: "Angora", location: "Gomti Nagar, Lucknow", image: "https://img.freepik.com/premium-photo/sedate-easter-white-hotot-rabbit-portrait-full-body-sitting-green-field_31965-86411.jpg" },
    { name: "Snowy", species: "Rabbit", age: 2, breed: "Lop", location: "Telibagh, Lucknow", image: "https://img.freepik.com/premium-photo/high-quality-ultra-hd-closeup-young-rabbit-white-background_899449-185445.jpg" },
    { name: "Fluffy", species: "Rabbit", age: 1, breed: "Flemish Giant", location: "Hazratganj, Lucknow", image: "https://i.pinimg.com/736x/57/63/e3/5763e33629e3914bbdb33413bec5e7b8.jpg" },
    { name: "Coco", species: "Rabbit", age: 4, breed: "Others", location: "Rajajipuram, Lucknow", image: "https://static.vecteezy.com/system/resources/previews/030/678/828/large_2x/rabbit-high-quality-4k-ultra-hd-hdr-free-photo.jpg" },
    { name: "Bunny", species: "Rabbit", age: 2, breed: "Angora", location: "Indira Nagar, Lucknow", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Fluffy_white_bunny_rabbit.jpg" },
    { name: "Nibbles", species: "Rabbit", age: 3, breed: "Others", location: "Charbagh, Lucknow", image: "https://media.istockphoto.com/id/959866606/photo/rabbit-4-months-old-sitting-against-white-background.webp?b=1&s=612x612&w=0&k=20&c=kY6shZ7rwM-94UHdmyXlqLGg5em5Dg1EwtwmVS1zABY=" },
    { name: "Whiskers", species: "Rabbit", age: 5, breed: "Lop", location: "Mahanagar, Lucknow", image: "https://th.bing.com/th/id/R.3e00ced1e78cbce73c1b7899f061e770?rik=XqZQ94HVnIwaZA&riu=http%3a%2f%2fwww.bunnylops.com%2f_Media%2fdscf4942_med_med.jpeg&ehk=kBkaR%2bE%2bGnVqZDTGzorTK0xeaAg2k%2bKe9XsETBghRaM%3d&risl=&pid=ImgRaw&r=0" },
    { name: "Snowball", species: "Rabbit", age: 2, breed: "Others", location: "Aminabad, Lucknow", image: "https://img.freepik.com/premium-photo/portrait-funny-white-rabbit-green-natural-background_78492-3157.jpg" },
    { name: "Choco", species: "Rabbit", age: 1, breed: "Others", location: "Jankipuram, Lucknow", image: "https://i.redd.it/8c0wuymuyhi21.jpg" },
    { name: "Peanut", species: "Rabbit", age: 4, breed: "Flemish Giant", location: "Chowk, Lucknow", image: "https://i.pinimg.com/736x/3b/2c/ea/3b2cea8e2910b09b23ad3b05ecb2b608.jpg" },


    { name: "Coco", species: "Parrot", age: 5, breed: "Sun Conure", location: "Mahanagar, Lucknow", image: "https://cdn-fastly.petguide.com/media/2022/02/16/8233732/sun-conure.jpg?size=720x845&nocrop=1" },
    { name: "Rio", species: "Parrot", age: 3, breed: "Macaw", location: "Hazratganj, Lucknow", image: "https://img.freepik.com/premium-photo/colorful-macaw-parrots-perched-branch-isolated-transparent-background-png-blue-yellow-macaw-ara-ararauna_926199-1830936.jpg" },
    { name: "Kiwi", species: "Parrot", age: 2, breed: "Cockatiel", location: "Indira Nagar, Lucknow", image: "https://tse1.mm.bing.net/th/id/OIP.fzJfGIOjzzlkFc_2_F9AqAHaLH?w=768&h=1152&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Sunny", species: "Parrot", age: 4, breed: "Lovebird", location: "Rajajipuram, Lucknow", image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/05b457137391687.620a9c67d2bd3.jpg" },
    { name: "Sky", species: "Parrot", age: 6, breed: "African Grey", location: "Aliganj, Lucknow", image: "https://tse2.mm.bing.net/th/id/OIP.elc5UtGmOzGmkvTdFUZ_kwHaJ4?w=1800&h=2400&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Mango", species: "Parrot", age: 1, breed: "Budgerigar", location: "Telibagh, Lucknow", image: "https://static.wixstatic.com/media/nsplsh_ee23e488b99446bbb805110087f4ec51~mv2.jpg/v1/crop/x_861,y_0,w_4277,h_4000/fill/w_386,h_361,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image%20by%20Bianca%20Ackermann.jpg" },
    { name: "Peach", species: "Parrot", age: 2, breed: "Cockatoo", location: "Charbagh, Lucknow", image: "https://www.billabongsanctuary.com.au/wp-content/uploads/2023/07/Sulphur-Crested-Cockatoo-2-1024x1536.jpg" },
    { name: "Blue", species: "Parrot", age: 3, breed: "Macaw", location: "Chowk, Lucknow", image: "https://img.freepik.com/premium-photo/realistic-looking-bird_1103657-809.jpg" },
    { name: "Lime", species: "Parrot", age: 5, breed: "Lovebird", location: "Aminabad, Lucknow", image: "https://tse3.mm.bing.net/th/id/OIP.-RZdNO3ibPbuebkIAESTDgAAAA?w=240&h=320&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Echo", species: "Parrot", age: 7, breed: "African Grey", location: "Jankipuram, Lucknow", image: "https://thumbs.dreamstime.com/b/african-grey-parrot-23173884.jpg?w=576" },


    { name: "Nibbles", species: "Hamster", age: 1, breed: "Syrian Hamster", location: "Jankipuram, Lucknow", image: "https://img1.wsimg.com/isteam/ip/1e359bb4-cabe-4e03-bd77-8db8ba90a350/ols/golden-syrian-hamsters.jpg/:/rs=w:1200,h:1200" },
    { name: "Peanut", species: "Hamster", age: 2, breed: "Dwarf Hamster", location: "Hazratganj, Lucknow", image: "https://th.bing.com/th/id/R.9fea9fd7b8e9c37fb3aab542d10b55dd?rik=BYOUVNTneofo9w&riu=http%3a%2f%2f3.bp.blogspot.com%2f-pgw3TUJ463s%2fT2leAsOaMII%2fAAAAAAAAAXM%2fee1FuGBJV4U%2fs1600%2fDwarf%2bRussian%2bhamster.jpg&ehk=pF41MuwKqy9vxK2OFVNl3oPLccx0wwjAw3tljvB9cvg%3d&risl=&pid=ImgRaw&r=0" },
    { name: "Cinnamon", species: "Hamster", age: 1, breed: "Roborovski Hamster", location: "Indira Nagar, Lucknow", image: "https://1.bp.blogspot.com/-y4bqUvyM0ts/UpmPYZXN3_I/AAAAAAAADfA/5hsSxUu_6ZE/s1600/Roborovski_Stare-Roborovski-hamster-Breeding-Roborovski-hamster.jpg" },
    { name: "Marshmallow", species: "Guinea Pig", age: 3, breed: "Abyssinian", location: "Charbagh, Lucknow", image: "https://tse1.mm.bing.net/th/id/OIP.lY5dcsjrP7dD-nv8SwZqxAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Pumpkin", species: "Guinea Pig", age: 2, breed: "Peruvian", location: "Rajajipuram, Lucknow", image: "https://animalboardingandgrooming.com/img/animal-boarding-guinea-pig-table-480x360.jpg" },
    { name: "Snowflake", species: "Guinea Pig", age: 1, breed: "American", location: "Telibagh, Lucknow", image: "https://www.atshq.org/wp-content/uploads/2021/10/What-Is-Coprophagy.jpg" },
    { name: "Bandit", species: "Ferret", age: 4, breed: "Standard Ferret", location: "Mahanagar, Lucknow", image: "https://tse1.mm.bing.net/th/id/OIP.Z8vjrI6VfZp4EbFY4ZkstQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Whiskers", species: "Ferret", age: 2, breed: "Albino Ferret", location: "Aminabad, Lucknow", image: "https://tse1.mm.bing.net/th/id/OIP.GUj3tMUdYQ6Eh-HJgsAT-gHaJO?w=822&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Choco", species: "Hamster", age: 1, breed: "Winter White Hamster", location: "Aliganj, Lucknow", image: "https://i.redd.it/4bfp1pwgt3r01.jpg" },
    {
        name: "Muffin", species: "Guinea Pig", age: 2, breed: "Texel", location: "Chowk, Lucknow", image: "https://static6.depositphotos.com/1004158/575/i/450/depositphotos_5753938-stock-photo-long-hair-guinea-pig.jpg",
    }];


export default function HomePage() {
    const [species, setSpecies] = useState("All Pets");
    const [breed, setBreed] = useState("All Breeds");
    const [age, setAge] = useState("All Ages");
    const [location, setLocation] = useState("All Locations");
    const [filteredPets, setFilteredPets] = useState(pets);

    const handleSearch = () => {
        let results = pets.filter((pet) => {
            const matchesSpecies = species === "All Pets" || pet.species === species;
            const matchesBreed = breed === "All Breeds" || pet.breed === breed;
            const matchesAge =
                age === "All Ages" ||
                (age === "0-1 years" && pet.age <= 1) ||
                (age === "2-3 years" && pet.age >= 2 && pet.age <= 3) ||
                (age === "4-6 years" && pet.age >= 4 && pet.age <= 6) ||
                (age === "7+ years" && pet.age >= 7);
            const matchesLocation = location === "All Locations" || pet.location.includes(location);

            return matchesSpecies && matchesBreed && matchesAge && matchesLocation;
        });
        setFilteredPets(results);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">

            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
                {/* Left: Logo + Title */}
                <div className="flex items-center gap-3">
                    <FaPaw className="text-white text-3xl" />
                    <h1 className="text-2xl font-bold tracking-wide">FurEver Home</h1>
                </div>

                {/* Right: Buttons */}
                <div className="flex gap-4">
                    <Link href='/login'>
                        <span className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 transition">Login</span>
                    </Link>
                    <Link href='/signup'>
                        <span className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-400 to-teal-600 text-white font-semibold hover:scale-105 transition">Signup</span>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="text-center py-16">
                <h1 className="text-5xl font-bold">Find your new best friend</h1>
            </section>

            {/* Filters + Search Button */}
            <div className="flex flex-col items-center gap-6 mb-12 px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
                    {/* Species */}
                    <div className="flex items-center gap-2 px-4 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:shadow-pink-500/30 transition">
                        <span className="text-pink-400 text-xl">🐾</span>
                        <select
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            className="flex-1 bg-purple-700 text-white focus:outline-none"
                        >
                            <option>All Pets</option>
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Rabbit</option>
                            <option>Parrot</option>
                            <option>Hamster</option>
                        </select>
                    </div>

                    {/* Breed */}
                    <div className="flex items-center gap-2 px-4 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:shadow-purple-500/30 transition">
                        <span className="text-purple-400 text-xl">🌟</span>
                        <select
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                            className="flex-1 bg-purple-700 text-white focus:outline-none"
                        >
                            <option>All Breeds</option>
                            <option>Labrador</option>
                            <option>Pomeranian</option>
                            <option>German Shepherd</option>
                            <option>British Longhair</option>
                            <option>Others</option>
                        </select>
                    </div>

                    {/* Age */}
                    <div className="flex items-center gap-2 px-4 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:shadow-indigo-500/30 transition">
                        <span className="text-indigo-400 text-xl">⏳</span>
                        <select
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="flex-1 bg-indigo-700 text-white focus:outline-none"
                        >
                            <option>All Ages</option>
                            <option>0-1 years</option>
                            <option>2-3 years</option>
                            <option>4-6 years</option>
                            <option>7+ years</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 px-4 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:shadow-blue-500/30 transition">
                        <span className="text-blue-400 text-xl">📍</span>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 bg-indigo-700 text-white focus:outline-none"
                        >
                            <option>All Locations</option>
                            <option>Hazratganj</option>
                            <option>Indira Nagar</option>
                            <option>Gomti Nagar</option>
                            <option>Aliganj</option>
                            <option>Rajajipuram</option>
                            <option>Aminabad</option>
                            <option>Mahanagar</option>
                            <option>Jankipuram</option>
                            <option>Telibagh</option>
                            <option>Charbagh</option>
                            <option>Husainganj</option>
                            <option>Chowk</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="px-10 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition"
                >
                    🔍 Search Pets
                </button>
            </div>

            {/* Pets Grid */}
            <section className="px-8 pb-16">
                {filteredPets.length === 0 ? (
                    <p className="text-center text-xl">No pets found matching your criteria.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredPets.map((pet, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                                <img
                                    src={pet.image}
                                    alt={pet.name}
                                    className="w-full h-120 object-cover-fill"
                                />
                                <div className="p-4">
                                    <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
                                    <p className="mb-1"><strong>Species:</strong> {pet.species}</p>
                                    <p className="mb-1"><strong>Breed:</strong> {pet.breed}</p>
                                    <p className="mb-1"><strong>Age:</strong> {pet.age} years</p>
                                    <p className="mb-1"><strong>Location:</strong> {pet.location}</p>
                                    <Link href={`/manage_pets?id=${index}`}>
                                        <span className="mt-5 px-33 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold hover:scale-105 transition">Adopt me</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}