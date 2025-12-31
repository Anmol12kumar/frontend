'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const API_BASE_URL = 'http://localhost:5000/api';

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
    { name: "Muffin", species: "Guinea Pig", age: 2, breed: "Texel", location: "Chowk, Lucknow", image: "https://static6.depositphotos.com/1004158/575/i/450/depositphotos_5753938-stock-photo-long-hair-guinea-pig.jpg",
    }];


export default function ManagePets() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const petId = searchParams.get('id');

    const [pet, setPet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [adoptedStatus, setAdoptedStatus] = useState(false);

    useEffect(() => {
        if (petId === null || petId === undefined) {
            setError('No pet selected');
            setIsLoading(false);
            return;
        }

        try {
            const petIndex = parseInt(petId);
            if (isNaN(petIndex) || petIndex < 0 || petIndex >= pets.length) {
                setError('Invalid pet ID');
                setIsLoading(false);
                return;
            }

            const selectedPet = pets[petIndex];
            setPet(selectedPet);
            setError('');
        } catch (err) {
            setError('Error loading pet details');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [petId]);

    const handleAdoptPet = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Please log in to adopt a pet');
            router.push('/login');
            return;
        }

        try {
            const petData = {
                name: pet.name,
                type: pet.species,
                breed: pet.breed,
                age: pet.age,
                weight: 10,
                color: 'Not specified',
                vaccinated: true,
                description: `${pet.name} - ${pet.breed}`,
                imageUrl: pet.image,
            };

            const response = await fetch(`${API_BASE_URL}/pets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...petData, userId }),
            });

            if (!response.ok) throw new Error('Failed to adopt pet');
            setAdoptedStatus(true);
            alert('Pet adopted successfully!');
            setTimeout(() => router.push('/'), 2000);
        } catch (err) {
            alert('Error adopting pet: ' + err.message);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-purple-600 text-lg">Loading pet details...</p>
                </div>
            </div>
        );
    }

    if (error || !pet) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600 mb-6">{error || 'Pet not found'}</p>
                    <Link
                        href="/"
                        className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center text-purple-700 hover:text-purple-900 font-semibold transition"
                    >
                        ← Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 flex items-center gap-2">
                        🐾 Manage Pet Adoption
                    </h1>
                </div>

                {/* Pet Card Container */}
                <div className="rounded-3xl backdrop-blur-md bg-white/40 border border-white/30 shadow-2xl overflow-hidden hover:shadow-purple-400/40 transition transform hover:scale-[1.01]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

                        {/* Image Section */}
                        <div className="flex items-center justify-center">
                            {pet.image ? (
                                <div className="relative w-full h-130 rounded-2xl overflow-hidden shadow-lg border-4 border-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-border">
                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl flex items-center justify-center">
                                    <span className="text-gray-500 text-lg">No image available</span>
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{pet.name}</h1>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="inline-block bg-gradient-to-r from-purple-200 to-purple-400 text-purple-800 px-4 py-1 rounded-full text-sm font-semibold shadow">
                                    {pet.species}
                                </span>
                                <span className="inline-block bg-gradient-to-r from-pink-200 to-pink-400 text-pink-800 px-4 py-1 rounded-full text-sm font-semibold shadow">
                                    {pet.breed}
                                </span>
                            </div>

                            {/* Basic Info Grid */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl shadow hover:shadow-purple-300 transition">
                                    <p className="text-gray-500 text-sm font-semibold">Age</p>
                                    <p className="text-2xl font-bold text-purple-600">{pet.age} years</p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-xl shadow hover:shadow-pink-300 transition">
                                    <p className="text-gray-500 text-sm font-semibold">Location</p>
                                    <p className="text-lg font-bold text-pink-600">{pet.location}</p>
                                </div>
                            </div>

                            {/* Adoption Button */}
                            <button
                                onClick={handleAdoptPet}
                                disabled={adoptedStatus}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition transform hover:scale-105 ${adoptedStatus
                                        ? 'bg-green-500 text-white cursor-not-allowed'
                                        : 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-pink-500/50 animate-pulse'
                                    }`}
                            >
                                {adoptedStatus ? '✓ Adoption Successful!' : '🐾 Adopt Me Now'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-10 backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-gray-700 font-medium flex items-center justify-center gap-4">
                        🔒 Safe & Secure | ✅ Verified Pets | 💙 FurEver Home Community
                    </p>
                </div>
            </div>
        </div>
    );
}