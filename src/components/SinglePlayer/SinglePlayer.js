import React from 'react';
import "./SinglePlayer.css"

const SinglePlayer = ({ player, cart, setCart }) => {
    const { strPlayer, idPlayer, strCutout } = player

    const handleAddToCart = () => {
        const info = {
            strPlayer,
            idPlayer,
            strCutout,
            price: 115
        }
        if (cart) {
            setCart([...cart, info])
            return
        }
        else {
            setCart(info)
            return
        }
    }

    const handleBookmark = () => {
        const info = {
            strPlayer,
            idPlayer,
            strCutout,
            price: 110,
            bookmark: true
        }
        
        const prevBookmark = localStorage.getItem("Bookmark")
        const oldBookmark = JSON.parse(prevBookmark)

        if (oldBookmark) {
            const isExist = oldBookmark.find((p) => p.idPlayer === idPlayer)
            if (isExist) {
                const updatedPrice = parseFloat(isExist.price)
                const newPrice = updatedPrice + 1;
                isExist.price = newPrice
                localStorage.setItem("Bookmark", JSON.stringify(oldBookmark))

                // alert('already bookmarked')
            }
            else {
                localStorage.setItem("Bookmark", JSON.stringify([...oldBookmark, info]))
            }
        }
        else {
            localStorage.setItem("Bookmark", JSON.stringify([info]))
        }
    }

    // console.log(cart);
    return (
        <div className='card' data-aos="zoom-in">
            <img className='player-img' src={strCutout} alt="" />
            <h6>{strPlayer}</h6>
            <button className='card-btn'>Details</button>
            <button onClick={handleAddToCart} className='card-btn'>Add to cart</button>
            <button onClick={handleBookmark} className='card-btn'>Bookmark</button>
        </div>
    );
};

export default SinglePlayer;