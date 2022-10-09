import React, { useEffect, useState } from 'react';
import Players from '../Players/Players';
import "./Home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const Home = () => {
    const [search, setSearch] = useState('')
    const [players, setPlalyers] = useState([])
    const [cart, setCart] = useState([])
    // console.log(search)

    useEffect(() => {
        fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${search}`)
            .then(res => res.json())
            .then(data => setPlalyers(data?.player))
    }, [search])

    // console.log(players)

    const handleDelete = (id) => {
        const leftPlayer = cart.filter((pd) => pd.idPlayer !== id)
        setCart(leftPlayer)
        toast("deleted")
        Swal.fire(
            'Removed',
            'You clicked the button!',
            'success!!'
          )
    }

    return (
        <div>
            <div className="home-container">
                <div className="left-side">
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='search' className='search-input' />
                    <button className='search-btn'>Search</button>
                    <div className="players-container">
                        <Players players={players} cart={cart} setCart={setCart}></Players>
                    </div>
                </div>
                <div className="right-side">
                    <div className="cart">
                        <p>this is player cart</p>
                        {
                            cart?.map(p => (
                                <div className="cart-info-container">
                                    <li>{p.strPlayer}</li>
                                    <div>
                                        <button onClick={() => handleDelete(p.idPlayer)} className='dlt-btn'>X<ToastContainer /></button>
                                    </div>
                                </div>
                            )

                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;