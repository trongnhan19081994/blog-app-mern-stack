import React from 'react'
import { GoogleLogin,  GoogleLoginResponse} from 'react-google-login-lite';
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';
import { useDispatch } from 'react-redux';
import { facebookLogin, googleLogin } from '../../redux/actions/authAction';

const SocialLogin = () => {
    const dispath = useDispatch()
    const onSuccess = (googleUser: GoogleLoginResponse) => {
        const id_token = googleUser.getAuthResponse().id_token
        dispath(googleLogin(id_token))
    }
    const onSuccessFb = (response: FacebookLoginAuthResponse) => {
        const { accessToken, userID } = response.authResponse
        dispath(facebookLogin(accessToken, userID ))
    }
      
    return (
        <>
        <div className="my-2">
           <GoogleLogin 
            client_id='4475670261-oda0emlqn5n3e15k0727vl30d3lehauq.apps.googleusercontent.com'
            cookiepolicy='single_host_origin'
            onSuccess={onSuccess}
            longtitle={false}
            theme='light'
            />
        </div>
        <div className="my-2">
             <FacebookLogin 
                appId="244161717716183"
                onSuccess={onSuccessFb}
            />
        </div>
        </>
    )
}

export default SocialLogin
