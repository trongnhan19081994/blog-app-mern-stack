import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSMS } from '../../redux/actions/authAction'
import { FormSubmit } from '../../utils/TypeScript'

const LoginSMS = () => {
    const dispath = useDispatch()
    const [phone, setPhone] = useState('')
    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispath(loginSMS(phone))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
                <label htmlFor="phone" className="form-label"> Phone Number </label>
                <input type="text" className="form-control" id="phone" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+84123434567"
                />
            </div>
            <button type="submit" className="btn btn-dark w-100" disabled={phone ? false : true}>
                Login
            </button>
        </form>
    )
}

export default LoginSMS
