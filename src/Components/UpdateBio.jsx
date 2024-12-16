import React from 'react'

function UpdateBio() {
  return (
    <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex bg-image"></div>
                <div className="col-md-6 ">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-6 sign-in-font mb-3 "
                                     style={{fontSize:"28px",fontWeight: "500"}}>Enter Bio</h3>
                                    <form className="form-md form-md-bio">
                                        <textarea rows="4"
                                            cols="50"></textarea>
                                        <div className="form-group mt-5">
                                            <button className="button btn btn-primary sign-in-btn w-100">Submit</button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
  )
}

export default UpdateBio