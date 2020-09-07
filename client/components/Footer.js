import React from 'react'
import {GoMarkGithub} from 'react-icons/go'

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div>
            <GoMarkGithub color="##e36397" size={32} /> 
            <a href="https://github.com/Lialjohn">Liz John</a>
        </div>
        <div>
            <GoMarkGithub color="##e36397" size={32} /> 
            <a href="https://github.com/hanna-96">Hanna Rzheutskaya</a>
        </div>
        <div>
            <GoMarkGithub color="##e36397" size={32} /> 
            <a href="https://github.com/abraeva98">Irina Barreto</a>
            </div>
        <div>
            <GoMarkGithub color="##e36397" size={32} /> 
            <a href="https://github.com/sarajculhane">Sara Culhane</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer