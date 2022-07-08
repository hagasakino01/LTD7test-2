import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import './homeCountry.css'
import {getCountry, selectCountry, } from '../../features/country/countrySlice'



function HomeCountry() {
    const [input, setInput] = useState({});
    const [continents, setcontinents] = useState({});
    const [notice,setNotice]= useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const listCountry = useSelector((state) => state.country.listCountry)
    const isDark = useSelector((state) => state.country.isDark)


    const handleChange = e => setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    
   


    
    const handleSelect = e=> {
        setcontinents( e.target.value )

        
        console.log(continents)
    };
    const selectContinents = async () => {
        axios.get(`https://restcountries.com/v3.1/region/${continents}`)
            .then(function (response) {
                // handle success
               
                dispatch(getCountry(response.data))
                setNotice(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                handleGetCountry()
                
            })
    }
    useEffect(() => {
        selectContinents()
    }, [continents])
    
    
    const handleGetCountry = async () => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(function (response) {
                // handle success
               
                dispatch(getCountry(response.data))
             
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    useEffect(() => {
        handleGetCountry()
    }, [])

    
    

    const handleClickSearch = async (data) => {
        if(data !==''){axios.get(`https://restcountries.com/v3.1/name/${data}`)
            .then(function (response) {
                // handle success
               
                dispatch(getCountry(response.data))
                
                setNotice(false)
             
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                if(data !==''){
                    setNotice(true)
                }
                else{
                    handleGetCountry()
                }

            })
        }else{
            axios.get('https://restcountries.com/v3.1/all')
            .then(function (response) {
                // handle success
               
                dispatch(getCountry(response.data))
                setNotice(false)
             
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        }

    }

    console.log(listCountry)
    

    const handleClickCountry =(data)=>{
        
      

        
        navigate(`in-country/`+ data)
        
    }



    return (
        <div className={isDark&&"home-country"||'home-country-dark'}>
           <div className="top-home-country">
                <div className="box-input-ct">
                    <input type="text" className={isDark &&"input-search-ct"||'input-search-ct-dark'} placeholder="Search for a country"
                        name="search" value={input.search || ''} onChange={handleChange}
                    />
                    <button className={isDark&&"button-search-ct"||'button-search-ct-dark'} onClick={()=>handleClickSearch(input.search)}>
                        <img className="img-search-ct" src={isDark&&"https://scontent.fhan4-3.fna.fbcdn.net/v/t1.15752-9/288919654_813848152913126_1746660404316372693_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=khixrdQILuwAX9ckWCU&_nc_oc=AQnuupfV0K_V0aIuzYnH5lGCncd2Fn0ahVkGOFYxxLipYmx7W6VYdGdVBfAHUOpKA5M&_nc_ht=scontent.fhan4-3.fna&oh=03_AVJ-3UTQbdEfWvcRnwiGMuaSLzJbcWdixz8ammmQokfl5Q&oe=62E60519"||'https://scontent.fhan3-4.fna.fbcdn.net/v/t1.15752-9/285359683_2166294930193164_8457047306022455141_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=j7dTcyOgQRUAX_G-mDa&_nc_ht=scontent.fhan3-4.fna&oh=03_AVKk562ubHnPhQHB5LcOTVEegX63w7ImqePcZRPY-rFiOg&oe=62E1E1B5'} alt="" />
                    </button>
                    
                </div>
                <div className="box-select-continents">
                    <select name="" id="" onChange={handleSelect} className={isDark&&"select-continents"||'select-continents-dark'}>
                        <option value="all">filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>

           </div>
           {notice && <div className="box-notice-search-country">
                <p className="notice-search-country">The country does not exist</p>
           </div>}
           <div className="bot-home-ct">
           {listCountry.map(e => (
                <div className={isDark&&"box-country"||'box-country-dark'}
                    onClick={()=>handleClickCountry(e.name.common)}
                >
                    <img className="img-country" src={e.flags.png} alt="" />
                    <p className={isDark&&"name-country-home"||'name-country-home-dark'}>{e.name.common}</p>
                    <div className={isDark&&"box-infor-country-home"||'box-infor-country-home-dark'}>
                        <div className="population-country-home">
                            <p className="title-properties">Population:</p>
                            <p className="name-properties">{e.population}</p>
                             
                        </div>
                        <div className="region-country-home">
                            <p className="title-properties"> Region:</p>
                            <p className="name-properties"> {e.region}</p>
                            
                        </div>
                        <div className="capital-country-home">
                            <p className="title-properties"> Capital: </p>
                            <p className="name-properties"> {e.capital}</p>
                            
                        </div>
                    </div>
                </div>
            ))}
           </div>

        </div>
    )

}
export default HomeCountry;