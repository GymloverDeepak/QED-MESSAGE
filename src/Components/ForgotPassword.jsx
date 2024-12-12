import React from 'react'

function ForgotPassword() {
  return (
    <div className="container-fluid">
    <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image"></div>


        <div className="col-md-6 ">
            <div className="login d-flex align-items-center py-5">

               
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-7 mx-auto">
                            <h3 className="display-6 sign-in-font mb-3">Forgot password</h3>
                            <p className="sign-up-text">Enter your email address to get the password reset link</p>
                            <form className="form-md">
                                <div className="form-group">
                                    <input id="form_name1" className="form-control" type="text" required />
                                    <label for="form_name1">Email ID</label>
                                </div>
                                <div className="form-group mt-5">
                                    <button className="button btn btn-primary sign-in-btn w-100">Sign in</button>
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

export default ForgotPassword