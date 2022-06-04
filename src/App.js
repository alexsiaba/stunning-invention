import React from "react";
import "./styles.css";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import About from "./About/About";
import Header from "./Header/Header";
import { Routes, Route } from "react-router";


export default function App() {
    return (
        <div>
                <Header />
                <Routes>
                    <Route path="Home" element={<Home/>} />
                    <Route path="Contact" element={<Contact/>} />
                    <Route path="About" element={<About/>} />
                </Routes>
        </div>
    );
}
