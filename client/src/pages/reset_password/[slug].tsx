import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { resetPassword } from '../../redux/actions/profileAction'
import { FormSubmit, IParams } from '../../utils/TypeScript'

const ResetPassword = () => {
    const token = useParams<IParams>().slug
    const dispatch = useDispatch()
    
    const [password, setPassword] = useState('')
    const [cf_password, setCfPassword] = useState('')
    const [typePassword, setTypePassword] = useState(false)
    const [typeCfpassword, setTypeCfPassword] = useState(false)

    const handleSubmit = (e:FormSubmit) => {
        e.preventDefault()
        dispatch(resetPassword(password, cf_password, token))
    }
    return (
        <div className="auth_page">
            <form className="auth_box" onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center my-4">Reset password</h3>
            <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label"> Password </label>
                    <div className="pass">
                        <input type={typePassword ? "text": "password"} className="form-control" id="password" name="password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password must be at least 6 chars."
                        />
                        <small onClick={() => setTypePassword(!typePassword)}>
                            {typePassword ? 'Hide' : 'Show'}
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="cf_password" className="form-label"> Confirm Password </label>
                    <div className="pass">
                        <input type={typeCfpassword ? "text": "password"} className="form-control" id="cf_password" name="cf_password" 
                            value={cf_password} onChange={(e) => setCfPassword(e.target.value)} 
                            placeholder="Your confirm password."
                        />
                        <small onClick={() => setTypeCfPassword(!typeCfpassword)}>
                            {typeCfpassword ? 'Hide' : 'Show'}
                        </small>
                    </div>
                </div>
                <button type="submit" className="btn btn-dark w-100 my-4">
                    Reset
                </button>
            </form>
        </div>
    )
}

export default ResetPassword
