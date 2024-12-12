import React from 'react'

export default function Contact() {
  return (
    <div>
                {/* Contact Start */}
        <div className="container-fluid contact py-5">
        <div className="container py-5">
            <div className="p-5 bg-light rounded">
            <div className="row g-4">
                <div className="col-12">
                <div className="text-center mx-auto" style={{"max-width":"700px"}}>
                    <h1 className="text-primary">Get in touch</h1>
                    <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                </div>
                </div>
                <div className="col-lg-12">
                <div className="h-100 rounded">
                    <iframe className="rounded w-100" style={{"height":"400px"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.203331971768!2d80.2276461129298!3d12.93656509800791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525cfbde1d0251%3A0xcafd9a078a3c9270!2sThoraipakkam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1731530859943!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
                </div>
                <div className="col-lg-7">
                <form action className>
                    <input type="text" className="w-100 form-control border-0 py-3 mb-4" placeholder="Your Name" />
                    <input type="email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter Your Email" />
                    <textarea className="w-100 form-control border-0 mb-4" rows={5} cols={10} placeholder="Your Message" defaultValue={""} />
                    <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">Submit</button>
                </form>
                </div>
                <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                    <div>
                    <h4>Address</h4>
                    <p className="mb-2">1/113,omr road,thoraipakkam,chennai-97</p>
                    </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                    <i className="fas fa-envelope fa-2x text-primary me-4" />
                    <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">grocery@gmail.com</p>
                    </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                    <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                    <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">(+91) 874569872</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        {/* Contact End */}
    </div>
  )
}
