"use client"
import { fetchCars } from "/utils/index.ts";
import { HomeProps } from "/types/index.ts";
import { fuels, yearsOfProduction } from "/constants/index.ts";
import { SearchBar } from '/components/index.ts';
import Hero from '../components/Hero';
import CustomFilter from '../components/CustomFilter';
import CarCard from '../components/CarCard';
import ShowMore from '../components/ShowMore';
import { useState ,useEffect} from 'react';
import  Image  from 'next/image';


export default function Home() {
  const [allCars, setallCars] = useState([]);
  const [search, setSearch] = useState('');
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);
  const [model, setmodel] = useState();
  const [limit, setlimit] = useState(10);
  const [manufacturer, setmanufacturer] = useState();
  const [loading, setLoading] = useState(false);


  const getCars = async ()=>{ 
    try {
      const result  =   await fetchCars({
    manufacturer: manufacturer || "",
    year: year || 2022,
    fuel: fuel || "",
    limit: limit || 10,
    model: model || "",
  })
  setallCars(result);

    } catch (error) {
      console.log(error);
    }
    finally{
setLoading(false)
    }
  };


  useEffect(() => {
    getCars()
    
   
  }, [fuel,year ,limit ,manufacturer,allCars]);


  

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar setmanufacturer={setmanufacturer} setmodel={setmodel}/>

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length>0? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car,index) => (
                <CarCard  key={index} car={car} />
              ))}
            </div>
            {
              loading&&(
                <div className="mt-16 w-full flex-center">
                  <Image src={"/loader.svg"} alt="loader" width={50} height={50} className="object-contain"/>
                </div>
              )
            }

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setlimit={setlimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}