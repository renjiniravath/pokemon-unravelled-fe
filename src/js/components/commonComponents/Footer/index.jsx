import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="footer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="footer-widget">
                                <div className="about-widget">
                                    <img src="img/logo.png" alt="" />
                                    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo. Morbi id dictum quam, ut commodo.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-6">
                            <div className="footer-widget">
                                <h2 className="fw-title">Usfull Links</h2>
                                <ul>
                                    <li><a href="">Games</a></li>
                                    <li><a href="">testimonials</a></li>
                                    <li><a href="">Reviews</a></li>
                                    <li><a href="">Characters</a></li>
                                    <li><a href="">Latest news</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-6">
                            <div className="footer-widget">
                                <h2 className="fw-title">Services</h2>
                                <ul>
                                    <li><a href="">About us</a></li>
                                    <li><a href="">Services</a></li>
                                    <li><a href="">Become a writer</a></li>
                                    <li><a href="">Jobs</a></li>
                                    <li><a href="">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-6">
                            <div className="footer-widget">
                                <h2 className="fw-title">Careeres</h2>
                                <ul>
                                    <li><a href="">Donate</a></li>
                                    <li><a href="">Services</a></li>
                                    <li><a href="">Subscriptions</a></li>
                                    <li><a href="">Careers</a></li>
                                    <li><a href="">Our team</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widget fw-latest-post">
                                <h2 className="fw-title">Usfull Links</h2>
                                <div className="latest-news-widget">
                                    <div className="ln-item">
                                        <div className="ln-text">
                                            <div className="ln-date">April 1, 2019</div>
                                            <h6>10 Amazing new games</h6>
                                            <div className="ln-metas">
                                                <div className="ln-meta">By Admin</div>
                                                <div className="ln-meta">in <a href="#">Games</a></div>
                                                <div className="ln-meta">3 Comments</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ln-item">
                                        <div className="ln-text">
                                            <div className="ln-date">April 1, 2019</div>
                                            <h6>10 Amazing new games</h6>
                                            <div className="ln-metas">
                                                <div className="ln-meta">By Admin</div>
                                                <div className="ln-meta">in <a href="#">Games</a></div>
                                                <div className="ln-meta">3 Comments</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright"><p>
                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                    </p></div>
                </div>
                <div className="social-links-warp">
                    <div className="container">
                        <div className="social-links">
                            <a href="#"><i className="fa fa-instagram"></i><span>instagram</span></a>
                            <a href="#"><i className="fa fa-pinterest"></i><span>pinterest</span></a>
                            <a href="#"><i className="fa fa-facebook"></i><span>facebook</span></a>
                            <a href="#"><i className="fa fa-twitter"></i><span>twitter</span></a>
                            <a href="#"><i className="fa fa-youtube"></i><span>youtube</span></a>
                            <a href="#"><i className="fa fa-tumblr-square"></i><span>tumblr</span></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;