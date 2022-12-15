import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <footer className="section-sm pb-0 border-top border-default">
    <div className="container mt-5 ">

       <div className="row justify-content-between px-lg-3 mx-lg-5 mx-2">
          <div className="col-md-6 mb-4">
              <Link className="fs-2 blog-link" to="/">
                  Blog
              </Link>
             <p>
            We’re an open platform where over 100 million readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface.
             </p>
          </div>

          <div className="col-lg-2 col-md-3 col-6 mb-4">
             <h6 className="mb-4">Quick Links</h6>
             <ul className="list-unstyled footer-list">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms Conditions</li>
             </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6 mb-4">
             <h6 className="mb-4">Social Links</h6>
             <ul className="list-unstyled footer-list">
                <li><a className='blog-link'href="#">facebook</a></li>
                <li><a className='blog-link'href="#">twitter</a></li>
                <li><a className='blog-link'href="#">linkedin</a></li>
                <li><a className='blog-link'href="#">github</a></li>
             </ul>
          </div>
       </div>
       <div className="bar">
       </div>
       <div className="text-center">
          <p className="content">© {new Date().getFullYear()} - Design &amp; Develop By <a href="" className='blog-link' target="_blank">CS.CODE.IN</a></p>
       </div>
    </div>
 </footer>
  )
}

export default Footer