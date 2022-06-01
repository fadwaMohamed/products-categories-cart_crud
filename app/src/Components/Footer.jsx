import React from "react";

let Footer = () => {
  return (
    <>
      <footer
        className="text-center fixed-bottom bg-light"
        style={{ zIndex: 2 }}
      >
        <div className="container p-3">
          <section>
            <div
              className="btn btn-link btn-floating btn-lg m-1"
              style={{
                color: "#1877f2",
              }}
            >
              <i className="fab fa-facebook-f"></i>
            </div>
            <div
              className="btn btn-link btn-floating btn-lg m-1"
              style={{
                color: "#1da1f2",
              }}
            >
              <i className="fab fa-twitter"></i>
            </div>
            <div
              className="btn btn-link btn-floating btn-lg m-1"
              style={{
                color: "#ea4335",
              }}
            >
              <i className="fab fa-google"></i>
            </div>
            <div
              className="btn btn-link btn-floating btn-lg m-1"
              style={{
                color: "#c32aa3",
              }}
            >
              <i className="fab fa-instagram"></i>
            </div>
            <div
              className="btn btn-link btn-floating btn-lg m-1"
              style={{
                color: "#0a66c2",
              }}
            >
              <i className="fab fa-linkedin"></i>
            </div>
          </section>
        </div>
      </footer>
    </>
  );
};

export default Footer;
