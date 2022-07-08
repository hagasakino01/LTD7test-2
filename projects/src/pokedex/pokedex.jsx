import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import './pokedex.css'



function PokeDex() {
    const [poke,setPoke] =useState([])
    const handleGetPoke = async () => {
        axios.get('https://62a00597a9866630f80561eb.mockapi.io/v1/pokedex')
            .then(function (response) {
                // handle success
               
                setPoke(response.data)
             
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    useEffect(() => {
        handleGetPoke()
    }, [])

    console.log(poke)

    return (
        <div className="pokedex">
            <p className="title-pd">Pokedex</p>
            <div className="container-pd">
                {poke.map(e=>(
                    <div className="poke">
                        <img src={e.image} alt="" className="img-pd" />
                        <div className="infor-pd">
                            <p className="id-pd">#{e.id}</p>
                            <p className="name-pd">Hagasakino01</p>
                            <p className="type-pd">Type:{e.type}</p>
                        </div>
                    </div>                          
                ))}
            </div>
        </div>
    )

}

export default PokeDex;