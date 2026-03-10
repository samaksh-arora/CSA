import React from 'react';
import { FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-gradient-to-r from-primary/10 to-secondary/10 text-base-content border-t-2 border-primary/20">
      <div className="grid grid-flow-col gap-4">
        <a href="/about" className="link link-hover hover:text-primary transition-colors">About us</a> 
        <a href="/contact" className="link link-hover hover:text-primary transition-colors">Contact</a> 
        <a href="/events" className="link link-hover hover:text-primary transition-colors">Events</a> 
      </div> 
      <div>
        <div className="grid grid-flow-col gap-4">
          <a href="http://www.linkedin.com/in/wayne-state-csa" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
          </a> 
          <a href="https://instagram.com/wsu_csa" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 hover:text-secondary cursor-pointer transition-colors" />
          </a> 
          <a href="https://discord.gg/JS8qaGrSJ" target="_blank" rel="noopener noreferrer">
            <FaDiscord className="w-6 h-6 hover:text-secondary cursor-pointer transition-colors" />
          </a> 
        
        </div>
      </div> 
      <div>
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} - 
          <span className="text-primary font-semibold"> Wayne State </span>
          <span className="text-secondary font-semibold">Computer Science Association</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
