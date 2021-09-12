import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { showErrMsg, showSuccessMsg } from '../../components/alert/Alert'
import { postAPI } from '../../utils/FetchData'
import { IParams } from '../../utils/TypeScript'

const Active = () => {
    const {slug}: IParams = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
   useEffect(() => {
        if(slug) {
            postAPI('active', {active_token: slug})
            .then(res => setSuccess(res.data.msg))
            .catch(err => setErr(err.response.data.msg))
        }
   }, [slug])

    return (
        <div>
            {
                err && showErrMsg(err)
            }
            {
                success && showSuccessMsg(success)
            }
        </div>
    )
}

export default Active
